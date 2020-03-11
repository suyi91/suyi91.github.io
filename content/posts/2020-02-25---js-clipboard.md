---
title: "JS实现拷贝到剪贴板"
date: "2020-02-29 22:00"
template: "post"
slug: "js-clipboard"
description: ""
tags:
  - "前端"
  - "JavaScript"
draft: false
category: "开发"
socialImage: "clipboard.jpg"
---

JS实现拷贝到剪贴板，可以通过下面两种方式实现。
1. `Document.execCommand` Api
1. `Navigator.clipboard` Api

## Document.execCommand

### 用法

`Document.execCommand`提供了很多命令可供选择调用。剪贴板的交互，主要有三个:

1. `document.execCommand('copy')`
1. `document.execCommand('cut')`
1. `document.execCommand('paste')`

例如通过按钮实现复制到剪贴板，就可以参照下面的demo。

```html
<input id="input">
<button id="copyBtn">copy</button>
<script>
document.querySelector('#copyBtn').addEventListener('click', function() {
  document.querySelector('#input').select()
  document.execCommand('copy')
})
</script>
```

### 限制

1. `document.execCommand`可以在一个用户操作的短生存期的事件回调中使用，就像上面的demo。如果不是用户操作回调中被调用，会无效果。(如果需要在非用户操作时使用，需要拥有权限)。
1. `document.execCommand`存在浏览器兼容问题(2020/02/29)。
    ![](document-execCommand-compatibility.jpg)
1. `document.execCommand`已被标记过时了，不再推荐使用。

## Navigator.clipboard

`Navigator.clipboard`是新的剪贴板异步调用Api，可以直接用编程的方式指定写入剪贴板内容(`document.execCommand`不可以直接指定内容)。

### 用法

`Clipboard`提供了下列的方法:

1. read: 读取剪贴板的内容，可能是任意的类型，例如图片数据。
1. readText: 读取剪贴板的文本内容。
1. write: 向剪贴板写入内容，可以是任何内容。
1. writeText: 向剪贴板写入文本。

下面是一个拷贝的demo。

```html
<input id="input">
<button id="copyBtn">copy</button>
<script>
document.querySelector('#copyBtn').addEventListener('click', function() {
  var content = document.querySelector('#input').value;
  navigator.clipboard.writeText(content).then(console.info, console.error);
})
</script>
```

### 限制

1. 因为是最新的标准，所以兼容性更加不好(2020/02/29)。
    ![](clipboard-api-compatibility.jpg)
1. 和`document.execCommand`一样，也需要用户操作的回调或者权限才可调用。

## 选择"document.execCommand"还是"Navigator.clipboard"?

前端开发有一个很显著的特性，就是`需要为大量客户端环境做polyfill`。复制到剪贴板也是如此。

```js
if (navigator.clipboard) {
  navigator.clipboard.writeText('123312').then(console.info, console.error)
} else {
  // document.execCommand('copy');
  // 相关操作
}
```

### iOS Safari

从网上看到的信息，iOS的Safari执行`document.execCommand('copy')`无效，所以还需要其他的兼容处理。(在自己的`iOS 13`没有出现，猜测是历史问题)

下面是一份[实现](https://josephkhan.me/javascript-copy-clipboard-safari/)供参考。

```js
function copyToClipboard(textToCopy) {
  var textArea;

  function isOS() {
    //can use a better detection logic here
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.readOnly = true;
    textArea.contentEditable = true;
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range, selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyTo() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  createTextArea(textToCopy);
  selectText();
  copyTo();
}
```

## 其他

除了原生api，还有大量的第三方库可以实现剪贴板的操作，例如[`clipboard-polyfill`](https://github.com/lgarron/clipboard-polyfill)、[`clipboard.js`](https://github.com/zenorocha/clipboard.js/)等可以尝试。

## 参考资料

1. MDN: [document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
1. MDN: [剪贴板使用说明](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard)
1. MDN: [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
