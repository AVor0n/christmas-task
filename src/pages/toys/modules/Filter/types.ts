import type { API } from 'nouislider';
import type { ToyColor, ToyShape, ToySize } from 'types';

export interface Range {
  min: number;
  from: number;
  to: number;
  max: number;
}

export interface Filter {
  name: string;
  count: Range;
  year: Range;
  shape: ToyShape[];
  color: ToyColor[];
  size: ToySize[];
  favorite: boolean;
}

export interface Instance extends HTMLElement {
  noUiSlider: API;
}
