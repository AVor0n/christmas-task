/* eslint-disable no-loop-func */
import noUiSlider, { API } from 'nouislider';
import SmoothShuffle from '../utils/SmoothShuffle';
import toysData from '../data';
import message from '../ts/message';

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
  const shapeBtns: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('.filter-shape__option');
  const colorBtns: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('.filter-color__option');
  const countSlider: Instanse = document.querySelector('.filter-count__slider');
  const yearSlider: Instanse = document.querySelector('.filter-year__slider');
  const sizeBtns: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filter-size__option');
  const favoriteBtn: HTMLInputElement = document.querySelector('.filter-favorite__option');
  const resetFilter: HTMLButtonElement = document.querySelector('.reset-filter');
  const resetSettings: HTMLButtonElement = document.querySelector('.reset-settings');
  const backToTop: HTMLAnchorElement = document.querySelector('.back-to-top');
  const searchInp: HTMLInputElement = document.querySelector('.filters__search');
  const favoriteToys: BoxOfToys = JSON.parse(localStorage.getItem('favoriteToys')) || [];
  const favoriteToysCounter: HTMLDivElement = document.querySelector('.toys__counter');
  favoriteToysCounter.textContent = `${favoriteToys.length}`;

  const UPDATE_DELAY = 500;
  const MAX_FAVORITE_TOYS = 20;
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
  placeholder.classList.add('toys__placeholder', 'glass-effect');
  placeholder.innerHTML = 'Совпадений не найденно. <br>Попробуйте другую комбинацию фильтров';
  const ss: SmoothShuffle<toyInfo> = new SmoothShuffle(
    container,
    actualToysData,
    toyCreator,
    placeholder,
  );

  restoreFilters();
  searchInp.focus();
  //* * ---------- Обработчики -----------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > document.documentElement.clientHeight)
      backToTop.style.visibility = 'visible';
    else {
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });

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
    filter.count.from = Number(sliderValues[0]);
    filter.count.to = Number(sliderValues[1]);
    updateToysView();
  });

  yearSlider.noUiSlider.on('set', () => {
    const sliderValues = yearSlider.noUiSlider.get() as Array<string>;
    filter.year.from = Number(sliderValues[0]);
    filter.year.to = Number(sliderValues[1]);
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
    filter = {
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
    searchInp.value = '';
    yearSlider.noUiSlider.reset();
    countSlider.noUiSlider.reset();
    for (const colorBtn of colorBtns) colorBtn.checked = false;
    for (const shapeBtn of shapeBtns) shapeBtn.checked = false;
    for (const sizeBtn of sizeBtns) sizeBtn.checked = false;
    favoriteBtn.checked = false;

    updateToysView();
  });

  resetSettings.addEventListener('click', () => {
    resetFilter.click();
    localStorage.clear();
    favoriteToys.length = 0;
    const toys: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toy');
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
    actualToysData = applyFilter(filter, toysData);
    actualToysData = applySort(sort, actualToysData);
    timerId = window.setTimeout(() => ss.update(actualToysData), UPDATE_DELAY);
  }

  function toyCreator(toyData: toyInfo) {
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

    if (favoriteToys.find((favoriteToy) => favoriteToy.id === toyData.id)) {
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
          message(
            3000,
            'Все слоты заполнены',
            `Максимальное количество избранных игрушек: ${MAX_FAVORITE_TOYS}`,
          );
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

  function restoreFilters() {
    sortSelect.value = `${sort.prop}-${sort.direction}`;

    searchInp.value = filter.name;

    countSlider.noUiSlider.set([filter.count.from, filter.count.to]);
    yearSlider.noUiSlider.set([filter.year.from, filter.year.to]);

    for (const shapeBtn of shapeBtns) {
      const shape = shapeBtn.dataset.value as toyShape;
      if (filter.shape.includes(shape)) shapeBtn.checked = true;
      else shapeBtn.checked = false;
    }

    for (const colorBtn of colorBtns) {
      const color = colorBtn.dataset.value as toyColor;
      if (filter.color.includes(color)) colorBtn.checked = true;
      else colorBtn.checked = false;
    }

    for (const sizeBtn of sizeBtns) {
      const size = sizeBtn.dataset.value as toySize;
      if (filter.size.includes(size)) sizeBtn.checked = true;
      else sizeBtn.checked = false;
    }

    if (filter.favorite) favoriteBtn.checked = true;
    else favoriteBtn.checked = false;
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

export default toysPageController;
