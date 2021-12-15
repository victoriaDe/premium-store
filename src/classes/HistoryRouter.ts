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
    // fragment = fragment.replace(/\?(.*)$/, '');
    fragment = this.#root !== '/' ? fragment.replace(this.#root, '') : fragment;

    return HistoryRouter.clearSlashes(fragment);
  }

  changeURI(path: string): void {
    if (path !== this.currentPath) {
      window.history.pushState(
        null,
        '',
        this.#root + HistoryRouter.clearSlashes(path),
      );
    } else {
      const route = this.findRoute(this.currentPath);
      route!.cb();
    }
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
      throw new Error(`Path ${this.currentPath} is undefined`);
    } else {
      route.cb();
    }
  }

  init(): void {
    setInterval(this.interval.bind(this), 50);
  }
}

export default HistoryRouter;
