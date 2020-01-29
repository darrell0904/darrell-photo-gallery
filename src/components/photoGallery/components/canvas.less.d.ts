declare namespace CanvasLessModule {
  export interface ICanvasLess {
    isImgLoading: string;
  }
}

declare const CanvasLessModule: CanvasLessModule.ICanvasLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CanvasLessModule.ICanvasLess;
};

export = CanvasLessModule;
