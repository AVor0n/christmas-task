import Router from './utils/Router';

import startPage from './pages/start.html';
import toysPage from './pages/toys.html';

import toysController from './controllers/toys';

const router = new Router();

router
  .add('start', () => goToPage(startPage))
  .add('toys', () => goToPage(toysPage, toysController))
  .add('', () => goToPage(startPage));

function goToPage(pageContent: string, pageController?: () => void) {
  document.querySelector('.main').innerHTML = pageContent;
  if (pageController) pageController();
}
