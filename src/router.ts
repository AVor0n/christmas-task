import Router from './utils/Router';

import startPage from './pages/start.html';

const router = new Router();

router.add('', () => goToPage(startPage));

function goToPage(pageContent: string, pageController?: () => void) {
  document.body.innerHTML = pageContent;
  if (pageController) pageController();
}
