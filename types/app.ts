import type { GarlandColor } from './garland';
import type { BoxOfToys, ToyPosition } from './toy';

export interface IAppState {
  toysOnTree: ToyPosition[];
  treeImageId: number;
  backgroundImageId: number;
  favoriteToys: BoxOfToys;
  snowfallTimerId: number;
  isPlayMusic: boolean;
  garland: GarlandColor;
}
