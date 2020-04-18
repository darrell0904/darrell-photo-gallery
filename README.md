# darrell-photo-gallery

> 因为最近工作需要预览制作一个图片预览的插件，在查看了很多产品（掘金、知乎、简书、石墨等）的图片预览之后，还是觉得石墨的图片预览符合我们的产品需求。



## 介绍

这是一个基于 **React Hoos** 开发的 **仿石墨的图片** 放大预览插件。

在社区找了很久之后，没有找到相关的轮子，于是自己撸了一个。

插件的功能是当你的设备支持 `canvas` 的时候，就使用 `canvas` 进行绘图，当不支持 `canvas` 的时候就直接显示图片。



## 支持功能

- [x] 放大图片
- [x] 缩小图片
- [x] 原尺寸大小显示
- [x] 适应屏幕
- [ ] 下载图片



## 预览

![](./example/image/img-gallery.gif)



## 安装

```javascript
// 安装
npm install darrell-photo-gallery -D

// 在项目中使用

import PhotoGallery from 'darrell-photo-gallery';
import 'darrell-photo-gallery/lib/main.min.css';
```



## 使用

```javascript
<PhotoGallery
 visible={visible}
 imgData={ImgData}
 currentImg = {9}
 hideModal={
  () => {
    setVisible(false);
  }
 }
/>
```



目前支持四个参数：

* `visible`：`boolean`，预览插件的显示隐藏

* `imgData`：`object`，具体属性如下

  ```js
  interface Img {
    url: string;
    size?: string;
    width?: string;
    height?: string;
    [propName: string]: any;
  }
  ```

* `currentImg`：`number`，当前图片在图片数组中是第几张

* `hideModal`：`hideModal?(): void;`，是一个函数，关闭图片预览弹窗

