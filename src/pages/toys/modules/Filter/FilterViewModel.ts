import noUiSlider from 'nouislider';
import { FilterModel } from './FilterModel';
import { $, $$ } from '@utils';
import type { Instance } from '../../types';
import type { IToyInfo, ToyColor, ToyShape, ToySize } from 'types';

export class FilterViewModel {
  private model: FilterModel;

  private $searchInp: HTMLInputElement;

  private $shapeBtns: HTMLInputElement[];

  private $colorBtns: HTMLInputElement[];

  private $sizeBtns: HTMLInputElement[];

  private $favoriteBtn: HTMLInputElement;

  private $countSlider: Instance;

  private $yearSlider: Instance;

  private $resetFilter: HTMLButtonElement;

  constructor() {
    this.model = new FilterModel({}, () => this.update());

    this.$searchInp = $<HTMLInputElement>('.filters__search');
    this.$favoriteBtn = $<HTMLInputElement>('.filter-favorite__option');

    this.$shapeBtns = $$<HTMLInputElement>('.filter-shape__option');
    this.$colorBtns = $$<HTMLInputElement>('.filter-color__option');
    this.$sizeBtns = $$<HTMLInputElement>('.filter-size__option');

    this.$countSlider = $<Instance>('.filter-count__slider');
    this.$yearSlider = $<Instance>('.filter-year__slider');

    this.$resetFilter = $<HTMLButtonElement>('.reset-filter');

    $('.filter-count__max-label').textContent = `${this.model.count.max}`;
    $('.filter-count__min-label').textContent = `${this.model.count.min}`;
    $('.filter-year__max-label').textContent = `${this.model.year.max}`;
    $('.filter-year__min-label').textContent = `${this.model.year.min}`;

    noUiSlider.create(this.$countSlider, {
      start: [this.model.count.min, this.model.count.max],
      connect: true,
      tooltips: [true, true],
      format: {
        to: (value) => `${Math.floor(value)}`,
        from: (value) => Math.floor(Number(value)),
      },
      range: {
        min: this.model.count.min,
        max: this.model.count.max,
      },
      step: 1,
    });

    noUiSlider.create(this.$yearSlider, {
      start: [this.model.year.min, this.model.year.max],
      connect: true,
      range: {
        min: this.model.year.min,
        max: this.model.year.max,
      },
      tooltips: [true, true],
      format: {
        to: (value) => `${Math.floor(value)}`,
        from: (value) => Math.floor(Number(value)),
      },
      step: 1,
    });
  }

  init() {
    this.$searchInp.addEventListener('input', () => {
      this.model.update({ ...this.model.filterState, name: this.$searchInp.value });
    });
    this.$searchInp.focus();

    this.$countSlider.noUiSlider.on('set', () => {
      const [from, to] = (this.$countSlider.noUiSlider.get() as string[]).map(Number);
      this.model.update({
        ...this.model.filterState,
        count: {
          ...this.model.count,
          from,
          to,
        },
      });
    });

    this.$yearSlider.noUiSlider.on('set', () => {
      const [from, to] = (this.$yearSlider.noUiSlider.get() as string[]).map(Number);
      this.model.update({
        ...this.model.filterState,
        year: {
          ...this.model.year,
          from,
          to,
        },
      });
    });

    for (const $shapeBtn of this.$shapeBtns) {
      $shapeBtn.addEventListener('click', () => {
        const shapeValue = $shapeBtn.getAttribute('value') as ToyShape;

        const i = this.model.shape.indexOf(shapeValue);

        if (i === -1) {
          this.model.shape.push(shapeValue);
        } else {
          this.model.shape.splice(i, 1);
        }
      });
    }

    for (const $colorBtn of this.$colorBtns) {
      $colorBtn.addEventListener('click', () => {
        const colorValue = $colorBtn.getAttribute('value') as ToyColor;

        const i = this.model.color.indexOf(colorValue);

        if (i === -1) {
          this.model.color.push(colorValue);
        } else {
          this.model.color.splice(i, 1);
        }
      });
    }

    for (const $sizeBtn of this.$sizeBtns) {
      $sizeBtn.addEventListener('click', () => {
        const sizeValue = $sizeBtn.getAttribute('value') as ToySize;

        const i = this.model.size.indexOf(sizeValue);

        if (i === -1) {
          this.model.size.push(sizeValue);
        } else {
          this.model.size.splice(i, 1);
        }
      });
    }

    this.$favoriteBtn.addEventListener('click', () => {
      this.model.update({ ...this.model.filterState, favorite: !this.model.favorite });
    });

    this.$resetFilter.addEventListener('click', () => {
      this.model.reset();
    });
  }

  filter(toyData: IToyInfo[]) {
    return this.model.apply(toyData);
  }

  update() {
    this.$searchInp.value = this.model.name;

    this.$countSlider.noUiSlider.set([this.model.count.from, this.model.count.to]);
    this.$yearSlider.noUiSlider.set([this.model.year.from, this.model.year.to]);

    for (const $shapeBtn of this.$shapeBtns) {
      const shape = $shapeBtn.getAttribute('value') as ToyShape;
      $shapeBtn.checked = !!this.model.shape.includes(shape);
    }

    for (const $colorBtn of this.$colorBtns) {
      const color = $colorBtn.getAttribute('value') as ToyColor;
      $colorBtn.checked = !!this.model.color.includes(color);
    }

    for (const $sizeBtn of this.$sizeBtns) {
      const size = $sizeBtn.getAttribute('value') as ToySize;
      $sizeBtn.checked = !!this.model.size.includes(size);
    }

    this.$favoriteBtn.checked = this.model.favorite;
  }
}
