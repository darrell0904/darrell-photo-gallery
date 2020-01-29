/// <reference types="react" />
interface winSize {
    width: number;
    height: number;
}
interface Props {
    WinSize: winSize;
    canUseCanvas: boolean;
    curSize: number;
    imgUrl: string;
    imgLoading: boolean;
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
declare const Canvas: (props: Props) => JSX.Element;
export default Canvas;
