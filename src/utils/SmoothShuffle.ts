interface DataItem {
  id: string;
}

// eslint-disable-next-line no-unused-vars
type ItemCreator = (data: DataItem) => HTMLDivElement;

class SmoothShuffle<T extends DataItem> {
  container: HTMLDivElement;
  columns: number;
  columnWidth: number;
  itemWidth: number;
  itemHeigth: number;
  gapX: number;
  gapY: number;
  items: Array<HTMLDivElement>;
  itemCreator: ItemCreator;

  constructor(container: HTMLDivElement, data: Array<T>, itemCreator: ItemCreator) {
    this.container = container;
    this.itemCreator = itemCreator;

    this.getItemInfo(data[0]);
    this.getGridInfo();

    this.items = this.#initItems(data);
    this.#updateHeigthContainer();

    window.addEventListener('resize', () => {
      this.getItemInfo(data[0]);
      this.getGridInfo();
      for (let i = 0; i < this.items.length; i++) {
        this.#moveItem(this.items[i], i);
      }
      this.#updateHeigthContainer();
    });
  }

  #initItems(data: Array<T>) {
    const items = [];
    for (let i = 0; i < data.length; i++) {
      const item = this.#createItem(data[i], i);
      items.push(item);
    }
    return items;
  }

  #createItem(dataItem: T, idx: number) {
    const item = this.itemCreator(dataItem);
    item.style.position = 'absolute';
    item.style.top = `${this.#getYbyIdx(idx)}px`;
    item.style.left = `${this.#getXbyIdx(idx)}px`;
    item.style.transform = 'scale(0,0)';
    this.container.appendChild(item);
    setTimeout(() => {
      item.style.transform = 'scale(1,1)';
    }, 0);
    return item;
  }

  #moveItem(item: HTMLDivElement, idx: number) {
    // eslint-disable-next-line no-param-reassign
    item.style.top = `${this.#getYbyIdx(idx)}px`;
    // eslint-disable-next-line no-param-reassign
    item.style.left = `${this.#getXbyIdx(idx)}px`;
  }

  static #hideItem(item: HTMLDivElement) {
    // eslint-disable-next-line no-param-reassign
    item.style.transform = 'scale(0,0)';
  }

  update(data: Array<T>) {
    const newIdx = data.map((x) => x.id);
    for (const item of this.items) {
      if (!newIdx.includes(item.id)) SmoothShuffle.#hideItem(item);
    }
    this.items = this.items.filter((item) => newIdx.includes(item.id));
    for (let i = 0; i < newIdx.length; i++) {
      let item = this.items.find((x) => x.id === newIdx[i]);
      if (item) this.#moveItem(item, i);
      else {
        item = this.#createItem(data[i], i);
        this.items.push(item);
      }
    }
    this.#updateHeigthContainer();
  }

  #offsetCenter = () => (this.columnWidth - this.itemWidth) / 2;
  #getXbyIdx = (idx: number) =>
    (idx % this.columns) * (this.gapX + this.columnWidth) + this.#offsetCenter();

  #getYbyIdx = (idx: number) => Math.floor(idx / this.columns) * (this.gapY + this.itemHeigth);

  #updateHeigthContainer = () => {
    this.container.style.height = `${
      Math.ceil(this.items.length / this.columns) * (this.itemHeigth + this.gapY) - this.gapY
    }px`;
  };

  getGridInfo() {
    const columns = window
      .getComputedStyle(this.container)
      .gridTemplateColumns.replace('px', '')
      .split(' ');
    const gaps = window.getComputedStyle(this.container).gap.replace(/px/g, '').split(' ');
    this.columnWidth = +columns[0];
    this.gapX = gaps[1] ? +gaps[1] : +gaps[0] || 0;
    this.gapY = +gaps[0] || 0;
    this.columns = columns.length;
  }

  getItemInfo(dataItem: T) {
    const item = this.itemCreator(dataItem);
    this.container.appendChild(item);
    const itemInfo = window.getComputedStyle(item);
    this.itemHeigth = Number.parseFloat(itemInfo.height);
    this.itemWidth = Number.parseFloat(itemInfo.width);
    item.remove();
  }
}

export default SmoothShuffle;
