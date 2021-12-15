type THCallback = (...args: any[]) => void;

type THRoute = {
  path: string;
  cb: THCallback;
};

class HistoryRouter {
  #routes: THRoute[] = [];

  currentPath = '';

  #root = '/';

  constructor(root?: string) {
    if (root) {
      this.#root = root;
    }
  }

  addRoute(path: string, cb: THCallback) {
    this.#routes.push({
      path,
      cb,
    });
    return this;
  }

  static clearSlashes(path: string): string {
    return path.replace(/\/$/, '').replace(/^\//, '');
  }

  getFragment(): string {
    let fragment = '';

    fragment = HistoryRouter.clearSlashes(
      decodeURI(window.location.pathname + window.location.search),
    );
    fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.#root !== '/' ? fragment.replace(this.#root, '') : fragment;

    return HistoryRouter.clearSlashes(fragment);
  }

  navigate(path: string) {
    window.history.pushState(
      null,
      '',
      this.#root + HistoryRouter.clearSlashes(path),
    );
    return this;
  }

  findRoute(path: string): THRoute | undefined {
    return this.#routes.find((r) => r.path === path);
  }

  interval() {
    if (this.currentPath === this.getFragment()) {
      return;
    }

    this.currentPath = this.getFragment();

    const route = this.findRoute(this.currentPath);

    if (!route) {
      throw new Error('This path is undefined');
    } else {
      route.cb();
    }

    // if (this.#currentPath === this.getFragment()) return;
    // this.#currentPath = this.getFragment();
    //
    // this.#routes.some((route) => {
    //   const match = this.#currentPath.match(route.path);
    //
    //   if (match) {
    //     match.shift();
    //     route.cb.apply({}, match);
    //     return match;
    //   }
    //   return false;
    // });
  }

  init(): void {
    setInterval(this.interval.bind(this), 1000);
  }

  // listen() {
  //   clearInterval(this.interval);
  //   this.interval = setInterval(this.interval, 50);
  // }
}

export default HistoryRouter;
