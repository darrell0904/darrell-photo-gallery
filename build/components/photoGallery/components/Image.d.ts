/// <reference types="react" />
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
declare const Image: (props: Props) => JSX.Element;
export default Image;
