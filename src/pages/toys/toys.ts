import { FilterViewModel, SmoothShuffle, toyCreator } from './modules';
import { getMinMax } from './utils';
import { data } from '../../data';
import { $, $$, LS } from '@utils';
import type { IToyInfo, BoxOfToys } from '../../../types/toy';

export function toysPageController() {
  const filterVM = new FilterViewModel({
    count: getMinMax(data.map((toy) => toy.count)),
    year: getMinMax(data.map((toy) => toy.year)),
  })
    .init()
    .onChange(() => updateToysView());

  // const sortVM = new SorterViewModel();

  const resetFilter = $<HTMLButtonElement>('.reset-filter');
  const resetSettings = $<HTMLButtonElement>('.reset-settings');
  const favoriteToys = LS.getItem<BoxOfToys>('favoriteToys') ?? [];
  const favoriteToysCounter = $<HTMLDivElement>('.toys__counter');
  favoriteToysCounter.textContent = `${favoriteToys.length}`;

  const container = $<HTMLDivElement>('.toys__container');
  const placeholder = $<HTMLTemplateElement>('#placeholder_template').content.cloneNode(true) as HTMLElement;

  const ss = new SmoothShuffle<IToyInfo>(
    container,
    [],
    (toyData) => toyCreator(toyData, favoriteToys, favoriteToysCounter),
    placeholder,
  );

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
    const actualToysData = filterVM.filter([...data]);
    ss.update(actualToysData);
  }
  updateToysView();
}
