/**
 * 判断能否使用 canvas
 */
export const canUseCanvas = !!document.createElement('canvas').getContext;

/**
 * 二分查找 离数组最近的一个元素
 */
export const findCloseSet = (arr: number[], num: number) => {
  let left = 0;
  let right = arr.length - 1;

  while(left <= right){

    let middle = Math.floor((right + left) / 2);

    if(right - left <= 1){
      break;
    }

    let val = arr[middle];

    if(val === num){
      return val;
    }

    else if(val > num){
      right = middle;
    }

    else{
      left = middle;
    }
  }

  let leftValue = arr[left];
  let rightValue = arr[right];

  return rightValue - num > num - leftValue ? leftValue : rightValue;
}

const DEFAULT_INTERVAL = 1000 / 60;

/**
 * requestAnimationFrame
 */
export const requestAnimationFrame = (() => (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame

    // if all else fails, use setTimeout
    || function requestAnimationFrameTimeOut(callback: any) {
        // make interval as precise as possible.
        return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2);
      }
  )
)();

/**
 * cancelAnimationFrame
 */
export const cancelAnimationFrame = (() => (
    window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.oCancelAnimationFrame
    // if all else fails, use setTimeout
    || function cancelAnimationFrameClearTimeOut(id) {
        window.clearTimeout(id);
    })
)();