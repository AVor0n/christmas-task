import { SorterModel } from './SorterModel';
import { $ } from '@utils';
import type { Sort } from '../../types';
import type { IToyInfo } from 'types';

export class SorterViewModel {
  private model: SorterModel;

  private $sortSelect: HTMLSelectElement;

  private $resetFilter: HTMLButtonElement;

  constructor() {
    this.model = new SorterModel({}, () => this.update());

    this.$sortSelect = $<HTMLSelectElement>('#sortBy');

    this.$resetFilter = $<HTMLButtonElement>('.reset-filter');
  }

  init() {
    this.$sortSelect.addEventListener('change', () => {
      const [prop, direction] = this.$sortSelect.value.split('-') as [Sort['prop'], Sort['direction']];
      this.model.update({ prop, direction });
    });

    this.$resetFilter.addEventListener('click', () => {
      this.model.reset();
    });
  }

  apply(toyData: IToyInfo[]) {
    return this.model.apply(toyData);
  }

  update() {
    this.$sortSelect.value = this.model.toString();
  }
}
