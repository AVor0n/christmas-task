import startPage from './pages/start.html';
import toysPage from './pages/toys.html';
import treePage from './pages/tree.html';
import { Router } from './ts/router';
import { toysPageController, treePageController } from '@controllers';

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
