interface Route {
  path: string;
  cb: () => void;
}

class Router {
  routes: Set<Route>;

  constructor() {
    this.routes = new Set();

    window.addEventListener('popstate', () => {
      this.go(document.location.hash.replace('#/', ''));
    });
  }

  private static normalize(path: string) {
    return path.replace(/^\/|#\/|\/$/gu, '');
  }

  add = (href: string, cb: () => void) => {
    const path = Router.normalize(href);
    this.routes.add({ path, cb });
    return this;
  };

  remove = (href: string) => {
    const path = Router.normalize(href);

    for (const route of this.routes) {
      if (route.path === path) {
        this.routes.delete(route);
      }
    }
    return this;
  };

  flush = () => {
    this.routes.clear();
    return this;
  };

  go = (href: string) => {
    const path = Router.normalize(href);

    for (const route of this.routes) {
      if (route.path === path) {
        route.cb();
      }
    }
  };
}

export default Router;
