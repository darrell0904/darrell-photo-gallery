declare namespace ImageLessModule {
  export interface IImageLess {
    imgBox: string;
    isVisiblity: string;
  }
}

declare const ImageLessModule: ImageLessModule.IImageLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ImageLessModule.IImageLess;
};

export = ImageLessModule;
