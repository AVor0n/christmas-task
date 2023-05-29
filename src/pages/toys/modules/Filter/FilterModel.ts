import { LS } from '@utils';
import type { Filter, Range } from '../../types';
import type { IToyInfo, ToyColor, ToyShape, ToySize } from 'types';

export class FilterModel {
  private defaultState: Filter;

  private state: Filter;

  private onChange: () => void;

  get name() {
    return this.state.name;
  }

  get count(): Range {
    return this.state.count;
  }

  get year(): Range {
    return this.state.year;
  }

  get shape(): ToyShape[] {
    return this.state.shape;
  }

  get color(): ToyColor[] {
    return this.state.color;
  }

  get size(): ToySize[] {
    return this.state.size;
  }

  get favorite(): boolean {
    return this.state.favorite;
  }

  get filterState() {
    return this.state;
  }

  constructor(initState: Partial<Filter>, onChange = () => {}) {
    this.defaultState = {
      name: initState.name ?? '',
      count: {
        min: initState.count?.min ?? 0,
        from: initState.count?.from ?? initState.count?.min ?? 0,
        to: initState.count?.to ?? 0,
        max: initState.count?.max ?? initState.count?.to ?? 0,
      },
      year: {
        min: initState.year?.min ?? 0,
        from: initState.year?.from ?? initState.year?.min ?? 0,
        to: initState.year?.to ?? 0,
        max: initState.year?.max ?? initState.year?.to ?? 0,
      },
      shape: initState.shape ?? [],
      color: initState.color ?? [],
      size: initState.size ?? [],
      favorite: initState.favorite ?? false,
    };

    this.state = LS.getItem<Filter>('filter') ?? this.defaultState;

    this.onChange = onChange;
  }

  apply(toyData: IToyInfo[]) {
    const regex = this.name && new RegExp(this.name, 'i');
    return toyData.filter((toy) => {
      if (regex && !regex.test(toy.name)) return false;

      if (toy.count < this.count.from || this.count.to < toy.count) return false;
      if (toy.year < this.year.from || this.year.to < toy.year) return false;

      if (this.color.length > 0 && !this.color.includes(toy.color)) return false;
      if (this.shape.length > 0 && !this.shape.includes(toy.shape)) return false;
      if (this.size.length > 0 && !this.size.includes(toy.size)) return false;

      if (this.favorite && !toy.favorite) return false;

      return true;
    });
  }

  update(state: Filter) {
    this.state = state;
    LS.setItem('filter', this.state);
    this.onChange();
  }

  reset() {
    this.update(this.defaultState);
  }
}
