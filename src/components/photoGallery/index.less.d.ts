declare namespace IndexLessModule {
  export interface IIndexLess {
    contentWrapper: string;
    footer: string;
    imgLoding: string;
    imgwrapper: string;
    loadingImg: string;
    modalWrapper: string;
    showImgGallery: string;
    sidebar: string;
  }
}

declare const IndexLessModule: IndexLessModule.IIndexLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexLessModule.IIndexLess;
};

export = IndexLessModule;
