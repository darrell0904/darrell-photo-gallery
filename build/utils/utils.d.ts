/**
 * 判断能否使用 canvas
 */
export declare const canUseCanvas = true;
/**
 * 二分查找 离数组最近的一个元素
 */
export declare const findCloseSet: (arr: number[], num: number) => number;
/**
 * requestAnimationFrame
 */
export declare const requestAnimationFrame: ((callback: FrameRequestCallback) => number) & ((callback: FrameRequestCallback) => number);
/**
 * cancelAnimationFrame
 */
export declare const cancelAnimationFrame: ((handle: number) => void) & ((handle: number) => void);
