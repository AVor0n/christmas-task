import { LS } from '@utils';
import type { Sort } from './types';
import type { IToyInfo } from 'types';

export class SorterModel {
  private defaultState: Sort;

  private state: Sort;

  private onChange: () => void;

  get sortState() {
    return this.state;
  }

  constructor(initState: Partial<Sort>, onChange = () => {}) {
    this.defaultState = {
      prop: initState.prop ?? 'name',
      direction: initState.direction ?? 'down',
    };

    this.state = LS.getItem<Sort>('sort') ?? this.defaultState;

    this.onChange = onChange;
  }

  apply(toyData: IToyInfo[]) {
    const { direction, prop } = this.state;
    const dir = direction === 'down' ? -1 : 1;

    if (prop === 'name') {
      const collator = new Intl.Collator('ru');
      return toyData.sort((toy1, toy2) => collator.compare(toy1.name, toy2.name) * dir);
    }

    return toyData.sort((toy1, toy2) => (toy1[prop] - toy2[prop]) * dir);
  }

  update(state: Sort) {
    this.state = state;
    LS.setItem('sort', this.state);
    this.onChange();
  }

  reset() {
    this.update(this.defaultState);
  }

  toString() {
    return `${this.state.prop}-${this.state.direction}`;
  }
}
