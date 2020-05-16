---
title: 浏览器通知Notification
author: Suyi
authorURL: https://github.com/suyi91
authorFBID: 100009224056265
---

浏览器提供了原生的通知API——[Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)，可以控制系统级的通知(使用Notification的较常用线上产品就是微信了)。

![1568093995484-c1bc8c97-fe43-4e85-8313-5ac12d8e1f9f.png](https://i.loli.net/2019/09/16/B6uzR2Ji3XVxZeT.png)

<!--truncate-->

## 使用环境
Notification支持在浏览器(window对象)和serviceWorker中使用。

主流的PC端浏览器都支持(IE不支持)。移动端Android的Chrome只支持serviceWorker中调用，iOS不支持。

[兼容表格](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#Browser_compatibility)。

运行环境需要**HTTPS**(nodejs环境下可以参照[link](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/)本地构建https服务)

## 使用方法

### 请求权限

对于每个域名，浏览器默认是不允许直接发出通知的，需要用户许可。

```js
Notification.requestPermission().then(permission => {
  // 'granted' | 'denied' | 'default'
}).catch(() => {})
```

![1568094958599-2d451b1d-1bc2-435c-9094-a4812a0a52c5.png](https://i.loli.net/2019/09/16/zurBGREe689xX2t.png)

调用requestPermission后会出现上图的询问(如果当前域名之前没有操作过)。

根据用户的操作会返回 `'granted' | 'denied' | 'default'`

返回'granted'标识用户许可了。

### 发出通知

许可了通知后，就可以调用代码唤起通知了。

```js
const notification = new Notification('这是title', { /* 这是可选的配置参数 */ })
```

### 参数说明

配置参数就不重复列举了，[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification)上有完整的描述。

基础的使用就是:

body: 正文内容

icon: 通知中显示的图标url

data: 存储在通知中的数据

renotify: Boolean。新通知替换旧通知时是否通知用户。默认false

requireInteraction: Boolean。通知是否需要用户交互才可关闭。默认false

### 事件

点击事件onclick

```js
notification.onclick = function(event) {
  event.preventDefault(); // prevent the browser from focusing the Notification's tab
  window.open('http://www.mozilla.org', '_blank');
}
```
