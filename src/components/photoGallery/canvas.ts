import {
  getBoundingClientRect,
  getEachSizeWidthArray,
  getFixScreenIndex,
  getCurImgIndex,
} from '@utils/img';

interface CanvasOptions {
  imgUrl: string; // 图片地址
  winWidth: number; // 屏幕宽度
  winHeight: number; // 屏幕高度
  canUseCanvas: boolean; // 是否可以使用 canUseCanvas
  loadingComplete?(instance: any): void; // loading
}

interface curPos {
  x: number,
  y: number,
}

const LONG_IMG_TOP: number = 10; // 长图距离顶部和底部的距离
const LONG_IMG_Left: number = 10; // 长图距离顶部和底部的距离


class ImgToCanvas {
  private options : CanvasOptions // 所有配置
  private el : any; // canvas dom
  private cacheCanvas : any;

  private canUseCanvas: boolean = true; // 是否能使用canvas

  private context : any;

  private image: any; // img dom
  private imgUrl: string; // img url

  private imgTop: number; // img 的 top
  private imgLeft: number; // img 的 left

  private LongImgTop: number = LONG_IMG_TOP;
  private LongImgLeft: number;

  private sidebarWidth: number = 120; // 侧边栏的宽度
  private footerHeight: number = 50; // 底部栏的高度

  private cImgWidth: number; // canvas.width
  private cImgHeight: number; // canvas.height

  private winWidth: number = window.innerWidth; // window.width
  private winHeight: number = window.innerHeight; // window.height

  private cWidth: number; // canvas.width
  private cHeight: number; // canvas.height

  private curPos: curPos = { // 记录鼠标按下时的坐标
    x: 0,
    y: 0,
  }

  private curScaleIndex: number = 6; // 现在的尺寸在哪一个地方
  public fixScreenSize: number = 6; // 适应屏幕的 size

  private EachSizeWidthArray: number[] = []; // 每个阶段的宽度尺寸

  private isDoCallback: boolean = false; // 图片是否已经加载

  // 初始化函数（输入的是canvas）
  constructor (selector: any, options: CanvasOptions) {

    const {
      imgUrl,
      winWidth,
      winHeight,
      canUseCanvas,
    } = options;

    // 设置
    this.el = selector;
    this.imgUrl = imgUrl;
    this.winWidth = winWidth;
    this.winHeight = winHeight;
    this.canUseCanvas = canUseCanvas;

    this.options = options;

    if (this.canUseCanvas) {
      this.context = this.el.getContext('2d');
      this.canvasInit();
    } else {
      this.imageInit();
    }
  }

  /**
   * 图片初始化
   */
  private imageInit () {
    this.cWidth = this.winWidth - this.sidebarWidth;
    this.cHeight = this.winHeight - this.footerHeight;

    if (this.image) {
      this.setImgStyle('init');
    }

    this.loadimg(this.setImgStyle.bind(this, 'init'));
  }

  /**
   * 设置图片的样式
   */
  setImgStyle (type?: string) {
    const image = this.image;

    if (!image) return;

    if (type == "init") {
      const imgRect = getBoundingClientRect({
        naturalWidth: image.width,
        naturalHeight: image.height,
        wrapperWidth: this.cWidth,
        wrapperHeight: this.cHeight,
        curImgWidth: this.cImgWidth || image.width,
        curImgHeight: this.cImgHeight || image.height,
      });

      this.imgLeft = imgRect.imgLeft;
      this.imgTop = imgRect.imgTop;
      this.cImgWidth = imgRect.ImgWidth;
      this.cImgHeight = imgRect.ImgHeight;

      this.LongImgLeft = this.imgLeft;
      this.LongImgTop = this.imgTop;

      this.setCurScaleIndex();
    }

    this.el.style.width = `${this.cImgWidth}px`;
    this.el.style.height = `${this.cImgHeight}px`;
    this.el.style.top = `${this.imgTop}px`;
    this.el.style.left = `${this.imgLeft}px`;
  }

  private canvasInit () {
    this.cWidth = this.winWidth - this.sidebarWidth;
    this.cHeight = this.winHeight - this.footerHeight;

    this.el.width = this.cWidth;
    this.el.height = this.cHeight;

    if (this.image) {
      this.drawImg('init');
      return;
    }

    this.loadimg(this.drawImg.bind(this, 'init'));
  }

  private drawImg (type?: string) {
    const image = this.image;
    const context = this.context;

    if (!image) return;

    if (type == "init") {
      const imgRect = getBoundingClientRect({
        naturalWidth: image.width,
        naturalHeight: image.height,
        wrapperWidth: this.cWidth,
        wrapperHeight: this.cHeight,
        curImgWidth: this.cImgWidth || image.width,
        curImgHeight: this.cImgHeight || image.height,
        curImgTop: this.imgTop || 0,
        curImgLeft: this.imgLeft || 0,
        winWidth: this.winWidth,
      });

      this.imgLeft = imgRect.imgLeft;
      this.imgTop = imgRect.imgTop;
      this.cImgWidth = imgRect.ImgWidth;
      this.cImgHeight = imgRect.ImgHeight;

      this.LongImgLeft = this.imgLeft;
      this.LongImgTop = this.imgTop;

      this.setCurScaleIndex();
    }
 
    if (!this.cacheCanvas) {
      this.cacheCanvas = document.createElement("canvas");
    }

    this.cacheCanvas.width = this.cWidth;
    this.cacheCanvas.height = this.cHeight;
    const tempCtx = this.cacheCanvas.getContext('2d')!;

    tempCtx.drawImage(image, this.imgLeft, this.imgTop, this.cImgWidth, this.cImgHeight);
    
    requestAnimationFrame(() => {
      this.clearLastCanvas(context);
      context.drawImage(this.cacheCanvas, 0, 0);
    })

    if (this.options.loadingComplete && !this.isDoCallback) {
      this.options.loadingComplete(this);
      this.isDoCallback = true;
    }
  }

  /**
   * 设置当前 EachSizeWidthArray 的索引，用于 放大缩小
   */
  private setCurScaleIndex() {
    const cImgWidth = this.cImgWidth || this.image.width;

    const EachSizeWidthArray = this.EachSizeWidthArray;

    const curScaleIndex = getCurImgIndex(EachSizeWidthArray, cImgWidth);

    this.curScaleIndex = curScaleIndex;
  }

  /**
   * 修改当前 图片大小数组中的 索引
   * @param curSizeIndex :  
   */
  public changeCurSizeIndex(curSizeIndex: number) {
    let curScaleIndex = curSizeIndex;

    if (curScaleIndex > 12) curScaleIndex = 12;
    if (curScaleIndex < 0) curScaleIndex = 0;

    const cWidth = this.cWidth;
    const cHeight = this.cHeight;

    // const imageRadio = this.imageRadio;

    const prevScaleTimes = this.curScaleIndex;
    const EachSizeWidthArray = this.EachSizeWidthArray;

    let scaleRadio = 1;

    scaleRadio = EachSizeWidthArray[curScaleIndex] / EachSizeWidthArray[prevScaleTimes];

    this.cImgHeight = this.cImgHeight * scaleRadio;
    this.cImgWidth = this.cImgWidth * scaleRadio;

    this.imgTop = cHeight / 2 - (cHeight / 2 - this.imgTop) * scaleRadio;
    this.curScaleIndex = curScaleIndex;

    if (this.cImgHeight < cHeight && this.cImgWidth < cWidth) {
      this.imgTop = (cHeight - this.cImgHeight) / 2;
    }

    this.imgLeft = cWidth / 2 - this.cImgWidth / 2;

    this.LongImgTop = this.imgTop;
    this.LongImgLeft = this.imgLeft;

    if (this.canUseCanvas) {
      this.drawImg();
    } else {
      this.setImgStyle();
    }
  }

  /**
   * 清除画布
   * @param ctx 
   */
  private clearLastCanvas (ctx: any) {
    ctx.clearRect(0, 0, this.cWidth, this.cHeight);
  }

  /**
   * 滚轮事件
   * @param e wheel 的事件参数
   */
  public WheelUpdate(e: any) {
    const image = this.image;

    if (!image) {
      return;
    }

    const cWidth = this.cWidth;
    const cHeight = this.cHeight;

    if (this.cImgHeight < cHeight && this.cImgWidth < cWidth) {
      return;
    }

    if (this.cImgHeight > cHeight) {
      this.LongImgTop = this.LongImgTop - e.deltaY;

      if (e.deltaY > 0) { // 向下
        if ((-this.LongImgTop) > this.cImgHeight + LONG_IMG_TOP - window.innerHeight + this.footerHeight) { // 这个 50 为 缓冲
          this.LongImgTop = -(this.cImgHeight + LONG_IMG_TOP - window.innerHeight + this.footerHeight);
        }
      } else {
        if (this.LongImgTop > LONG_IMG_TOP) {
          this.LongImgTop = LONG_IMG_TOP;
        }
      }
    }

    if (this.cImgWidth > cWidth) {
      this.LongImgLeft = this.LongImgLeft - e.deltaX;

      if (e.deltaX > 0) {
        if ((-this.LongImgLeft) > this.cImgWidth + LONG_IMG_Left - window.innerWidth + this.sidebarWidth) {
          this.LongImgLeft = -(this.cImgWidth + LONG_IMG_Left - window.innerWidth + this.sidebarWidth);
        }
      } else {
        if (this.LongImgLeft > LONG_IMG_Left) {
          this.LongImgLeft = LONG_IMG_Left;
        }
      }
    }

    this.imgTop = this.LongImgTop;
    this.imgLeft = this.LongImgLeft;

    if (this.canUseCanvas) {
      this.drawImg();
    } else {
      this.setImgStyle();
    }
  }

  /**
   * 鼠标拖动的事件
   * @param moveFlag : 是否能移动的标志位
   * @param e 
   */
  public MoveCanvas(moveFlag: boolean, e: any) {
    if (moveFlag) {
      const cWidth = this.cWidth;
      const cHeight = this.cHeight;

      if (this.cImgHeight < cHeight && this.cImgWidth < cWidth) {
        return;
      }

      const { clientX, clientY } = e;

      const curX = this.curPos.x;
      const curY = this.curPos.y;

      if (this.cImgHeight > this.cHeight) {
        this.LongImgTop = this.LongImgTop + (clientY - this.curPos.y);

        if (clientY - curY > 0) {
          if (this.LongImgTop >= LONG_IMG_TOP) {
            this.LongImgTop = LONG_IMG_TOP;
          }
        } else {
          if ((-this.LongImgTop) > this.cImgHeight + LONG_IMG_TOP - window.innerHeight + this.footerHeight) {
            this.LongImgTop = -(this.cImgHeight + LONG_IMG_TOP - window.innerHeight + this.footerHeight);
          }
        }
      }

      if (this.cImgWidth > this.cWidth) {
        this.LongImgLeft = this.LongImgLeft + (clientX - this.curPos.x);

        if (clientX - curX > 0) {
          if (this.LongImgLeft >= LONG_IMG_Left) {
            this.LongImgLeft = LONG_IMG_Left;
          }
        } else {
          if ((-this.LongImgLeft) > this.cImgWidth + LONG_IMG_Left - window.innerWidth + this.sidebarWidth) {
            this.LongImgLeft = -(this.cImgWidth + LONG_IMG_Left - window.innerWidth + this.sidebarWidth);
          }
        }

        this.imgLeft = this.LongImgLeft;
      }

      this.curPos.x = clientX;
      this.curPos.y = clientY;

      this.imgTop = this.LongImgTop;
      this.imgLeft = this.LongImgLeft;


      if (this.canUseCanvas) {
        this.drawImg();
      } else {
        this.setImgStyle();
      }
    }
  }

  /**
   * 加载图片
   * @param callback ：图片加载完成后要做的事情
   */
  private loadimg(callback: any) {
    const imgDom = new Image();
    imgDom.src = this.imgUrl;
    // imgDom.setAttribute("crossOrigin",'anonymous');

    const _this = this;

    imgDom.onload = function() {
      _this.image = this;
      _this.setEachSizeArr();
      callback();
    }
  }

  /**
   * 计算图片放大、缩小各尺寸的大小数组，
   */
  private setEachSizeArr () {
    const image = this.image;

    const EachSizeWidthArray: number[] = getEachSizeWidthArray({
      naturalWidth: image.width,
      naturalHeight: image.height,
    })

    this.EachSizeWidthArray = EachSizeWidthArray;

    const fixScreenSize = getFixScreenIndex({
      naturalWidth: image.width,
      naturalHeight: image.height,
      wrapperWidth: this.cWidth,
      wrapperHeight: this.cHeight,
    }, EachSizeWidthArray);

    this.fixScreenSize = fixScreenSize;
  }
}

export default ImgToCanvas;