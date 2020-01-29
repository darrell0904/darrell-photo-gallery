declare namespace SidebarLessModule {
  export interface ISidebarLess {
    imgItem: string;
    imgSpan: string;
    sidebar: string;
  }
}

declare const SidebarLessModule: SidebarLessModule.ISidebarLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SidebarLessModule.ISidebarLess;
};

export = SidebarLessModule;
