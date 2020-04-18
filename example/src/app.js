import React, { useState }  from 'react';
import { render } from 'react-dom'
import styles from "./index.less";
import PhotoGallery from '../../src/index'; // 引入组件
// import PhotoGallery from 'darrell-photo-gallery';
import 'darrell-photo-gallery/lib/main.min.css';

const ImgData = [
  {
    "url": "https://images-cdn.shimo.im/ZrtwqVbbrlU8VC4Y/50_.png__original",
    "size": "278452",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "https://uploader.shimo.im/f/fxr0tojKkcIHxEFX.png!original",
    "size": "290957",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/863b4684432e71adff1d76902c0a0b93.png",
    "size": "286927",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/f39dc16eed18e74eb211df1a014881a6.png",
    "size": "265634",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/6eccbe1c907948f8238d17161913b92f.png",
    "size": "362623",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/56d57dbb54e98b462c46f37059aba62c.png",
    "size": "306385",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/2fd608a24d2b0f3b4c17e1d580f71553.png",
    "size": "362321",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "http://public-alicliimg.clewm.net/dwagimg/086a2926612a427c788fae08459b8d55.png",
    "size": "340887",
    "width": "1410",
    "height": "1410",
    "is_onlocal": "0"
  },
  {
    "url": "https://uploader.shimo.im/f/ZLYlotu9LwraXaEu.png!original",
    "size": "1032445",
    "width": "1410",
    "height": "2508",
    "is_onlocal": "0"
  }
];

const App = () => {

  const [visible, setVisible] = useState(false);

  const ChangeVisible = () => {
    setVisible(true);
  }

  return (
    <div className={styles.App}>
      <span
        className={styles.demo}
        onClick={ChangeVisible}
      >
        点击放大
      </span>
      <PhotoGallery
        visible={visible}
        imgData={ImgData}
        currentImg = {9}
        hideModal={
          () => {
            setVisible(false);
          }
        }
      />
    </div>
  );
}

render(<App />, document.getElementById('root'));