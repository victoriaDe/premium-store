import { THRoute, TRoute, TRouteCallback } from '@type/router';

class HashRouter {
  #routes: THRoute[] = [];

  static #changeTitle(title: string): void {
    document.title = title;
  }

  addRoute(hash: string, title: string, callback: TRouteCallback): HashRouter {
    this.#routes.push({
      hash,
      title,
      callback,
      isCalled: false,
    });
    return this;
  }

  findRoute(hash: string): THRoute | undefined {
    return this.#routes.find((r) => r.hash === hash);
  }

  checkRoute(hash: string): boolean | undefined {
    const route = this.findRoute(hash);
    return route?.isCalled;
  }

  static #getHash(): string {
    return window.location.hash.slice(1);
  }

  init() {
    window.addEventListener('hashchange', () => {
      const hash = HashRouter.#getHash();
      const route = this.findRoute(hash);
      if (route) {
        route.callback();
        route.isCalled = true;
        HashRouter.#changeTitle(route.title);
      } else {
        HashRouter.#changeTitle('*****');
        throw new Error(`Path #'${hash}' is undefined`);
      }
    });
  }
}

export default HashRouter;
