import React from 'react';
import styles from './sidebar.less';

interface recordImg {
  url: string;
  size?: string;
  width?: string;
  height?: string;
  is_onlocal?: string;
}

interface Props {
  imgData: recordImg[];
  curImgUrl?: string;
  setCurrentImgIndex(index: number): void;
  setImgLoading(bool: boolean): void;
  setImgUrl(imgUrl: string): void;
}

const Sidebar = (props: Props): JSX.Element => {
  const { curImgUrl, imgData } = props;

  return (
    <div className={styles.sidebar}>
      {
        imgData.map((_, index) => {
          return (
            <div
              className={styles.imgItem}
              key={`${_.url}_${_.size}`}
            >
              <span
                className={styles.imgSpan}
                onClick={
                  () => {
                    if (curImgUrl === _.url) return;
                    props.setImgUrl(_.url);
                    props.setCurrentImgIndex(index + 1);
                    props.setImgLoading(true);
                  }
                }
              >
                <img src={_.url} alt="" />
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default Sidebar;