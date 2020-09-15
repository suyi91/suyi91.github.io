---
title: "Vue CompositionApi和jsx"
date: "2020-09-15 22:00"
template: "post"
slug: "vue-composition-api-and-jsx"
tags:
  - "vue"
  - "composition-api"
  - "jsx"
draft: false
category: "开发"
description: "日常工作中，类似的代码写多了就会烦，烦多了就该考虑设计封装了......"
socialImage: ""
---

日常工作中，类似的代码写多了就会烦，烦多了就该考虑设计封装了......

## 业务例子

业务开发中，`ElDialog`(element-ui)经常用到。基础用法如下:

```html
<template>
  <el-dialog :xx-xx="xxXx" :visible.sync="visible"> <!-- xx-xx是项目中dialog需要配置的默认属性 -->
    <div>
      Dialog Body区域
      xxx
    </div>
    <div slot="footer">
      <el-button>确定</el-button>
      <el-button>关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    // 其他的业务方法
  }
}
</script>
```

因为Dialog经常被用到，所以都会新建一个XxxDialog.vue文件，类似👆写下代码。

写多了就麻烦了，感觉有几个问题：

1. 每次都需要写类似的内容，写起来相对繁琐（可以考虑新建文件模板，但是多人协作时都需要配置）
1. 出现共通性质的规范调整，涉及到改动dialog部分业务时，需要改动的地方会很多。
1. 根据业务写的越多，可能会出现不同地方实现有出入的场景，例如某个属性漏设置等等。
1. 从dialog看，外部调用操作比较繁琐。

    以从外部打开/关闭场景为例：
    可以将visible作为prop（sync）传出。需要外部定义visible并和ui绑定。

    也可以使用vue的`$refs`获取弹窗调用内部方法。原则上不推荐直接拿`$refs`进行操作，因为一旦组件内部修改了实现可能会导致使用异常，并且也没有任何的编译时报错。
1. dialog内部有几个slots，现在都放在一起 with 相应的业务，可能代码量略大，需要占用一个vue文件实现。
*如果可以简化抽离各个部分，就能直接在调用方直接内部使用，不用考虑内外参数/方法调用。*

## Vue compositionApi带来的变化

（可能）借鉴了react hooks的思想，vue提供了compositionApi库带来了函数式的开发体验（可以对比一直以来写的）。

例如上面的例子可以进行简单的修改利用函数封装逻辑。

```jsx
// useDialog.js
export const useDialog = () => {
  const comonProps = reactive({ // dialog的共通配置属性
    xxx: 'xxx'
  })
  const visible = ref(false)
  const open = () => visible.value = true
  const close = () => visible.value = false

  return {
    comonProps,
    visible,

    open,
    close,
  }
}
```

```html
<template>
  <el-dialog v-bind="commonProps" :visible.sync="visible">
    <div slot="footer">
      // 内容省略
    </div>
  </el-dialog>
</template>
<script>
import { useDialog } from './useDialog'

export default {
  setup() {
    const { visible, commonProps, open, close } = useDialog()

    return {
      visible,
      commonProps,

      open,
      close
    }
  }
}
</script>
```

从例子可以看出，通过将通用js逻辑提取封装，可以实现减少重复的目的。

但是感觉依旧不能简化外部调用的方式。
并且dialog文件内部仍然很大（如果加上了具体场景的业务），达不到Vue小巧的风格。

## Vue compositionApi & jsx结合带来的变化

jsx时react带来的一种js中写html的全新方法。结合js强大的编程灵活性，jsx可以带来VueTemplate没有的体验。

### 设计点

还是以`ElDialog`作为例子，结合上面compositionApi的🌰，可以简单设计下`ElDialog`的封装：

1. dialog需要配置默认的属性。
1. dialog需要支持原来的所有属性和抛出方法
1. dialog需要支持原来的title/default/footer 三个slots
1. dialog需要简化内外打开关闭的实现方式，比如抛出visible属性控制开/关

### 实现点

根据设计的4个点，大概计划如下实现：

1. 组件内部定义默认属性。
1. 组件props中加入dialogProps和dialogEvents属性，同 原`ElDialog`的$attrs和$listeners。
1. 保留原slots `title`/`default`/`footer`
1. 使用compositionApi封装方法，调用时返回visible和其可控制的Dialog组件

### 代码实现

dialog逻辑封装 => `CommonDialog`

```jsx
// dialog逻辑封装
export const useCommonDialog = () => {
  const visible = ref(false);

  const CommonDialog = defineComponent({
    name: 'CommonDialog',
    props: {
      dialogProps: {
        type: Object,
        default: () => ({})
      },
      dialogEvents: {
        type: Object,
        default: () => ({})
      }
    },
    setup(props, ctx) {
      return {
        visible
      };
    },
    render() {
      const props = {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        ...this.dialogProps,
        visible: this.visible
      };
      const on = {
        ...this.dialogEvents,
        'update:sync': v => {
          this.visible = v;
        }
      };
      return (
        <el-dialog {...{ props, on }}>
          {this.$scopedSlots.title && <template slot="title">{this.$scopedSlots.title()}</template>}
          {this.$scopedSlots.default?.()}
          {this.$scopedSlots.footer && <template slot="footer">{this.$scopedSlots.footer()}</template>}
        </el-dialog>
      );
    }
  });
  return {
    visible,
    CommonDialog
  };
};
```

使用CommonDialog

```jsx
// 某某页面的例子
export default {
  setup() {
    const { visible, CommonDialog } = useCommonDialog()

    return () => (
      <div>
        <el-button onClick={() => (visible.value = true)}>打开dialog</el-button>
        <CommonDialog
          dialogProps={{
            title: '某title',
            showClose: true
          }}
          scopedSlots={{
            default: () => (/* xxxx */),
            footer: () => <el-button onClick={() => (visible.value = false)}>关闭</el-button>
          }}
        />
      </div>
    )
  }
}
```

从此，ElDialog就可用一个函数生成和控制显示隐藏。🎉

> 看了上面的demo是不是有一些疑问：
>
> 1. 在vue里怎么写jsx？
> 1. 上面的例子太简单，所以代码量很少。如果业务复杂了肯定还会和直接提取Dialog作为SFC一样复杂。
> 1. 如果部分场景dialog需要另一套规范，如何实现。
> 1. 代码抽的太多、文件太多会不会影响可读性？

## 其他

### 疑问说明

#### 1. vue里怎么写jsx？

可以参考react/vue的jsx介绍页面 & vue的babel jsx插件说明页面。

#### 2. 如何减少业务带入的额外代码量对于使用处的影响？

因为业务复杂性，肯定会有额外的代码量引入。
所以更加需要重视设计和封装实现方式。
以dialog的“default”slot为例，可以参照CommonDialog的实现。

```jsx
export const useDialogBody = () => {
  const someBiz = ref(null); // 例如组件内部业务需使用一些过程量

  /**
   * 如果业务处理实在太复杂太多，还可以提取具体的业务方法，保持DialogBody内部的整洁和清爽
   */


  const DialogBody = (props, ctx) => {
    return () => (
     <div>
       dialog内部的业务
     </div>
    )
  }

  return {
    DialogBody,

    someBiz
  }
}
```

在使用CommonDialog处：

```jsx
export default {
  setup() {
    const { visible, CommonDialog } = useCommonDialog()
    const { DialogBody, someBiz } = useDialogBody()

    return () => (
      <div>
        <el-button onClick={() => (visible.value = true)}>打开dialog</el-button>
        <CommonDialog
          dialogProps={{
            title: '某title',
            showClose: true
          }}
          scopedSlots={{
            default: () => <DialogBody />,
            footer: () => <el-button onClick={() => (visible.value = false)}>关闭</el-button>
          }}
        />
      </div>
    )
  }
}
```

#### 3. 如果部分场景dialog需要另一套规范，如何实现

如果规范间差距不大，并且处理可以兼容覆盖，可以考虑将不同的点提取配置化（例如`ElDialog`默认props略有差异的时候）。

如果差别较大可能需要重新提取封装。

#### 4. 代码抽的太多、文件太多会不会影响可读性

代码抽的多不一定是坏事。如果一个复杂处理可以提取成多个可复用的小处理，某种角度上可以减少代码重复。

可能有些人认为跳转过多不好。但是只要实现合理的命名 + 开发环境的跳转配置，实际开发体验会改善不少。

> a. 从函数式和测试的角度看，粒度越小越可控、可测（当然，现在的开发流程中不需要前端开发者编写测试代码。。。）
>
> b. “多用组合”

### compositionApi和jsx结合使用的感想

工作项目，在业务量和体积不断增大的时候，肯定会出现重复编码实现的情况。使用函数式的思想结合compositionApi和jsx重新审视编码的实际，可能会有新的体会。

上文即是笔者结合所见所闻和业务项目实际的一些感想体会，可供参考。😂
