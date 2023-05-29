import type { GarlandColor, GarlandProps } from 'types';

export class Garland {
  /** Контейнер для отрисовки гирлянды */
  readonly container: HTMLElement;

  /** Параметры гирлянды */
  readonly options: GarlandProps;

  /** Цвет гирлянды. Алиас для this.options.color */
  get color() {
    return this.options.color;
  }

  /**
   * Создает гирлянду с заданными параметрами внутри контейнера
   * @param container контейнер, в котором необходимо отрисовать гирлянду
   * @param options параметры гирлянды
   */
  constructor(container: HTMLElement, options: GarlandProps) {
    this.container = container;
    this.options = options;
    this.container.append(...this.createGarland());
  }

  /**
   * Вычисляет отступ сверху для ряда гирлянды по индексу
   * @param idx индекс ряда
   */
  private arcTop(idx: number) {
    return idx * (this.container.clientHeight / (this.options.countLines + 1));
  }

  /**
   * Вычисляет ширину ряда гирлянды по индексу
   * @param idx индекс ряда
   */
  private arcWidth(idx: number) {
    return (this.arcTop(idx) / this.container.clientHeight) * this.container.clientWidth;
  }

  /** Создает массив HTML-элементов, представляющих контейнеры с рядами лампочек гирлянды */
  private createGarland() {
    const arcs = Array.from({ length: this.options.countLines + 1 });
    return arcs.map((_, idx) => this.createArc(this.arcTop(idx), this.arcWidth(idx), this.options.curvature));
  }

  /**
   * Создание ряда лампочек
   * @param top отступ сверху
   * @param width ширина
   * @param curvature кривизна дуги
   */
  private createArc(top: number, width: number, curvature: number) {
    const y = Math.sqrt((width / 2) ** 2 + ((curvature * width) / 2) ** 2); // гипотенуза
    const beta = Math.asin(width / (2 * y)); // угол при основании равнобедренного треугольника
    const radius = y / (2 * Math.cos(beta));

    const arc = document.createElement('ul');
    arc.classList.add('lightrope');
    arc.style.top = `${top + (width * curvature) / 2 - 2 * radius}px`;
    arc.style.left = `${this.container.clientWidth / 2 - radius}px`;
    arc.style.width = `${2 * radius}px`;
    arc.style.height = `${2 * radius}px`;

    const a = (Math.PI - 2 * beta) * (180 / Math.PI); // угол равный половине дуги
    const psi = (this.options.gap / radius) * (180 / Math.PI); // угол между огоньками
    const countTwinkle = a / psi; // для половины дуги

    arc.append(this.createTwinkle(radius, 180));
    for (let i = 1; i <= countTwinkle; i++) {
      arc.append(this.createTwinkle(radius, 180 + psi * i), this.createTwinkle(radius, 180 - psi * i));
    }
    return arc;
  }

  /**
   * Создает лампочку в ряду-дуге
   * @param radius радиус дуги
   * @param angle угол на дуге, позиционирующий лампочку
   */
  private createTwinkle(radius: number, angle: number) {
    const twinkle = document.createElement('li');
    if (this.options.color) {
      twinkle.classList.add(this.options.color);
    }
    twinkle.style.transform = `rotate(${angle - 90}deg) translate(${radius}px)`;
    return twinkle;
  }

  /**
   * Меняет цвет гирлянды
   * @param color цвет
   */
  setColor(color: GarlandColor) {
    for (const arc of this.container.children) {
      for (const twinkle of arc.children) {
        if (this.options.color) {
          twinkle.classList.remove(this.options.color);
        }
        if (color) {
          twinkle.classList.add(color);
        }
      }
    }

    this.options.color = color;
  }

  /** Выключить гирлянду */
  off() {
    this.setColor('');
  }

  /**
   * Включить гирлянду
   * @param color цвет гирлянды. По-умолчанию: разноцветная
   */
  on(color: GarlandColor = 'multicolor') {
    this.setColor(color);
  }
}
