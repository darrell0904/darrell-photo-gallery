declare global {
  interface Window {
    mozRequestAnimationFrame: any;
    oRequestAnimationFrame: any;
    mozCancelAnimationFrame: any;
    oCancelAnimationFrame: any;
  }
}

export = global;