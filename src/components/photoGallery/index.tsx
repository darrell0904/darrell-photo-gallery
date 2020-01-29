import React, { useState, useEffect, useCallback }  from 'react';
import { canUseCanvas } from '@utils/utils';
import * as loadingImg from '@images/loading.gif';
import classNames from 'classnames';
import { Footer, Sidebar, Canvas, Image } from './components';
import "@components/photoGallery/fonts/iconfont.less";
import * as styles from './index.less';

interface recordImg {
  url: string;
  size?: string;
  width?: string;
  height?: string;
  is_onlocal?: string;
}

interface Props {
  visible: boolean;
  currentImg: number;
  imgData: recordImg[];
  hideModal?(): void;
}

interface curPos {
  x: number,
  y: number,
}

let moveFlag: boolean = false;

let StartPos: curPos = {
  x: 0,
  y: 0,
}

let DoClick: boolean = true;

const NATURAL_CUR_INDEX = 6; // 图片原图 在放大缩小数组中的 索引

function useWinSize(){
  const [ size , setSize] = useState({
      width:  document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
  });

  const onResize = useCallback(()=>{
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, []);

  useEffect(()=>{
      window.addEventListener('resize', onResize, false);

      return ()=>{
        window.removeEventListener('resize', onResize, false);
      }
  }, [])

  return size;
}

const photoGallery = (props: Props): JSX.Element => {
  const { imgData, currentImg, visible } = props;

  const [imgUrl, setImgUrl] = useState(imgData[currentImg - 1].url);
  const [curSize, setCurSize] = useState(NATURAL_CUR_INDEX);
  const [fixScreenSize, setFixScreenSize] = useState(NATURAL_CUR_INDEX);

  const [currentImgIndex, setCurrentImgIndex] = useState(currentImg);

  const [imgLoading, setImgLoading] = useState(true);

  const winSize = useWinSize();

  const WheelUpdate = (e: any, instance: any) => {
    // 执行滚轮事件
    instance.WheelUpdate(e);
  }

  const MouseDown = (e: any, instance: any) => {
    moveFlag = true;
    const { clientX, clientY } = e;

    instance.curPos.x = clientX;
    instance.curPos.y = clientY;

    StartPos.x = clientX;
    StartPos.y = clientY;
  }

  const MouseMove = (e: any, instance: any) => {
    instance.MoveCanvas(moveFlag, e);
  }

  const MouseUp = (e: any) => {
    moveFlag = false;

    if (e.clientX === StartPos.x && e.clientY === StartPos.y) {
      DoClick = true;
    } else {
      DoClick = false;
    }
  }

  const Click = () => {
    if (!DoClick) return;
    const { hideModal } = props;
    if (hideModal) {
      hideModal();
    }
  }

  let wrapperDom = null;

  if (canUseCanvas) {
    wrapperDom = (
      <Canvas
        WinSize={winSize}
        WheelUpdate={WheelUpdate}
        MouseDown={MouseDown}
        MouseMove={MouseMove}
        MouseUp={MouseUp}
        Click={Click}
        canUseCanvas={canUseCanvas}
        curSize={curSize}
        imgUrl={imgUrl}
        imgLoading={imgLoading}
        setFixScreenSize={
          (curSize) => {
            if (curSize < 0) {
              curSize = 0
            }

            if (curSize > 12) {
              curSize = 12;
            }
            setFixScreenSize(curSize);
          }
        }
        setCurSize={
          (curSize) => {
            if (curSize < 0) {
              curSize = 0
            }

            if (curSize > 12) {
              curSize = 12;
            }
            setCurSize(curSize);
          }
        }
        setImgLoading={
          (bool) => {
            setImgLoading(bool);
          }
        }
      />
    )
  } else {
    wrapperDom = (
      <Image
        imgUrl={"https://images-cdn.shimo.im/lfHCtJgv20E3RfkO/161.png__original"}
        WinSize={winSize}
        canUseCanvas={canUseCanvas}
        WheelUpdate={WheelUpdate}
        MouseDown={MouseDown}
        MouseMove={MouseMove}
        MouseUp={MouseUp}
        Click={Click}
      />
    )
  }

  return (
    <div
      className={
        classNames(
          styles.modalWrapper,
          {
            [styles.showImgGallery]: visible,
          }
        )
      }
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imgwrapper}>
          <img
            src={loadingImg}
            alt="loading"
            className={
              classNames(
                styles.loadingImg,
                {
                  [styles.imgLoding]: imgLoading,
                }
              )
            }
          />
          { wrapperDom }
        </div>
        <Sidebar
          imgData={imgData}
          setImgUrl={
            (imgUrl) => {
              setImgUrl(imgUrl);
            }
          }
          setCurrentImgIndex={
            (index) => {
              setCurrentImgIndex(index);
            }
          }
          setImgLoading={
            (bool) => {
              setImgLoading(bool);
            }
          }
        />
        <Footer
          curSize={curSize}
          fixScreenSize={fixScreenSize}
          imgsLens={imgData.length}
          currentImgIndex={currentImgIndex}
          setCurSize={
            (curSize) => {
              if (curSize < 0) {
                curSize = 0
              }

              if (curSize > 12) {
                curSize = 12;
              }

              setCurSize(curSize);
            }
          }
        />
      </div>
    </div>
  );
}

export default photoGallery;
