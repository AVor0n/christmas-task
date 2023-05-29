import { UPDATE_DELAY } from './constants';
import { FilterViewModel, SorterViewModel, SmoothShuffle, toyCreator } from './modules';
import { data } from '../../data';
import { $, $$, LS } from '@utils';
import type { IToyInfo, BoxOfToys } from '../../../types/toy';

export function toysPageController() {
  const filterVM = new FilterViewModel();
  const sortVM = new SorterViewModel();

  const resetFilter = $<HTMLButtonElement>('.reset-filter');
  const resetSettings = $<HTMLButtonElement>('.reset-settings');
  const favoriteToys = LS.getItem<BoxOfToys>('favoriteToys') ?? [];
  const favoriteToysCounter = $<HTMLDivElement>('.toys__counter');
  favoriteToysCounter.textContent = `${favoriteToys.length}`;

  let timerId: number;

  const container = $<HTMLDivElement>('.toys__container');
  let actualToysData: IToyInfo[] = sortVM.apply(filterVM.filter([...data]));
  const placeholder = document.createElement('p');
  placeholder.classList.add('toys__placeholder', 'glass-effect');
  for (const text of ['Совпадений не найдено.', 'Попробуйте другую комбинацию фильтров']) {
    const $line = document.createElement('p');
    $line.textContent = text;
    placeholder.append($line);
  }
  const ss = new SmoothShuffle<IToyInfo>(
    container,
    actualToysData,
    (toyData) => toyCreator(toyData, favoriteToys, favoriteToysCounter),
    placeholder,
  );

  //* * ---------- Обработчики -----------------------------
  resetSettings.addEventListener('click', () => {
    resetFilter.click();
    localStorage.clear();
    favoriteToys.length = 0;
    const toys = $$<HTMLDivElement>('.toy');
    for (const toy of toys) {
      toy.classList.add('glass-effect');
      toy.classList.remove('gold-glass-effect');
    }
    favoriteToysCounter.textContent = '0';
  });

  function updateToysView() {
    clearTimeout(timerId);
    actualToysData = sortVM.apply(filterVM.filter([...data]));
    timerId = window.setTimeout(() => ss.update(actualToysData), UPDATE_DELAY);
  }

  updateToysView();
}
