import toysController from './controllers/toys';
import treeController from './controllers/tree';
import startPage from './pages/start.html';
import toysPage from './pages/toys.html';
import treePage from './pages/tree.html';
import Router from './utils/Router';

const router = new Router();

router
  .add('start', () => goToPage(startPage))
  .add('toys', () => goToPage(toysPage, toysController))
  .add('christmas-tree', () => goToPage(treePage, treeController))
  .add('', () => goToPage(startPage));

router.go(window.location.hash);

function goToPage(pageContent: string, pageController?: () => void) {
  document.querySelector('.main').innerHTML = pageContent;
  if (pageController) pageController();
}
