import React, { useRef, useEffect } from 'react';
import ImgToCanvas from '../canvas';
import classNames from 'classnames';
import styles from './image.less';

interface winSize {
  width: number;
  height: number;
}

interface Props {
  WinSize: winSize;
  imgUrl: string;
  canUseCanvas: boolean;
  WheelUpdate(e: any, instance: any): void;
  MouseDown(e: any, instance: any): void;
  MouseMove(e: any, instance: any): void;
  MouseUp(e: any): void;
  Click(): void;
}

const Image = (props: Props): JSX.Element =>  {
  const {
    imgUrl,
    WinSize: size,
    canUseCanvas,
  } = props;

  const winWidth = size.width;
  const winHeight = size.height;

  let imageRef: any = useRef();
  let imageInstance: any = useRef(null);

  useEffect((): any=>{
    window.addEventListener('mouseup', MouseUp, false);

    return ()=>{
      window.removeEventListener('mouseup', MouseUp, false);
    }
  }, [imageRef]);

  useEffect((): void => {
    const imageNode = imageRef.current;

    if (imageInstance.current) {
      const canvasClass = imageInstance.current;

      canvasClass.winWidth = winWidth;
      canvasClass.winHeight = winHeight;

      canvasClass.imageInit();
    } else {
      imageInstance.current = new ImgToCanvas(imageNode, {
        imgUrl,
        winWidth,
        winHeight,
        canUseCanvas: false,
        loadingComplete: function() {
        },
      });
    }

  }, [imageRef, winWidth, winHeight]);


  const CanvasClick = () => {
    const { Click } = props;
    Click();
  }

  const WheelHandler = (e: any) => {
    if (!imageInstance.current) return;
    e.stopPropagation();

    const instance = imageInstance.current;

    const { WheelUpdate } = props;

    WheelUpdate(e, instance);
  }

  const MouseDown = (e: any) => {
    if (!imageInstance.current) return;
    e.stopPropagation();

    const instance = imageInstance.current;

    const { MouseDown } = props;

    MouseDown(e, instance);
  }

  const MouseMove = (e: any) => {
    if (!imageInstance.current) return;
    e.stopPropagation();

    const instance = imageInstance.current;

    const { MouseMove } = props;

    MouseMove(e, instance);
  }

  const MouseUp = (e: any) => {
    e.stopPropagation();
    const { MouseUp } = props;

    MouseUp(e);
  }

  const handleDragStart = (e: any): void => {
    e.preventDefault();
  }

  const handleDragEnd = (e: any): void => {
    e.preventDefault();
  }

  return (
    <img
      ref={imageRef}
      src={imgUrl}
      onClick={CanvasClick}
      onWheel={WheelHandler}
      onMouseDown={MouseDown}
      onMouseMove={MouseMove}
      onMouseUp={MouseUp}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={
        classNames(
          styles.imgBox,
          {
            [styles.isVisiblity]: !canUseCanvas
          }
        )
      }
    />
  );
};

export default Image;