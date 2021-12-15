type Route = { path: string; cb: () => void };

class Router {
  routes: Array<Route> = [];
  current: string;

  constructor() {
    this.listen();
  }

  add = (path: string, cb: () => void) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: string) => {
    this.routes = this.routes.filter((route) => route.path !== path);
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  static clearSlashes = (path: string) => String(path).replace(/^\/|\/$/g, '');

  static getFragment = () => {
    const match = window.location.href.match(/#(.*)$/);
    const fragment = match ? match[1] : '';
    return Router.clearSlashes(fragment);
  };

  listen = () => {
    setInterval(() => {
      if (this.current === Router.getFragment()) return;
      this.current = Router.getFragment();

      const currentRoute = this.routes.find((route) => route.path === this.current);
      if (currentRoute) currentRoute.cb();
    }, 50);
  };
}

export default Router;
