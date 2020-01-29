import React, { useEffect, useRef } from 'react';
import ImgToCanvas from '../canvas';
import classNames from 'classnames';
import styles from './canvas.less';

interface winSize {
  width: number;
  height: number;
}

interface Props {
  WinSize: winSize;
  canUseCanvas: boolean;

  curSize: number; // 现在是放大的第几个
  imgUrl: string;
  imgLoading: boolean; // 图片加载

  setCurSize(cueSize: number): void;
  setImgLoading(bool: boolean): void;
  setFixScreenSize(fixScreenSize: number): void;

  WheelUpdate(e: any, instance: any): void;
  MouseDown(e: any, instance: any): void;
  MouseMove(e: any, instance: any): void;
  MouseUp(e: any): void;
  Click(): void;

  hideModal?(): void;
}

const Canvas = (props: Props): JSX.Element => {
  const {
    imgUrl,
    WinSize: size,
    canUseCanvas,
    curSize,
    imgLoading,
  } = props;

  const winWidth = size.width;
  const winHeight = size.height;

  let canvasRef: any = useRef();
  let canvasInstance: any = useRef(null);

  let prevSizeRef: any = useRef(props.curSize);

  useEffect((): any=>{
    window.addEventListener('mouseup', MouseUp, false);

    return ()=>{
      window.removeEventListener('mouseup', MouseUp, false);
    }
  }, [canvasRef]);

  useEffect((): void => {
    const canvasNode = canvasRef.current;

    if (canvasInstance.current) {
      const canvasClass = canvasInstance.current;

      canvasClass.winWidth = winWidth;
      canvasClass.winHeight = winHeight;

      canvasClass.canvasInit();
    } else {
      canvasInstance.current = new ImgToCanvas(canvasNode, {
        imgUrl,
        winWidth,
        winHeight,
        canUseCanvas,
        loadingComplete: function() {
          props.setImgLoading(false);
        },
      });
    }

  }, [canvasRef, winWidth, winHeight]);

  useEffect((): void => {
    if (!canvasInstance.current) return;
    
    const canvasClass = canvasInstance.current;

    if (canvasClass.image) {
      canvasClass.changeCurSizeIndex(curSize);
      prevSizeRef.current = curSize;
    }
  }, [curSize]);

  useEffect((): void => {
    if (canvasInstance.current) canvasInstance.current = null;
    const canvasNode = canvasRef.current;
    
    canvasInstance.current = new ImgToCanvas(canvasNode, {
      imgUrl,
      winWidth,
      winHeight,
      canUseCanvas,
      loadingComplete: function(instance) {
        props.setImgLoading(false);
        props.setCurSize(instance.curScaleIndex);
        props.setFixScreenSize(instance.fixScreenSize);
      },
    });
  }, [imgUrl])

  const WheelHandler = (e: any) => {

    if (!canvasInstance.current) return;
    e.stopPropagation();

    const instance = canvasInstance.current;

    const { WheelUpdate } = props;

    WheelUpdate(e, instance);
  }

  const MouseDown = (e: any) => {
    if (!canvasInstance.current) return;
    e.stopPropagation();

    const instance = canvasInstance.current;

    const { MouseDown } = props;

    MouseDown(e, instance);
  }

  const MouseMove = (e: any) => {
    if (!canvasInstance.current) return;
    e.stopPropagation();

    const instance = canvasInstance.current;

    const { MouseMove } = props;

    MouseMove(e, instance);
  }

  const MouseUp = (e: any) => {
    e.stopPropagation();

    const { MouseUp } = props;

    MouseUp(e);
  }

  const CanvasClick = () => {
    const { Click } = props;
    Click();
  }

  /**
   * canvas 需要在渲染过程中就需要去加载，在 useEffect 中会出现闪顿
   */
  if (canvasInstance.current) {
    if (prevSizeRef.current === curSize) {
      const canvasClass = canvasInstance.current;
      canvasClass.canvasInit();
    }
  }

  return (
    <canvas
      ref={canvasRef}
      width={winWidth - 120}
      height={winHeight - 50}
      onClick={CanvasClick}
      onWheel={WheelHandler}
      onMouseDown={MouseDown}
      onMouseMove={MouseMove}
      onMouseUp={MouseUp}
      className={
        classNames(
          {
            [styles.isImgLoading]: imgLoading
          }
        )
      }
    >
      Your browser does not support the HTML5 canvass tag.
    </canvas>
  );
};

export default Canvas;