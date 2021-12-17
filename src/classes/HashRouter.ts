/**
 * @module Router
 */

import { THRoute, TRoute, TRouteCallback } from '@type/router';

/**
 * Class for creating a router with hash support
 */

class HashRouter {
  /** array of saved routes */
  #routes: THRoute[] = [];

  /**
   * Method for change a title to a browser tab
   */

  static #changeTitle(title: string): void {
    document.title = title;
  }

  /**
   * Method for adding a route to a router
   * @param hash hash route
   * @param title the title of the browser tab
   * @param callback callback function for route
   */

  addRoute(hash: string, title: string, callback: TRouteCallback): HashRouter {
    this.#routes.push({
      hash,
      title,
      callback,
      isCalled: false,
    });
    return this;
  }

  /**
   * Method for finding a route in the array of saved routes of the router
   * @param hash hash route
   */

  findRoute(hash: string): THRoute | undefined {
    return this.#routes.find((r) => r.hash === hash);
  }

  /**
   * Method whether the given route was called
   * @param hash hash route
   */

  checkRoute(hash: string): boolean | undefined {
    const route = this.findRoute(hash);
    return route?.isCalled;
  }

  /**
   * Method for getting hash
   */

  static #getHash(): string {
    return window.location.hash.slice(1);
  }

  /**
   * Method for initializing the router
   */

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
