import type { ToyColor, ToyShape, ToySize } from './unions';

export interface ToyPosition {
  id: string;
  top: string;
  left: string;
}

export interface IToyInfo {
  id: string;
  name: string;
  count: number;
  year: number;
  shape: ToyShape;
  color: ToyColor;
  size: ToySize;
  favorite: boolean;
}

export type BoxOfToys = {
  id: string;
  count: number;
}[];
