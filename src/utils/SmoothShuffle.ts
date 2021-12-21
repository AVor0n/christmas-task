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
  placeHolder: HTMLElement;

  constructor(
    container: HTMLDivElement,
    data: Array<T>,
    itemCreator: ItemCreator,
    placeHolder: HTMLElement,
  ) {
    this.container = container;
    this.itemCreator = itemCreator;
    this.placeHolder = placeHolder;

    if (data[0]) this.getItemInfo(data[0]);
    this.getGridInfo();

    this.items = [];
    this.update(data);

    window.addEventListener('resize', () => {
      this.getItemInfo(data[0]);
      this.getGridInfo();
      for (let i = 0; i < this.items.length; i++) {
        this.moveItem(this.items[i], i);
      }
      this.updateHeigthContainer();
    });
  }

  private createItem(dataItem: T, idx: number) {
    const item = this.itemCreator(dataItem);
    item.style.position = 'absolute';
    item.style.top = `${this.getYbyIdx(idx)}px`;
    item.style.left = `${this.getXbyIdx(idx)}px`;
    item.style.transform = 'scale(0,0)';
    this.container.appendChild(item);
    setTimeout(() => {
      item.style.transform = 'scale(1,1)';
    }, 0);
    return item;
  }

  private moveItem(item: HTMLDivElement, idx: number) {
    // eslint-disable-next-line no-param-reassign
    item.style.top = `${this.getYbyIdx(idx)}px`;
    // eslint-disable-next-line no-param-reassign
    item.style.left = `${this.getXbyIdx(idx)}px`;
  }

  static hideItem(item: HTMLDivElement) {
    // eslint-disable-next-line no-param-reassign
    item.style.transform = 'scale(0,0)';
  }

  update(data: Array<T>) {
    const newIdx = data.map((x) => x.id);

    this.items = this.items.filter((item) => {
      if (!newIdx.includes(item.id)) {
        SmoothShuffle.hideItem(item);
        setTimeout(() => item.remove(), 600);
        return false;
      }
      return true;
    });

    if (data.length === 0) {
      if (this.placeHolder.parentElement) return [];
      this.container.appendChild(this.placeHolder);
      this.container.style.height = '80vh';
      return [];
    }

    if (!this.itemWidth) this.getItemInfo(data[0]);

    if (this.placeHolder.parentElement) {
      this.container.removeChild(this.placeHolder);
    }

    this.items = this.items.filter((item) => newIdx.includes(item.id));
    for (let i = 0; i < newIdx.length; i++) {
      let item = this.items.find((x) => x.id === newIdx[i]);
      if (item) this.moveItem(item, i);
      else {
        item = this.createItem(data[i], i);
        this.items.push(item);
      }
    }
    this.updateHeigthContainer();
    return this.items;
  }

  private offsetCenter = () => (this.columnWidth - this.itemWidth) / 2;
  private getXbyIdx = (idx: number) =>
    (idx % this.columns) * (this.gapX + this.columnWidth) + this.offsetCenter();

  private getYbyIdx = (idx: number) =>
    Math.floor(idx / this.columns) * (this.gapY + this.itemHeigth);

  private updateHeigthContainer = () => {
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
