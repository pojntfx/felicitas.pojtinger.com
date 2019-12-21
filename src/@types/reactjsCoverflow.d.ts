declare module "reactjs-coverflow" {
  export namespace Coverflow {}
}

interface ICoverflowProps {
  startPosition?: number;
  enableScroll?: boolean;
  margin?: string | number;
  animationSpeed?: string | number;
  rotate?: number;
  translateX?: string | number;
  onChange?(newPosition: number): any;
}
