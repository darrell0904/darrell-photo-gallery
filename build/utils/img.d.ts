/**
 * 获取图片在 显示区域中 的 宽高，top，left
 */
interface RectWidth {
    naturalWidth: number;
    naturalHeight: number;
    wrapperWidth: number;
    wrapperHeight: number;
    curImgWidth?: number;
    curImgHeight?: number;
    curImgTop?: number;
    curImgLeft?: number;
    winWidth?: number;
}
interface BoundingClientRect {
    imgTop: number;
    imgLeft: number;
    ImgHeight: number;
    ImgWidth: number;
}
interface NaturalImg {
    naturalWidth: number;
    naturalHeight: number;
}
export declare const getBoundingClientRect: (options: RectWidth) => BoundingClientRect;
/**
 * 获取各尺寸的图片大小，默认最大是原图的 4 倍，最小是原图的 1/10；总共能放大缩小六次
 */
export declare const getEachSizeWidthArray: (options: NaturalImg) => number[];
/**
 * 获取适应屏幕 的 sizeIndex
 * @params EachSizeWidthArray：各尺寸的图片宽度
 */
export declare const getFixScreenIndex: (options: RectWidth, EachSizeWidthArray: number[]) => number;
/**
 * 获取当前的 curIndex
 * @params EachSizeWidthArray：各尺寸的图片宽度
 * @params CurImgWidth：当前页面的大小
 */
export declare const getCurImgIndex: (EachSizeWidthArray: number[], CurImgWidth: number) => number;
export {};
