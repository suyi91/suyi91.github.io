---
title: js获取键盘按键内容
author: Suyi
authorURL: https://github.com/suyi91
authorFBID: 100009224056265
---

js获取键盘输入有这几个事件可以使用，`keydown`、`keypress`、`keyup`。

# keydown、keypress、onkeyup

<!--truncate-->

## keydown [👉MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onkeydown)

如keydown的字面意思，当用户按下按键时触发。

## keypress [👉MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onkeypress)

当按下键盘的任意键时触发。

## keyup [👉MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onkeyup)

如keyup字面意思，当按键释放时触发。

## 三者执行顺序

测试发现，keydown先被触发，然后是keypress，最后是keyup。(和我们实际输入的事件顺序也一致)。

> 理论上是这样，但是各个浏览器实现的并不相同，比如: Chrome中按下方向键时keypress不会被触发等。

```js
window.addEventListener('keyup', function(ev) {
  console.log('keyup is triggered');
});

window.addEventListener('keypress', function(ev) {
  console.log('keypress is triggered');
});

window.addEventListener('keydown', function(ev) {
  console.log('keydown is triggered');
});
```

## 区别

onkeydown 、onkeypress事件响应的时候输入的字符并没有被系统接受，而响应onkeyup的时候，输入流已经被系统接受。

> onkeydown 触发的时候输入流正要进入系统，也就是说onkeydown 事件一完，输入流就进入了系统，无法改变。所以通过onkeydown 事件可以改变用户是按了哪个键；而onkeypress事件则是在输入流进入系统后触发的，但输入流暂未被系统处理，此时已经不能改变输入流了；onkeyup则是输入流被系统处理后发生的。

# 获取按键内容

在触发了按键事件时，会抛出一个[`KeyboardEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)对象，从中可以拿到按键的键值。

对象中的[`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)属性，会给出键值的DOMString，根据String即可解析出按键内容。

```js
window.addEventListener('keydown', function(ev) {
  console.log('You have input: ' + ev.key);
});
```

## 键值参考

https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values

## [`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)的兼容性问题

规范虽然是规范，但是依旧有兼容性问题，很多浏览器尚未实现。

幸好MDN也为提供了降级方案(既有string，又有number...😓)。

```js
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  var handled = false;
  if (event.key !== undefined) {
    // Handle the event with KeyboardEvent.key and set handled true.
  } else if (event.keyIdentifier !== undefined) {
    // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
  } else if (event.keyCode !== undefined) {
    // Handle the event with KeyboardEvent.keyCode and set handled true.
  }

  if (handled) {
    // Suppress "double action" if event handled
    event.preventDefault();
  }
}, true);
```

## 第三方库

1. [keycode](https://github.com/timoxley/keycode)
   > 一个可以转换键值和键名的库。

# 参考

1. [js中onkeydown onkeypress 和onkeyup的区别](https://segmentfault.com/a/1190000005761969)
