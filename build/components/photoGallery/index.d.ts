/// <reference types="react" />
import "@components/photoGallery/fonts/iconfont.less";
interface recordImg {
    url: string;
    size?: string;
    width?: string;
    height?: string;
    is_onlocal?: string;
    [propName: string]: any;
}
interface Props {
    visible: boolean;
    currentImg: number;
    imgData: recordImg[];
    hideModal?(): void;
}
declare const photoGallery: (props: Props) => JSX.Element;
export default photoGallery;
