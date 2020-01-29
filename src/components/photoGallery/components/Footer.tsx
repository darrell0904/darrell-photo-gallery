import React from 'react';
import styles from './footer.less';

interface Props {
  curSize: number; // 现在是放大的第几个
  fixScreenSize: number; // 适应屏幕的
  imgsLens: number;
  currentImgIndex: number;
  setCurSize(cueSize: number): void;
}

const Footer = (props: Props): JSX.Element => {

  const { imgsLens, currentImgIndex } = props;

  return (
    <div className={styles.footer}>
      <span className={styles.toolbarIndex}>
        <span className={styles.toolbarIndexNumber}>
          {currentImgIndex}/{imgsLens}
        </span>
      </span>
      <div className={styles.toolBarActions}>
        <span
          className={styles.toolBarItems}
          onClick={
            () => {
              const curSize = props.curSize;
              props.setCurSize(curSize + 1)
            }
          }
        >
          <span className={`iconfont icon-Plus ${styles.icon}`}></span>
        </span>
        <span
          className={styles.toolBarItems}
          onClick={
            () => {
              const curSize = props.curSize;
              props.setCurSize(curSize - 1)
            }
          }
        >
          {/* 缩小 */}
          <span className={`iconfont icon-jian ${styles.icon}`}></span>
        </span>
        <span
          className={styles.toolBarItems}
          onClick={
            () => {
              props.setCurSize(6); // 6 代表原尺寸
            }
          }
        >
          <span className={`iconfont icon-fangda ${styles.icon}`}></span>
        </span>
        <span
          className={styles.toolBarItems}
          onClick={
            () => {
              const fixScreenSize = props.fixScreenSize;
              props.setCurSize(fixScreenSize); // -1 适应屏幕
            }
          }
        >
          <span className={`iconfont icon-suoxiao ${styles.icon}`}></span>
        </span>
        <span
          className={styles.toolBarItems}
          onClick={
            () => {
              console.log('--下载了---');
            }
          }
        >
          <span className={`iconfont icon-xiazai ${styles.icon}`}></span>
        </span>
      </div>
      
    </div>
  );
};

export default Footer;