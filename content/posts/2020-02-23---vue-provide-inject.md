---
title: "Vuejs中的provide/inject"
date: "2020-02-23 23:00"
template: "post"
slug: "vue-provide-inject"
description: "最近在工作中，被一个同事问到了provide/inject的用法。这不简单嘛，当即给出答案..."
tags:
  - "前端"
  - "vue"
draft: false
category: "开发"
socialImage: "vue.jpg"
---

最近在工作中，被一个同事问到了provide/inject的用法。这不简单嘛，当即给出答案大致如下。

```js
export default {
  // 祖先组件
  data: () => {
    prop1: 1
  },
  provide() {
    return {
      prop1: this.prop1
    }
  }
}

export default {
  // 子孙组件
  inject: ['prop1']
}
```

过了会儿同事又来找我: *“prop1的响应式没了...”*。此时才回忆到Vuejs的[文档](https://cn.vuejs.org/v2/api/#provide-inject)上说明过，`provide/inject`的绑定不是响应式的。想给同事说明正确用法，但同事因为比较忙继续用`props`了。

想到自己被问到Vuejs中Api的用法时答得不准确，该好好看看源码和文档了。

## Provide/Inject的用法

provide和inject是Vuejs为了祖先和子孙组件间提供的便捷的传递数值方法的Api。适合高阶插件/组件库开发时使用。

***provide和inject的绑定不是响应式的。***

### 类型

provide：`Object | () => Object`

inject：`Array<string> | { [key: string]: string | Symbol | Object }`

### provide说明

如类型定义所示，`provide`接受一个对象或者一个生成对象的函数，给所有子孙组件注入接收到的值。对象的键可以为ES6的`Symbol`。

```js
export default {
  // 接受一个对象
  provide: {
    prop1: 1,
  },
  // 或者接受一个生成对象的函数
  provide() {
    return {
      prop1: 1
    }
  },
}
```

### inject说明

如类型定义所示，`inject`接受一个字符串数组或者一个键值对象，可以获取到祖先注入的属性。

```js
export default {
  // 接受字符串数组
  inject: ['prop1'], // => this.prop1
  // 接受键值对象
  inject: {
    newProp1: 'prop1', // => this.newProp1
  }
}
```

> 另外，`inject`传入键值对象时，值支持带有`from`和`default`的对象，用于设置inject值的来源名称和默认值。

```js
export default {
  inject: {
    // 一个不存在的provide属性
    prop3: {
      from: 'prop2',
      default: () => ([6, 6, 6]), // this.prop3即为[6, 6, 6]
    },
  },
}
```

## Provide/Inject的源码实现

看完了Api文档，该看看具体的源码实现了。

首先是组件初始化的地方`src/core/instance/init.js`的`initMixin`方法中，在组件的`data/props`加载前后先后执行。

```js
 // expose real self
 vm._self = vm
 initLifecycle(vm)
 initEvents(vm)
 initRender(vm)
 callHook(vm, 'beforeCreate')
 initInjections(vm) // resolve injections before data/props
 initState(vm)
 initProvide(vm) // resolve provide after data/props
 callHook(vm, 'created')
```

### initProvide

provide初始化的代码在`src/core/instance/inject.js`中。

```js
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```

逻辑很简单，读取定义的`provide`并赋值在组件的`_provided`属性上。

### initInjections

inject初始化的代码在`src/core/instance/inject.js`中，下面分2步解析一下。

#### inject初始化的整体流程

```js
export function initInjections (vm: Component) {
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      // 省略部分代码
      defineReactive(vm, key, result[key])
      // 省略部分代码
    })
    toggleObserving(true)
  }
}
```

整体上说，inject的实现分为2步:
1. 调用`resolveInject`方法解析出所有有效的`inject`键值对存放在`result`中。
1. 遍历`result`将所有键值对定义到组件的上下文`vm`中。

#### inject定义的解析

inject的解析在方法`resolveInject`中(也在当前文件`src/core/instance/inject.js`)。

```js
// 省略了部分不重要的代码
export function resolveInject (inject: any, vm: Component): ?Object {
  const result = Object.create(null) // 创建临时变量
  const keys = hasSymbol             // 获取所有在inject中定义的键
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)
  for (let i = 0; i < keys.length; i++) { // 循环处理每一个键
    const provideKey = inject[key].from
    let source = vm
    // 从当前组件不断查找父级组件满足条件的provide定义
    while (source) {
      if (source._provided && hasOwn(source._provided, provideKey)) {
        result[key] = source._provided[provideKey]
        break
      }
      source = source.$parent
    }
    // provide定义没有找到时
    // 如果inject定义了default就直接取值(或执行)
    if (!source) {
      if ('default' in inject[key]) {
        const provideDefault = inject[key].default
        result[key] = typeof provideDefault === 'function'
          ? provideDefault.call(vm)
          : provideDefault
      } else if (process.env.NODE_ENV !== 'production') {
        warn(`Injection "${key}" not found`, vm)
      }
    }
  }
  return result
}
```

#### inject的键值注入

暂时关闭Vue内部的响应式flag，定义属性。

```js
toggleObserving(false)
Object.keys(result).forEach(key => {
  // 省略部分代码
  defineReactive(vm, key, result[key])
  // 省略部分代码
})
toggleObserving(true)
```

1. `toggleObserving`为`src/core/observer/index.js`中Vue核心的是否开启响应式的flag。
1. `defineReactive`即为Vuejs的核心实现方式，不介绍了。

经过了上面的步骤inject完成了注入。

## Provide/Inject如何实现绑定响应式

`provide/inject`直接注入没有响应式，但是可以通过`对象属性`实现。

```js
export default {
  data: () => ({
    wrapper: {
      a: 1,
      b: 2,
    }
  }),
  provide() {
    return {
      wrapper: this.wrapper,
    }
  }
}

export default {
  inject: ['wrapper'] // 此时wrapper.a、wrapper.b是响应式的
}
```

> 这也就是Api文档中说的`如果你传入了一个可监听的对象，那么其对象的属性还是可响应的`。

看到这里，😁可以找同事吹牛了。

## 感想

1. Vuejs的文档中记录了很多很细的知识点，对于需要使用它做开发的人员来说，必须全面阅读梳理一遍。如果有时间也应该翻翻源码的实现，学习一些开发技巧、了解相关的知识。原来源码并没有想象的那么深奥。
1. Vuejs的Api越来越多(最开始接触时`inject`还没有`default`属性)，虽然上手依旧很快，但对于初学者来说Vuejs学习成本也在逐步升高。
