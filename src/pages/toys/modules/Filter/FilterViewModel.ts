import noUiSlider from 'nouislider';
import { FilterModel } from './FilterModel';
import { $, $$ } from '@utils';
import type { Filter, Instance, Range } from './types';
import type { DeepPartial, IToyInfo, KeysOfType, ToyColor, ToyShape, ToySize } from 'types';

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

  constructor(initState: DeepPartial<Filter> = {}) {
    this.model = new FilterModel(initState);

    this.$searchInp = $<HTMLInputElement>('.filters__search');
    this.$favoriteBtn = $<HTMLInputElement>('.filter-favorite__option');

    this.$shapeBtns = $$<HTMLInputElement>('.filter-shape__option');
    this.$colorBtns = $$<HTMLInputElement>('.filter-color__option');
    this.$sizeBtns = $$<HTMLInputElement>('.filter-size__option');

    this.$countSlider = $<Instance>('.filter-count__slider');
    this.createRangeInput(this.$countSlider, 'count');
    $('.filter-count__max-label').textContent = `${this.model.count.max}`;
    $('.filter-count__min-label').textContent = `${this.model.count.min}`;

    this.$yearSlider = $<Instance>('.filter-year__slider');
    this.createRangeInput(this.$yearSlider, 'year');
    $('.filter-year__max-label').textContent = `${this.model.year.max}`;
    $('.filter-year__min-label').textContent = `${this.model.year.min}`;

    this.$resetFilter = $<HTMLButtonElement>('.reset-filter');
  }

  private createRangeInput(input: Instance, field: KeysOfType<Filter, Range>) {
    noUiSlider.create(input, {
      start: [this.model[field].min, this.model[field].max],
      connect: true,
      range: {
        min: this.model[field].min,
        max: this.model[field].max,
      },
      tooltips: [true, true],
      format: {
        to: (value) => `${Math.floor(value)}`,
        from: (value) => Math.floor(Number(value)),
      },
      step: 1,
    });
  }

  private initRangeInput(input: Instance, field: KeysOfType<Filter, Range>) {
    input.noUiSlider.on('set', () => {
      const [from, to] = (input.noUiSlider.get() as string[]).map(Number);
      this.model.update({
        ...this.model.filterState,
        [field]: {
          ...this.model[field],
          from,
          to,
        },
      });
    });
  }

  private initCheckboxBtns($btns: HTMLInputElement[], field: KeysOfType<Filter, unknown[]>) {
    for (const $btn of $btns) {
      $btn.addEventListener('click', () => {
        const { value } = $btn.dataset;
        if (!value) return;

        const state = this.model.filterState[field] as string[];
        const i = state.indexOf(value);
        if (i === -1) {
          state.push(value);
        } else {
          state.splice(i, 1);
        }

        this.model.update(this.model.filterState);
      });
    }
  }

  init() {
    this.$searchInp.addEventListener('input', () => {
      this.model.update({ ...this.model.filterState, name: this.$searchInp.value });
    });
    this.$searchInp.focus();

    this.initRangeInput(this.$yearSlider, 'year');
    this.initRangeInput(this.$countSlider, 'count');

    this.initCheckboxBtns(this.$shapeBtns, 'shape');
    this.initCheckboxBtns(this.$colorBtns, 'color');
    this.initCheckboxBtns(this.$sizeBtns, 'size');

    this.$favoriteBtn.addEventListener('click', () => {
      this.model.update({ ...this.model.filterState, favorite: !this.model.favorite });
    });

    this.$resetFilter.addEventListener('click', () => {
      this.model.reset();
      this.updateUI();
    });

    return this;
  }

  onChange(cb: (newState: Filter) => void) {
    this.model.onChange(cb);
    return this;
  }

  filter(toyData: IToyInfo[]) {
    return this.model.apply(toyData);
  }

  updateUI() {
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

    return this;
  }
}
