export default class Garland {
  readonly container: HTMLElement;
  readonly countLines: number;
  readonly curvature: number; // 0 < curvature <= 1; 0 - прямая, 1 - окружность
  readonly gap: number;
  color: GarlandColor;

  constructor(countLines: number, curvature: number, gap: number, color?: GarlandColor) {
    this.container = Garland.initContainer();
    this.countLines = countLines > 0 ? countLines : 1;
    this.curvature = curvature > 0 ? curvature : 0.01;
    this.gap = gap;
    this.color = color || '';
    this.createGarland();
  }

  private static initContainer() {
    const container: HTMLElement = document.querySelector('.garland-container');
    const treeImage: HTMLImageElement = document.querySelector('.tree__image');
    const treePosition = treeImage.getBoundingClientRect();
    const contPosition = container.getBoundingClientRect();

    container.style.width = `${treePosition.width}px`;
    container.style.height = `${treePosition.height}px`;
    container.style.top = `${treePosition.y - contPosition.y}px`;
    container.style.left = `${treePosition.x - contPosition.x}px`;

    return container;
  }

  private createGarland() {
    const arcTop = (n: number) => n * (this.container.clientHeight / (this.countLines + 1));
    const arcWidth = (n: number) =>
      (arcTop(n) / this.container.clientHeight) * this.container.clientWidth;

    for (let num = 1; num <= this.countLines; num++) {
      this.createArc(arcTop(num), arcWidth(num), this.curvature);
    }
  }

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
    this.container.append(arc);

    const a = (Math.PI - 2 * beta) * (180 / Math.PI); // угол равный половине дуги
    const psi = (this.gap / radius) * (180 / Math.PI); // угол между огоньками
    const countTwinkle = a / psi; // для половины дуги

    this.createTwinkle(arc, radius, 180);

    for (let i = 1; i <= countTwinkle; i++) {
      this.createTwinkle(arc, radius, 180 + psi * i);
      this.createTwinkle(arc, radius, 180 - psi * i);
    }
  }

  private createTwinkle(arc: HTMLUListElement, radius: number, angle: number) {
    const twinkle = document.createElement('li');
    if (this.color) twinkle.classList.add(this.color);
    twinkle.style.transform = `rotate(${angle - 90}deg) translate(${radius}px)`;
    arc.append(twinkle);
  }

  setColor(color: GarlandColor) {
    const garland: HTMLElement = document.querySelector('.garland-container');
    const arcs = garland.children;

    for (const arc of arcs) {
      const twinkles = arc.children;

      for (const twinkle of twinkles) {
        if (this.color) twinkle.classList.remove(this.color);
        if (color) twinkle.classList.add(color);
      }
    }

    this.color = color;
  }

  off() {
    this.setColor('');
  }

  on(color: GarlandColor = 'multicolor') {
    this.setColor(color);
  }
}
