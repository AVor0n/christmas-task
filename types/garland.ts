/** Цвет гирлянды */
export type GarlandColor = 'multicolor' | 'red' | 'blue' | 'green' | 'yellow' | '';

/** Свойства гирлянды */
export interface GarlandProps {
  /** Количество линий гирлянды */
  readonly countLines: number;
  /** Кривизна: (0, 1]; 0 - прямая, 1 - окружность */
  readonly curvature: number;
  /** Расстояние между лампочками */
  readonly gap: number;
  /** Цвет гирлянды */
  color: GarlandColor;
}
