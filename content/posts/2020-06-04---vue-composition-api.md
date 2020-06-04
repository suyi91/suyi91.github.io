---
title: "Vue2 & CompositionApi"
date: "2020-06-04 22:00"
template: "post"
slug: "vue-composition-api"
tags:
  - "vue"
  - "composition-api"
draft: false
category: "开发"
description: "Vue3版本推出在即，为了让广大用户提前感受新版特性，Vue官方推出了兼容Vue2的@vue/composition-api库。这里简单记录下近半年的使用收获。"
socialImage: ""
---

2019年下半年，Vuejs官方推出了[`CompositionApi RFC`](https://composition-api.vuejs.org/)，敲定了Vue3的函数式Api设计。为了让广大Vuejs使用者可以提前尝鲜，官方推出了Vue2的兼容库[`@vue/composition-api`](https://www.npmjs.com/package/@vue/composition-api)(原名[`vue-function-api`](https://www.npmjs.com/package/vue-function-api))。

作为一个对新事物充满了好奇的人，`CompositionApi`刚推出时就开始在业务中尝试使用。对比之前的Vue组件书写方式，`CompositionApi`的函数式一直用一直爽。

## Vue组件的写法

### options定义

Vuejs中存在最久的定义方式，通过定义对象属性的方式，实现Vue组件。一个简单的🌰如下。

```html
<script>
export default {
  name: 'CustomComponent',
  data: () => ({
    // ...
  }),
  mounted() {
    // 组件mounted时执行的方法
  },
  methods: {
    // ...
  }
}
</script>
```

options定义的方式书写简单，易于上手(组里的后端同学也可以较快地写起代码来)。

但options方式写久了，各种问题逐渐暴露:

1. 记忆负担大。Vue组件的Api很多，都需要记忆。
1. 类型系统差，TS支持堪忧。TS作为前端之路的一个趋势已经工程质量的一种保障方式，建议项目都可以接入，但是Vue组件支持很差(由于`this.xxx`以及options定义的属性取得不同于js对象属性获取)，需要各种hack和IDE插件。
1. 相关业务逻辑代码分隔过远。如果一段业务逻辑代码既存在于data、又存在于methods，复杂组件内部分隔过远比较影响可读性。
1. 相同逻辑复用困难。options方式实现的代码中会存在大量的`this.xxx`调用，不利于通用逻辑提取。(Vuejs官方为了解决复用问题引入了`mixins`的概念，但带来了其他的问题，已计划大版本升级时删除)。

### class组件

有点类似隔壁Angular的组件定义方式，Vuejs官方推出过[`vue-class-component`](https://github.com/vuejs/vue-class-component)库(还有一个扩展库[`vue-property-decorator`](https://github.com/kaorun343/vue-property-decorator))带来了class和装饰器书写组件的支持。

```js
@Component({
  name: 'XxxComponent',
})
export default class XxxComponent extends Vue {
  @Prop() label;

  // ...
}
```

使用久了发现class组件也只是一个半成品，Vuejs的Api都要通过二次封装处理的方式实现支持，代码逻辑复用的问题依然没有很好的解决方案(仍然是mixins)。

class组件也有好的方面，就是TS可以完整支持了。

### CompositionApi方式

CompositionApi作为一个全新的概念，抛弃了原有的options定义方式改为提供函数式的API。下面是一个🌰。

```ts
export default defineComponent({
  name: 'XxxComponent',
  setup(props, ctx) {
    const value = ref<string>('')
    const obj = reactive({
      a: 1,
      b: 2
    })
    return {
      value,
      obj
    }
  }
})
```

compositionApi的引入，标志性的就是组件内的`setup`方法。setup返回一个对象，对象中每一个键内容都会暴露给组件整体。

使用compositionApi，可以带来下面的好处:

1. data/methods/computed/watch/provide/inject以及组件生命周期函数等等都可以直接包含setup方法内部，使用起来直截了当。
1. setup就是一个函数整体，在里面写代码摆脱了原Vuejs的组件模板定义方式，让使用者更加觉得在写普通的js一样。
1. compositionApi带来的ref/reactive等等Api以及不再需要写this.xxx，给予了方便提取代码块的可能。
1. 使用compositionApi写代码就是在写普通js，没有this。TS的支持较好。

## CompositionApi的使用介绍

> 官方文档中的基础内容就不赘述了，下面讲几点使用时的收获。

### 获取动态生成ref的组件

CompositionApi提供了`ref`作为页面组件ref的获取方式，但仅限于编码时ref已知的场景。

对于运行时生成的ref组件，只能使用`ctx.refs[xxx]`的方式获取。(composition-api库的ctx类型SetupContext中没有描述，文档也没有说明，比较奇怪)。

```html
<template>
  <div ref="div">
    <span :ref="'span' + ts">span</span>
  </div>
</template>
<script>
const ts = +new Date()
export default {
  setup(props, ctx) {
    const divRef = ref(null)
    onMounted(() => {
      console.log(divRef.value) // 页面挂载后可以取得
      console.log(ctx.refs['span' + ts]) // 此时ref="span + xxx"的span只能使用这种方式获取
    })
    return {
      div: divRef,
      ts
    }
  }
}
</script>
```

### 复杂页面/组件内部数据管理

业务开发中的一些复杂页面，从便于维护的角度会拆分很多小组件。组件多、层级深一直是数据传递的一个痛点。从传统角度看，可以使用prop/emit、vuex等方式解决。

prop/emit对于层级简单、组件数据简单的场景比较实用，一旦层级复杂或者出现兄弟等场景实现时就比较麻烦了。
vuex可以说是一个比较万金油的方案，数据放进去、方法定义好就行。vuex也是options定义的方式，模板形式太强，且基本不支持TS类型系统。

现在有了CompositionApi，可以使用`ref`/`reactive`以及`provide`/`inject`来传递管理数据了。配合TS类型系统体验更佳。下面是使用的🌰。

```ts
// 数据逻辑部分
const KEY = Symbol('data')

export const initData = () => {
  const data = ref<string>('') // data为组件内部共享的数据
  provide(KEY, data)

  return { data }
}
export const useData = () => {
  const data = inject(KEY) as ref<string>
  const methodWithData: XxType = () => {
    // data.value 相关的操作逻辑代码
  }
  return { data, methodWithData }
}

// 父组件
export default {
  setup() {
    initData()
    return {}
  }
}
// 子孙组件
export default {
  setup() {
    const { data, methodWithData } = useData()
    // methodWithData()
    return { data }
  }
}
```

> TODO: 其他内容持续补充中。
