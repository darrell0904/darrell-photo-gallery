/// <reference types="react" />
interface Props {
    curSize: number;
    fixScreenSize: number;
    imgsLens: number;
    currentImgIndex: number;
    setCurSize(cueSize: number): void;
}
declare const Footer: (props: Props) => JSX.Element;
export default Footer;
