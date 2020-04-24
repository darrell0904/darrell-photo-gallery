/// <reference types="react" />
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
declare const Sidebar: (props: Props) => JSX.Element;
export default Sidebar;
