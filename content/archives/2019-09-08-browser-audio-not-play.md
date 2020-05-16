---
title: 浏览器音频无法自动播放之谜
author: Suyi
authorURL: https://github.com/suyi91
authorFBID: 100009224056265
---

最近的工作中，做了一个语音自动播放的需求。

实现起来很简单，`new Audio('xxx.ogg').play()` 搞定，本地调试没问题，测试测试没问题，上线。

上线后，问题来了: 客户反馈自动播放无效了，页面最小化也没有声音。但是当最大化页面点击之后，憋了好久没有播放的音频全都播放了...

<!--truncate-->

![wtf!](assets/wtf.jpg)

## 问题重现

在线上环境Chrome测试了一次，确实没声音，浏览器抛出了如下的错误。`DOMException`，没头绪。

![Chrome音频播放报错](assets/浏览器音频autoplay/chrome-autoplay-error.jpg)

后来在Firefox中测试了一次也没声音，但错误描述清晰多了。

![Firefox音频播放报错](assets/浏览器音频autoplay/firefox-autoplay-error.jpg)

翻译过来就是页面没有用户的交互行为，自动播放被禁止了。(➡️*[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play#%E5%85%8D%E8%B4%A3)*)

## 问题原因

日常使用iOS/Android访问网页应该会注意到，移动端浏览器基本都禁用了视频/视频的自动播放，桌面版的Safari在2017年的11版本也宣布禁掉带有声音的多媒体自动播放功能，2018年4月份发布的Chrome 66也正式关掉了声音自动播放。

想要播放音频视频，需要用户操作。

具体可参考掘金的这篇*[Post](https://juejin.im/post/5af7129bf265da0b8262df4c)*。

## 解决方法

1. 添加交互的方式(可行)

    既然是没有用户交互行为导致的问题，在音频自动播放的需求进入页面时直接加一个欢迎使用的alert。如果是视频播放，可以加一个播放按钮点击后再播放。

2. 使用iframe(非100%可行)

    ```js
    <iframe src="http://audio01.dmhmusic.com/71_53_T10017091660_128_4_1_0_sdk-cpm/0104/M00/4B/4A/ChR45FmKclGAJAkBABPwVuAUS7I437.mp3?xcode=94283a554058f5fb50d361e411519eabcadd434" allow="autoplay"></iframe>
    ```

    上面的代码在Chrome下测试可行，但是在Firefox中失效了，一样的错误，需要用户交互。

    > Chrome有一个Media Engagement Index(MEI)规则，介绍了多媒体自动播放的考量标准
    >
    > ![Chrome MEI](https://i.loli.net/2019/09/08/J9nR4FmuBI2lXcz.jpg)

## 参考资料

1. [Chrome 66禁止声音自动播放之后](https://juejin.im/post/5af7129bf265da0b8262df4c)

2. [chrome下音频无法自动播放的解决办法](https://blog.csdn.net/badmoonc/article/details/86529752)

3. [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
