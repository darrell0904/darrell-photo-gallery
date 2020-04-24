import { findCloseSet } from '@utils/utils';

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

// const LONG_IMG_TOP: number = 10; // 长图距离顶部和底部的距离
// const LONG_IMG_Left: number = 10; // 长图距离顶部和底部的距离


const SCALE_TO_NATURAL : number = 4;  // 放大到原来的4倍
const MINI_TO_NATURAL: number = 10;  // 缩小到原来的10倍

const SCALE_TIMES: number = 6;  // 缩小到原来的10倍

const CUR_SCALE_INDEX: number = 6; // 现在的尺寸在哪一个地方
// const FIX_SCREEN_SIZE: number = 6; // 适应屏幕的 size

export const getBoundingClientRect = (options: RectWidth): BoundingClientRect => {
  const {
    naturalWidth,
    naturalHeight,
    wrapperWidth,
    wrapperHeight,
    curImgWidth,
    curImgHeight,
    curImgTop,
    curImgLeft,
    winWidth,
  } = options;

  const imageRadio = naturalWidth / naturalHeight;
  const imageHightRadio = naturalHeight / naturalWidth;

  const wrapperRadio = wrapperWidth / wrapperHeight;
  const wrapperHeightRadio = wrapperHeight / wrapperWidth;


  const newWinWidth = (winWidth! - 120) / 2;

  let imgTop : number = curImgTop!;
  let imgLeft: number = curImgLeft!;
  let ImgHeight: number = curImgHeight!;
  let ImgWidth: number = curImgWidth!;

  if (imageRadio <= 1) {
    imgTop = wrapperHeight * 0.05;

    ImgHeight = wrapperHeight - wrapperHeight * 0.05 * 2;
    ImgWidth = ImgHeight * naturalWidth / naturalHeight;

    if (wrapperRadio <= imageRadio) {
      ImgWidth = wrapperWidth - wrapperWidth * 0.05 * 2;
      ImgHeight =  ImgWidth * naturalHeight / naturalWidth;

      imgTop = (wrapperHeight - ImgHeight) / 2
    }

    // 如果图片实际宽度小于 cabnvas 的宽度
    // 图片的宽度就是原图，高度就是等比例
    // 图片宽高比 小于 55 %，需要展示全部高度图片，即图片可以滚动

    if (wrapperWidth >= naturalWidth && imageRadio <= 0.55) {
      ImgWidth = naturalWidth;
      ImgHeight =  ImgWidth * naturalHeight / naturalWidth;
      imgTop = (wrapperHeight - ImgHeight) / 2;
    }

    imgLeft = newWinWidth - ImgWidth / 2;
  }

  if (imageHightRadio < 1) {
    ImgWidth = wrapperWidth - wrapperWidth * 0.05 * 2;
    ImgHeight = ImgWidth * naturalHeight / naturalWidth;

    imgTop = (wrapperHeight - ImgHeight) / 2;

    if (wrapperHeightRadio <= imageHightRadio) {
      ImgHeight = wrapperHeight - wrapperHeight * 0.05 * 2;
      ImgWidth = ImgHeight * naturalWidth / naturalHeight;

      imgTop = wrapperHeight * 0.05;
    }

    imgLeft = newWinWidth - ImgWidth / 2;
  }

  return {
    imgLeft,
    imgTop,
    ImgWidth,
    ImgHeight,
  }
}

/**
 * 获取各尺寸的图片大小，默认最大是原图的 4 倍，最小是原图的 1/10；总共能放大缩小六次
 */
export const getEachSizeWidthArray = (options: NaturalImg) => {
  const { naturalWidth } = options;

  const scaleToNatural = SCALE_TO_NATURAL;
  const miniToNatural = MINI_TO_NATURAL;

  const scaleTimes: number = SCALE_TIMES;

  const maxNaturalWidth: number = scaleToNatural * naturalWidth;
  const minNaturalWidth: number = naturalWidth / miniToNatural;

  const EachMaxSize: number = (maxNaturalWidth - naturalWidth) / scaleTimes;
  const EachMinSize: number = (naturalWidth - minNaturalWidth) / scaleTimes;

  let EachSizeWidthArray: number[] = [];

  EachSizeWidthArray = [
    ...Array.from({length: scaleTimes}, (_v, i) => (minNaturalWidth + i * EachMinSize )),
    ...Array.from({length: scaleTimes + 1}, (_v, i) => (naturalWidth + i * EachMaxSize))
  ]

  return EachSizeWidthArray;
}

/**
 * 获取适应屏幕 的 sizeIndex
 * @params EachSizeWidthArray：各尺寸的图片宽度
 */
export const getFixScreenIndex = (options: RectWidth, EachSizeWidthArray: number[]) => {
  const { naturalWidth, naturalHeight, wrapperWidth, wrapperHeight} = options;

  const right = EachSizeWidthArray.length - 1;

  let fixScreenSize: number = CUR_SCALE_INDEX;

  // 跳出整个循环？
  for (let i = right; i >= 0; i--) {
    const itemWidth = EachSizeWidthArray[i];
    const itemHeight = itemWidth * naturalHeight / naturalWidth;

    if (itemWidth < wrapperWidth && itemHeight < wrapperHeight) {
      fixScreenSize = i;
      break;
    }
  }

  return fixScreenSize;
}

/**
 * 获取当前的 curIndex
 * @params EachSizeWidthArray：各尺寸的图片宽度
 * @params CurImgWidth：当前页面的大小
 */
export const getCurImgIndex = (EachSizeWidthArray: number[], CurImgWidth: number): number => {
  const cImgWidth = CurImgWidth;

  if (!EachSizeWidthArray) return CUR_SCALE_INDEX;

  const curScale = findCloseSet(EachSizeWidthArray, cImgWidth);

  const curScaleIndex = EachSizeWidthArray.indexOf(curScale);
  
  return curScaleIndex;
}
