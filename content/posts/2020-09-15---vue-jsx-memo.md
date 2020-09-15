---
title: "Vue中使用JSX记录"
date: "2020-09-15 23:00"
template: "post"
slug: "vue-jsx-memo"
tags:
  - "vue"
  - "jsx"
draft: false
category: "开发"
description: ""
socialImage: ""
---

## Basics

> 从实际的开发体验看，现在可以选择的vue jsx插件是 [babel-preset-vca-jsx](https://github.com/luwanquan/babel-preset-vca-jsx/)
>
> 项目中引入即可直接写jsx

### named slots

```jsx
<span>
  <H slot="header" />
  <F slot="footer" />
</span>
```

=> this.$slots  key/value的值类型是`VNode[]`

### scoped slots

```jsx
<C
  scopedSlots={{
    header: (props) => <H prop={props.xxx} />,
    footer: (props) => <F prop={props.xxx} />
  }}
/>
```

=> this.$scopedSlots  key/value的值类型是`function`

### .sync

```jsx
// 以value属性为例
// 等价于 <C :value.sync="value" />
<C
  {...{
    props: {
      value: this.value
    },
    on: {
      'update:value': v => { this.value = v }
    }
  }}
/>
```

### jsx中引入样式

直接使用css module

```jsx
import $style from 'xx/xx.scss'

<div class={$style.someClass}>xxx</div>
```

### 函数式组件

```jsx
const A = ({ props, listeners, data, children, parent, injections, slots, scopedSlots }) => {
  return <div></div>
}
```

## Demo

### 拦截ElButton的click事件

```jsx
const NewElButton = ctx => {
  const { props, listeners, children } = ctx;
  let on = { ...listeners };
  if (listeners.click) {
    on.click = () => {
      console.log('ElButton被点击了');
      listeners.click()
    };
  }
  return (
    <el-button props={props} on={on}>
      {children}
    </el-button>
  );
};
```

比较通用的防抖操作就可以用拦截的方式实现。（本质是Vue的函数式组件）
