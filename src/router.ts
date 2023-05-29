import { Router } from './modules/router';
import { startPage } from './pages/start';
import { toysPage, toysPageController } from './pages/toys';
import { treePage, treePageController } from './pages/tree';

function goToPage(pageContent: string, pageController?: () => void) {
  const $main = document.querySelector('.main');
  if (!$main) {
    return;
  }
  // eslint-disable-next-line github/no-inner-html
  $main.innerHTML = pageContent;
  if (pageController) {
    pageController();
  }
}

export const initRouter = () => {
  const router = new Router();

  router
    .add('start', () => goToPage(startPage))
    .add('toys', () => goToPage(toysPage, toysPageController))
    .add('christmas-tree', () => goToPage(treePage, treePageController))
    .add('', () => goToPage(startPage));

  router.go(window.location.hash);
};
