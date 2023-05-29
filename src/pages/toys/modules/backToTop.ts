import { $ } from '@utils';

export const initBackToTopBtn = () => {
  const backToTop = $<HTMLAnchorElement>('.back-to-top');

  const observer = new IntersectionObserver(() => {
    backToTop.style.visibility = window.scrollY > document.documentElement.clientHeight ? 'visible' : 'hidden';
  });
  observer.observe(document.body);

  backToTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
};
