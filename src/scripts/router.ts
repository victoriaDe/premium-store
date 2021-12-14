type TRoute = {
  hash: string;
  callback: TRouteCallback;
};
type TRouteCallback = (...rest: any[]) => any;

class Router {
  routes: TRoute[] = [];

  root = '/';

  constructor(root?: string) {
    if (root) {
      this.root = root;
    }
  }

  addRoute(hash: string, callback: TRouteCallback) {
    this.routes.push({
      hash,
      callback,
    });
    return this;
  }

  getRoute(hash: string): TRoute {
    let route = this.routes.find((r) => r.hash === hash);

    if (!route) {
      route = this.routes.find((r) => r.hash === '');
    }

    return (
      route || {
        hash: 'none',
        callback: () => new Error('This page is undefined'),
      }
    );
  }

  static getHash(): string {
    return window.location.hash.slice(1);
  }

  init() {
    window.addEventListener('hashchange', () => {
      const hash = Router.getHash();
      const route = this.getRoute(hash);
      route.callback();
    });
  }
}

export default Router;
