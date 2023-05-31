interface DataItem {
  id: string;
}

type ItemCreator<T extends DataItem> = (data: T) => HTMLDivElement;
export class SmoothShuffle<T extends DataItem> {
  readonly REMOVE_ITEM_DELAY = 600;

  container: HTMLDivElement;

  columns = 0;

  columnWidth = 0;

  itemWidth = 0;

  itemHeight = 0;

  gapX = 0;

  gapY = 0;

  items: HTMLDivElement[];

  itemCreator: ItemCreator<T>;

  placeHolder: HTMLElement;

  constructor(container: HTMLDivElement, data: T[], itemCreator: ItemCreator<T>, placeHolder: HTMLElement) {
    this.container = container;
    this.itemCreator = itemCreator;
    this.placeHolder = placeHolder;

    if (data[0]) {
      this.getItemInfo(data[0]);
    }
    this.getGridInfo();

    this.items = [];
    this.update(data);

    const observer = new ResizeObserver(() => {
      this.getItemInfo(data[0]);
      this.getGridInfo();
      for (let i = 0; i < this.items.length; i++) {
        this.moveItem(this.items[i], i);
      }
      this.updateHeightContainer();
    });
    observer.observe(document.body);
  }

  private createItem(dataItem: T, idx: number) {
    const item = this.itemCreator(dataItem);
    item.style.position = 'absolute';
    item.style.top = `${this.getYbyIdx(idx)}px`;
    item.style.left = `${this.getXbyIdx(idx)}px`;
    item.style.transform = 'scale(0,0)';
    this.container.append(item);
    setTimeout(() => {
      item.style.transform = 'scale(1,1)';
    }, 0);
    return item;
  }

  private moveItem(item: HTMLDivElement, idx: number) {
    item.style.top = `${this.getYbyIdx(idx)}px`;
    item.style.left = `${this.getXbyIdx(idx)}px`;
  }

  static hideItem(item: HTMLDivElement) {
    item.style.transform = 'scale(0,0)';
  }

  update(data: T[]) {
    const newIdx = data.map((x) => x.id);

    this.items = this.items.filter((item) => {
      if (!newIdx.includes(item.id)) {
        SmoothShuffle.hideItem(item);
        setTimeout(() => item.remove(), this.REMOVE_ITEM_DELAY);
        return false;
      }
      return true;
    });

    if (data.length === 0) {
      if (this.placeHolder.parentElement) return [];
      this.container.append(this.placeHolder);
      this.container.style.height = '80vh';
      return [];
    }

    if (!this.itemWidth) this.getItemInfo(data[0]);

    if (this.placeHolder.parentElement) {
      this.placeHolder.remove();
    }

    this.items = this.items.filter((item) => newIdx.includes(item.id));
    for (const [i, element] of newIdx.entries()) {
      let item = this.items.find((x) => x.id === element);
      if (item) this.moveItem(item, i);
      else {
        item = this.createItem(data[i], i);
        this.items.push(item);
      }
    }
    this.updateHeightContainer();
    return this.items;
  }

  private readonly offsetCenter = () => (this.columnWidth - this.itemWidth) / 2;

  private readonly getXbyIdx = (idx: number) => {
    const columnIdx = idx % this.columns;
    return columnIdx * (this.gapX + this.columnWidth) + this.offsetCenter();
  };

  private readonly getYbyIdx = (idx: number) => Math.floor(idx / this.columns) * (this.gapY + this.itemHeight);

  private readonly updateHeightContainer = () => {
    this.container.style.height = `${
      Math.ceil(this.items.length / this.columns) * (this.itemHeight + this.gapY) - this.gapY
    }px`;
  };

  getGridInfo() {
    const columns = window.getComputedStyle(this.container).gridTemplateColumns.replace('px', '').split(' ');
    const gaps = window.getComputedStyle(this.container).gap.replace(/px/gu, '').split(' ');
    this.columnWidth = Number(columns[0]);
    this.gapX = gaps[1] ? Number(gaps[1]) : Number(gaps[0]) || 0;
    this.gapY = Number(gaps[0]) || 0;
    this.columns = columns.length;
  }

  getItemInfo(dataItem: T) {
    const item = this.itemCreator(dataItem);
    this.container.append(item);
    const itemInfo = window.getComputedStyle(item);
    this.itemHeight = Number.parseFloat(itemInfo.height);
    this.itemWidth = Number.parseFloat(itemInfo.width);
    item.remove();
  }
}
