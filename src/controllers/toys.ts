import noUiSlider from 'nouislider';
import { message } from '../core/message';
import { data } from '../data';
import { SmoothShuffle } from '../features/smoothShuffle';
import { $, $$, LS } from '@utils';
import type { IToyInfo, BoxOfToys } from '../../types/toy';
import type { API } from 'nouislider';
import type { ToyColor, ToyShape, ToySize } from 'types/unions';

interface Range {
  from: number;
  to: number;
}

interface Filter {
  name: string;
  count: Range;
  year: Range;
  shape: ToyShape[];
  color: ToyColor[];
  size: ToySize[];
  favorite: boolean;
}

interface Sort {
  prop: 'name' | 'year' | 'count';
  direction: 'up' | 'down';
}
interface Instance extends HTMLElement {
  noUiSlider: API;
}

export function toysPageController() {
  const sortSelect = $<HTMLSelectElement>('#sortBy');
  const shapeBtns = $$<HTMLInputElement>('.filter-shape__option');
  const colorBtns = $$<HTMLInputElement>('.filter-color__option');
  const countSlider = $<Instance>('.filter-count__slider');
  const yearSlider = $<Instance>('.filter-year__slider');
  const sizeBtns = $$<HTMLInputElement>('.filter-size__option');
  const favoriteBtn = $<HTMLInputElement>('.filter-favorite__option');
  const resetFilter = $<HTMLButtonElement>('.reset-filter');
  const resetSettings = $<HTMLButtonElement>('.reset-settings');
  const backToTop = $<HTMLAnchorElement>('.back-to-top');
  const searchInp = $<HTMLInputElement>('.filters__search');
  const favoriteToys = LS.getItem<BoxOfToys>('favoriteToys') ?? [];
  const favoriteToysCounter = $<HTMLDivElement>('.toys__counter');
  favoriteToysCounter.textContent = `${favoriteToys.length}`;

  const UPDATE_DELAY = 500;
  const MAX_FAVORITE_TOYS = 20;
  let maxYear = Number.NEGATIVE_INFINITY;
  let minYear = +Number.POSITIVE_INFINITY;
  let maxCount = Number.NEGATIVE_INFINITY;
  let minCount = +Number.POSITIVE_INFINITY;

  for (const toy of data) {
    if (toy.year > maxYear) {
      maxYear = toy.year;
    }
    if (toy.year < minYear) {
      minYear = toy.year;
    }
    if (toy.count > maxCount) {
      maxCount = toy.count;
    }
    if (toy.count < minCount) {
      minCount = toy.count;
    }
  }

  $('.filter-count__max-label').textContent = `${maxCount}`;
  $('.filter-count__min-label').textContent = `${minCount}`;
  $('.filter-year__max-label').textContent = `${maxYear}`;
  $('.filter-year__min-label').textContent = `${minYear}`;

  noUiSlider.create(countSlider, {
    start: [minCount, maxCount],
    connect: true,
    tooltips: [true, true],
    format: {
      to: (value) => `${Math.floor(value)}`,
      from: (value) => Math.floor(Number(value)),
    },
    range: {
      min: minCount,
      max: maxCount,
    },
    step: 1,
  });

  noUiSlider.create(yearSlider, {
    start: [minYear, maxYear],
    connect: true,
    range: {
      min: minYear,
      max: maxYear,
    },
    tooltips: [true, true],
    format: {
      to: (value) => `${Math.floor(value)}`,
      from: (value) => Math.floor(Number(value)),
    },
    step: 1,
  });

  let timerId: number;

  const defaultFilter: Filter = {
    name: '',
    count: {
      from: minCount,
      to: maxCount,
    },
    year: {
      from: minYear,
      to: maxYear,
    },
    shape: [],
    color: [],
    size: [],
    favorite: false,
  };

  const filter: Filter = LS.getItem('filter') ?? defaultFilter;

  const sort: Sort = LS.getItem('sort') ?? {
    prop: 'name',
    direction: 'up',
  };

  const container = $<HTMLDivElement>('.toys__container');
  let actualToysData: IToyInfo[] = applySort(sort, applyFilter(filter, data));
  const placeholder = document.createElement('p');
  placeholder.classList.add('toys__placeholder', 'glass-effect');
  for (const text of ['Совпадений не найдено.', 'Попробуйте другую комбинацию фильтров']) {
    const $line = document.createElement('p');
    $line.textContent = text;
    placeholder.append($line);
  }
  const ss = new SmoothShuffle<IToyInfo>(container, actualToysData, toyCreator, placeholder);

  restoreFilters();
  searchInp.focus();
  //* * ---------- Обработчики -----------------------------
  // eslint-disable-next-line compat/compat
  const observer = new IntersectionObserver(() => {
    backToTop.style.visibility = window.scrollY > document.documentElement.clientHeight ? 'visible' : 'hidden';
  });
  observer.observe(document.body);

  backToTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

  sortSelect.addEventListener('change', () => {
    const [sortProp, sortDirection] = sortSelect.value.split('-');
    sort.direction = sortDirection as 'up' | 'down';
    sort.prop = sortProp as 'year' | 'count' | 'name';
    updateToysView();
  });

  searchInp.addEventListener('input', () => {
    filter.name = searchInp.value;
    updateToysView();
  });

  countSlider.noUiSlider.on('set', () => {
    const sliderValues = countSlider.noUiSlider.get() as string[];
    filter.count.from = Number(sliderValues[0]);
    filter.count.to = Number(sliderValues[1]);
    updateToysView();
  });

  yearSlider.noUiSlider.on('set', () => {
    const sliderValues = yearSlider.noUiSlider.get() as string[];
    filter.year.from = Number(sliderValues[0]);
    filter.year.to = Number(sliderValues[1]);
    updateToysView();
  });

  for (const shapeBtn of shapeBtns) {
    shapeBtn.addEventListener('click', () => {
      const shapeValue = shapeBtn.getAttribute('value') as ToyShape;

      const i = filter.shape.indexOf(shapeValue);

      if (i === -1) {
        filter.shape.push(shapeValue);
      } else {
        filter.shape.splice(i, 1);
      }

      updateToysView();
    });
  }

  for (const colorBtn of colorBtns) {
    colorBtn.addEventListener('click', () => {
      const colorValue = colorBtn.getAttribute('value') as ToyColor;

      const i = filter.color.indexOf(colorValue);

      if (i === -1) {
        filter.color.push(colorValue);
      } else {
        filter.color.splice(i, 1);
      }

      updateToysView();
    });
  }

  for (const sizeBtn of sizeBtns) {
    sizeBtn.addEventListener('click', () => {
      const sizeValue = sizeBtn.getAttribute('value') as ToySize;

      const i = filter.size.indexOf(sizeValue);

      if (i === -1) {
        filter.size.push(sizeValue);
      } else {
        filter.size.splice(i, 1);
      }

      updateToysView();
    });
  }

  favoriteBtn.addEventListener('click', () => {
    filter.favorite = !filter.favorite;
    updateToysView();
  });

  resetFilter.addEventListener('click', () => {
    filter.name = '';
    filter.count = {
      from: minCount,
      to: maxCount,
    };
    filter.year = {
      from: minYear,
      to: maxYear,
    };
    filter.shape = [];
    filter.color = [];
    filter.size = [];
    filter.favorite = false;
    searchInp.value = '';
    yearSlider.noUiSlider.reset();
    countSlider.noUiSlider.reset();
    for (const colorBtn of colorBtns) {
      colorBtn.checked = false;
    }
    for (const shapeBtn of shapeBtns) {
      shapeBtn.checked = false;
    }
    for (const sizeBtn of sizeBtns) {
      sizeBtn.checked = false;
    }
    favoriteBtn.checked = false;

    updateToysView();
  });

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
    localStorage.setItem('filter', JSON.stringify(filter));
    localStorage.setItem('sort', JSON.stringify(sort));
    actualToysData = applyFilter(filter, data);
    actualToysData = applySort(sort, actualToysData);
    timerId = window.setTimeout(() => ss.update(actualToysData), UPDATE_DELAY);
  }

  function toyCreator(toyData: IToyInfo) {
    const toy = document.createElement('div');
    const toyTitle = document.createElement('span');
    const toyImage = document.createElement('img');

    const toyCountLabel = document.createElement('span');
    const toyYearLabel = document.createElement('span');
    const toyShapeLabel = document.createElement('span');
    const toyColorLabel = document.createElement('span');
    const toySizeLabel = document.createElement('span');
    const toyFavoriteLabel = document.createElement('span');

    const toyCount = document.createElement('span');
    const toyYear = document.createElement('span');
    const toyShape = document.createElement('span');
    const toyColor = document.createElement('span');
    const toySize = document.createElement('span');
    const toyFavorite = document.createElement('span');

    if (favoriteToys.some((favoriteToy) => favoriteToy.id === toyData.id)) {
      toy.classList.add('toy', 'gold-glass-effect');
    } else {
      toy.classList.add('toy', 'glass-effect');
    }

    toy.style.cursor = 'pointer';
    toy.addEventListener('click', () => {
      const i = favoriteToys.findIndex((favoriteToy) => favoriteToy.id === toyData.id);
      if (i === -1) {
        if (favoriteToys.length < MAX_FAVORITE_TOYS) {
          favoriteToys.push({ id: toyData.id, count: toyData.count });
          favoriteToysCounter.textContent = `${Number(favoriteToysCounter.textContent) + 1}`;
        } else {
          const delay = 300;
          message(delay, 'Все слоты заполнены', `Максимальное количество избранных игрушек: ${MAX_FAVORITE_TOYS}`);
          return;
        }
      } else {
        favoriteToys.splice(i, 1);
        favoriteToysCounter.textContent = `${Number(favoriteToysCounter.textContent) - 1}`;
      }
      toy.classList.toggle('glass-effect');
      toy.classList.toggle('gold-glass-effect');
      localStorage.setItem('favoriteToys', JSON.stringify(favoriteToys));
    });
    toyTitle.classList.add('toy__title');
    toyImage.classList.add('toy__image');

    toyCountLabel.classList.add('toy__countlabel');
    toyYearLabel.classList.add('toy__yearlabel');
    toyShapeLabel.classList.add('toy__shapelabel');
    toyColorLabel.classList.add('toy__colorlabel');
    toySizeLabel.classList.add('toy__sizelabel');
    toyFavoriteLabel.classList.add('toy__favoritelabel');

    toyCount.classList.add('toy__count');
    toyYear.classList.add('toy__year');
    toyShape.classList.add('toy__shape');
    toyColor.classList.add('toy__color');
    toySize.classList.add('toy__size');
    toyFavorite.classList.add('toy__favorite');

    toyCountLabel.textContent = 'Количество: ';
    toyYearLabel.textContent = 'Год покупки: ';
    toyShapeLabel.textContent = 'Форма: ';
    toyColorLabel.textContent = 'Цвет : ';
    toySizeLabel.textContent = 'Размер: ';
    toyFavoriteLabel.textContent = 'Любимая: ';

    toy.id = toyData.id;
    toyTitle.textContent = toyData.name;
    toyImage.src = `./assets/toys/${toyData.id}.png`;
    toyImage.height = 150;
    toyCount.textContent = `${toyData.count}`;
    toyYear.textContent = `${toyData.year}`;
    toyShape.textContent = toyData.shape;
    toyColor.textContent = toyData.color;
    toySize.textContent = toyData.size;
    toyFavorite.textContent = toyData.favorite ? 'да' : 'нет';

    toy.append(toyTitle);
    toy.append(toyImage);
    toy.append(toyCountLabel);
    toy.append(toyCount);
    toy.append(toyYearLabel);
    toy.append(toyYear);
    toy.append(toyShapeLabel);
    toy.append(toyShape);
    toy.append(toyColorLabel);
    toy.append(toyColor);
    toy.append(toySizeLabel);
    toy.append(toySize);
    toy.append(toyFavoriteLabel);
    toy.append(toyFavorite);

    return toy;
  }

  function restoreFilters() {
    sortSelect.value = `${sort.prop}-${sort.direction}`;

    searchInp.value = filter.name;

    countSlider.noUiSlider.set([filter.count.from, filter.count.to]);
    yearSlider.noUiSlider.set([filter.year.from, filter.year.to]);

    for (const shapeBtn of shapeBtns) {
      const shape = shapeBtn.getAttribute('value') as ToyShape;
      shapeBtn.checked = !!filter.shape.includes(shape);
    }

    for (const colorBtn of colorBtns) {
      const color = colorBtn.getAttribute('value') as ToyColor;
      colorBtn.checked = !!filter.color.includes(color);
    }

    for (const sizeBtn of sizeBtns) {
      const size = sizeBtn.getAttribute('value') as ToySize;
      sizeBtn.checked = !!filter.size.includes(size);
    }

    favoriteBtn.checked = !!filter.favorite;
  }
}

function applyFilter(filter: Filter, toyData: IToyInfo[]) {
  let filteredData = [...toyData];

  if (filter.name) {
    const regex = new RegExp(filter.name, 'i');
    filteredData = filteredData.filter((toy) => regex.test(toy.name));
  }

  filteredData = filteredData.filter((toy) => filter.count.from <= toy.count && toy.count <= filter.count.to);

  filteredData = filteredData.filter((toy) => filter.year.from <= toy.year && toy.year <= filter.year.to);

  if (filter.color.length > 0) {
    filteredData = filteredData.filter((toy) => filter.color.includes(toy.color));
  }

  if (filter.shape.length > 0) {
    filteredData = filteredData.filter((toy) => filter.shape.includes(toy.shape));
  }

  if (filter.size.length > 0) {
    filteredData = filteredData.filter((toy) => filter.size.includes(toy.size));
  }

  if (filter.favorite) {
    filteredData = filteredData.filter((toy) => toy.favorite);
  }

  return filteredData;
}

function applySort(sort: Sort, toyData: IToyInfo[]) {
  const collator = new Intl.Collator('ru');

  if (sort.direction === 'up') {
    if (sort.prop === 'name') {
      toyData.sort((toy1, toy2) => collator.compare(toy1.name, toy2.name));
    }
    if (sort.prop === 'year') {
      toyData.sort((toy1, toy2) => toy1.year - toy2.year);
    }
    if (sort.prop === 'count') {
      toyData.sort((toy1, toy2) => toy1.count - toy2.count);
    }
  }

  if (sort.direction === 'down') {
    if (sort.prop === 'name') {
      toyData.sort((toy1, toy2) => collator.compare(toy2.name, toy1.name));
    }
    if (sort.prop === 'year') {
      toyData.sort((toy1, toy2) => toy2.year - toy1.year);
    }
    if (sort.prop === 'count') {
      toyData.sort((toy1, toy2) => toy2.count - toy1.count);
    }
  }

  return toyData;
}
