declare namespace FooterLessModule {
  export interface IFooterLess {
    footer: string;
    icon: string;
    "icon-552cc1b6033d0": string;
    "icon-Plus": string;
    "icon-down": string;
    "icon-ellipsis2": string;
    "icon-fangda": string;
    "icon-jian": string;
    "icon-left": string;
    "icon-right": string;
    "icon-shuangyoujiantou-": string;
    "icon-shuangzuojiantou-": string;
    "icon-suoxiao": string;
    "icon-top": string;
    "icon-xiazai": string;
    icon552Cc1B6033D0: string;
    iconDown: string;
    iconEllipsis2: string;
    iconFangda: string;
    iconJian: string;
    iconLeft: string;
    iconPlus: string;
    iconRight: string;
    iconShuangyoujiantou: string;
    iconShuangzuojiantou: string;
    iconSuoxiao: string;
    iconTop: string;
    iconXiazai: string;
    iconfont: string;
    toolBarActions: string;
    toolBarItems: string;
    toolbarIndex: string;
    toolbarIndexNumber: string;
  }
}

declare const FooterLessModule: FooterLessModule.IFooterLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterLessModule.IFooterLess;
};

export = FooterLessModule;
