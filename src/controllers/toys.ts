/* eslint-disable no-loop-func */
import noUiSlider, { API } from 'nouislider';
import SmoothShuffle from '../utils/SmoothShuffle';
import toysData from '../data';

type Range = {
  from: number;
  to: number;
};

type Filter = {
  name: string;
  count: Range;
  year: Range;
  shape: Array<toyShape>;
  color: Array<toyColor>;
  size: Array<toySize>;
  favorite: boolean;
};

type Sort = {
  prop: 'name' | 'year' | 'count';
  direction: 'up' | 'down';
};
interface Instanse extends HTMLElement {
  noUiSlider: API;
}

function toysPageController() {
  const sortSelect = document.getElementById('sortBy') as HTMLSelectElement;
  const shapeBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.filter-form__option');
  const colorBtns: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.filter-color__option');
  const countSlider: Instanse = document.querySelector('.filter-count__slider');
  const yearSlider: Instanse = document.querySelector('.filter-year__slider');
  const sizeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.filter-size__option');
  const favoriteBtn: HTMLButtonElement = document.querySelector('.filter-favorite__option');
  const resetFilter: HTMLButtonElement = document.querySelector('.reset-filter');
  const resetSettings: HTMLButtonElement = document.querySelector('.reset-settings');
  const searchInp: HTMLInputElement = document.querySelector('.filters__search');

  let maxYear = -Infinity;
  let minYear = +Infinity;
  let maxCount = -Infinity;
  let minCount = +Infinity;

  for (const toy of toysData) {
    if (toy.year > maxYear) maxYear = toy.year;
    if (toy.year < minYear) minYear = toy.year;
    if (toy.count > maxCount) maxCount = toy.count;
    if (toy.count < minCount) minCount = toy.count;
  }

  document.querySelector('.filter-count__max-label').textContent = `${maxCount}`;
  document.querySelector('.filter-count__min-label').textContent = `${minCount}`;
  document.querySelector('.filter-year__max-label').textContent = `${maxYear}`;
  document.querySelector('.filter-year__min-label').textContent = `${minYear}`;

  noUiSlider.create(countSlider, {
    start: [minCount, maxCount],
    connect: true,
    tooltips: [true, true],
    format: {
      to: (value) => `${Math.floor(value)}`,
      from: (value) => Math.floor(+value),
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
      from: (value) => Math.floor(+value),
    },
    step: 1,
  });

  let timerId: NodeJS.Timeout;

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

  let filter: Filter = localStorage.getItem('filter')
    ? JSON.parse(localStorage.getItem('filter'))
    : defaultFilter;

  const sort: Sort = JSON.parse(localStorage.getItem('sort')) || {
    prop: 'name',
    direction: 'up',
  };

  const container: HTMLDivElement = document.querySelector('.toys__container');
  let actualToysData: Array<toyInfo> = applySort(sort, applyFilter(filter, toysData));
  const placeholder = document.createElement('p');
  placeholder.className = 'toys__placeholder glass-effect';
  placeholder.innerHTML = 'Совпадений не найденно. <br>Попробуйте другую комбинацию фильтров';
  const ss: SmoothShuffle<toyInfo> = new SmoothShuffle(
    container,
    actualToysData,
    toyCreator,
    placeholder,
  );

  searchInp.focus();
  //* * ---------- Обработчики -----------------------------

  sortSelect.addEventListener('change', () => {
    const [sortProp, sortDirecttion] = sortSelect.value.split('-');
    sort.direction = sortDirecttion as 'up' | 'down';
    sort.prop = sortProp as 'year' | 'count' | 'name';
    updateToysView();
  });

  searchInp.addEventListener('input', () => {
    filter.name = searchInp.value;
    updateToysView();
  });

  countSlider.noUiSlider.on('set', () => {
    const sliderValues = countSlider.noUiSlider.get() as Array<string>;
    filter.count.from = +sliderValues[0];
    filter.count.to = +sliderValues[1];
    updateToysView();
  });

  yearSlider.noUiSlider.on('set', () => {
    const sliderValues = yearSlider.noUiSlider.get() as Array<string>;
    filter.year.from = +sliderValues[0];
    filter.year.to = +sliderValues[1];
    updateToysView();
  });

  for (const shapeBtn of shapeBtns) {
    shapeBtn.addEventListener('click', () => {
      const shapeValue = shapeBtn.dataset.value as toyShape;

      const i = filter.shape.indexOf(shapeValue);

      if (i === -1) filter.shape.push(shapeValue);
      else filter.shape.splice(i, 1);

      updateToysView();
    });
  }

  for (const colorBtn of colorBtns) {
    colorBtn.addEventListener('click', () => {
      const colorValue = colorBtn.dataset.value as toyColor;

      const i = filter.color.indexOf(colorValue);

      if (i === -1) filter.color.push(colorValue);
      else filter.color.splice(i, 1);

      updateToysView();
    });
  }

  for (const sizeBtn of sizeBtns) {
    sizeBtn.addEventListener('click', () => {
      const sizeValue = sizeBtn.dataset.value as toySize;

      const i = filter.size.indexOf(sizeValue);

      if (i === -1) filter.size.push(sizeValue);
      else filter.size.splice(i, 1);

      updateToysView();
    });
  }

  favoriteBtn.addEventListener('click', () => {
    filter.favorite = !filter.favorite;
    updateToysView();
  });

  resetFilter.addEventListener('click', () => {
    filter = defaultFilter;
    yearSlider.noUiSlider.reset();
    countSlider.noUiSlider.reset();
    updateToysView();
  });

  resetSettings.addEventListener('click', () => {
    localStorage.clear();
  });

  function updateToysView() {
    clearTimeout(timerId);
    localStorage.setItem('filter', JSON.stringify(filter));
    localStorage.setItem('sort', JSON.stringify(sort));
    actualToysData = applyFilter(filter, toysData);
    actualToysData = applySort(sort, actualToysData);
    timerId = setTimeout(() => ss.update(actualToysData), 500);
  }
}

function applyFilter(filter: Filter, toyData: Array<toyInfo>) {
  let data = toyData.slice();

  if (filter.name) {
    const regex = new RegExp(filter.name, 'i');
    data = data.filter((toy) => regex.test(toy.name));
  }

  if (filter.count) {
    data = data.filter((toy) => filter.count.from <= toy.count && toy.count <= filter.count.to);
  }

  if (filter.year) {
    data = data.filter((toy) => filter.year.from <= toy.year && toy.year <= filter.year.to);
  }

  if (filter.color.length) {
    data = data.filter((toy) => filter.color.includes(toy.color));
  }

  if (filter.shape.length) {
    data = data.filter((toy) => filter.shape.includes(toy.shape));
  }

  if (filter.size.length) {
    data = data.filter((toy) => filter.size.includes(toy.size));
  }

  if (filter.favorite) {
    data = data.filter((toy) => toy.favorite);
  }

  return data;
}

function applySort(sort: Sort, toyData: Array<toyInfo>) {
  const collator = new Intl.Collator('ru');

  if (sort.direction === 'up') {
    if (sort.prop === 'name') toyData.sort((toy1, toy2) => collator.compare(toy1.name, toy2.name));
    if (sort.prop === 'year') toyData.sort((toy1, toy2) => toy1.year - toy2.year);
    if (sort.prop === 'count') toyData.sort((toy1, toy2) => toy1.count - toy2.count);
  }

  if (sort.direction === 'down') {
    if (sort.prop === 'name') toyData.sort((toy1, toy2) => collator.compare(toy2.name, toy1.name));
    if (sort.prop === 'year') toyData.sort((toy1, toy2) => toy2.year - toy1.year);
    if (sort.prop === 'count') toyData.sort((toy1, toy2) => toy2.count - toy1.count);
  }

  return toyData;
}

function toyCreator(toyData: toyInfo) {
  const toy = document.createElement('div');
  const toyTitle = document.createElement('p');
  const toyImage = document.createElement('img');

  const toyCountLabel = document.createElement('p');
  const toyYearLabel = document.createElement('p');
  const toyShapeLabel = document.createElement('p');
  const toyColorLabel = document.createElement('p');
  const toySizeLabel = document.createElement('p');
  const toyFavoriteLabel = document.createElement('p');

  const toyCount = document.createElement('p');
  const toyYear = document.createElement('p');
  const toyShape = document.createElement('p');
  const toyColor = document.createElement('p');
  const toySize = document.createElement('p');
  const toyFavorite = document.createElement('p');

  toy.className = 'toy glass-effect';
  toyTitle.className = 'toy__title';
  toyImage.className = 'toy__image';

  toyCountLabel.className = 'toy__countlabel';
  toyYearLabel.className = 'toy__yearlabel';
  toyShapeLabel.className = 'toy__shapelabel';
  toyColorLabel.className = 'toy__colorlabel';
  toySizeLabel.className = 'toy__sizelabel';
  toyFavoriteLabel.className = 'toy__favoritelabel';

  toyCount.className = 'toy__count';
  toyYear.className = 'toy__year';
  toyShape.className = 'toy__shape';
  toyColor.className = 'toy__color';
  toySize.className = 'toy__size';
  toyFavorite.className = 'toy__favorite';

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

  toy.appendChild(toyTitle);
  toy.appendChild(toyImage);
  toy.appendChild(toyCountLabel);
  toy.appendChild(toyCount);
  toy.appendChild(toyYearLabel);
  toy.appendChild(toyYear);
  toy.appendChild(toyShapeLabel);
  toy.appendChild(toyShape);
  toy.appendChild(toyColorLabel);
  toy.appendChild(toyColor);
  toy.appendChild(toySizeLabel);
  toy.appendChild(toySize);
  toy.appendChild(toyFavoriteLabel);
  toy.appendChild(toyFavorite);

  return toy;
}

export default toysPageController;
