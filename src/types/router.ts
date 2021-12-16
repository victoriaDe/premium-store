export type TRouteCallback = (...args: any[]) => void;

export type TRoute = {
  path: string;
  callback: TRouteCallback;
};
