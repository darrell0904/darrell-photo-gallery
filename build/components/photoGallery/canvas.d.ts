interface CanvasOptions {
    imgUrl: string;
    winWidth: number;
    winHeight: number;
    canUseCanvas: boolean;
    loadingComplete?(instance: any): void;
}
declare class ImgToCanvas {
    private options;
    private el;
    private cacheCanvas;
    private canUseCanvas;
    private context;
    private image;
    private imgUrl;
    private imgTop;
    private imgLeft;
    private LongImgTop;
    private LongImgLeft;
    private sidebarWidth;
    private footerHeight;
    private cImgWidth;
    private cImgHeight;
    private winWidth;
    private winHeight;
    private cWidth;
    private cHeight;
    private curPos;
    private curScaleIndex;
    fixScreenSize: number;
    private EachSizeWidthArray;
    private isDoCallback;
    constructor(selector: any, options: CanvasOptions);
    /**
     * 图片初始化
     */
    private imageInit;
    /**
     * 设置图片的样式
     */
    setImgStyle(type?: string): void;
    private canvasInit;
    private drawImg;
    /**
     * 设置当前 EachSizeWidthArray 的索引，用于 放大缩小
     */
    private setCurScaleIndex;
    /**
     * 修改当前 图片大小数组中的 索引
     * @param curSizeIndex :
     */
    changeCurSizeIndex(curSizeIndex: number): void;
    /**
     * 清除画布
     * @param ctx
     */
    private clearLastCanvas;
    /**
     * 滚轮事件
     * @param e wheel 的事件参数
     */
    WheelUpdate(e: any): void;
    /**
     * 鼠标拖动的事件
     * @param moveFlag : 是否能移动的标志位
     * @param e
     */
    MoveCanvas(moveFlag: boolean, e: any): void;
    /**
     * 加载图片
     * @param callback ：图片加载完成后要做的事情
     */
    private loadimg;
    /**
     * 计算图片放大、缩小各尺寸的大小数组，
     */
    private setEachSizeArr;
}
export default ImgToCanvas;
