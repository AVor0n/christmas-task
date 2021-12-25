import toysData from '../data';

export default function treePageController() {
  initChangeTreeBackgroundHandlers();
  initChangeTreeHandlers();
  initFavoriteToysCounter();
  initToys();
}

function initChangeTreeBackgroundHandlers() {
  const bgItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.bg-item');
  const treeImgBack: HTMLImageElement = document.querySelector('.tree-back');

  for (const bgItem of bgItems) {
    bgItem.addEventListener('click', () => {
      treeImgBack.style.backgroundImage = `url('../assets/bg/${bgItem.dataset.filename}')`;
    });
  }
}

function initChangeTreeHandlers() {
  const treeItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.tree-item');
  const treeImg: HTMLImageElement = document.querySelector('.tree__image');

  for (const treeItem of treeItems) {
    treeItem.addEventListener('click', () => {
      treeImg.src = `../assets/tree/${treeItem.dataset.filename}`;
    });
  }
}

function initFavoriteToysCounter() {
  const toysCounter = document.querySelector('.toys__counter');
  const favoriteToys: Array<string> = JSON.parse(localStorage.getItem('favoriteToys'));
  toysCounter.textContent = `${favoriteToys.length}`;
}

function initToys() {
  const favoriteToys: Array<string> = JSON.parse(localStorage.getItem('favoriteToys'));
  const toyContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toy-item');

  for (let i = 0; i < favoriteToys.length; i++) {
    const toyImage = document.createElement('img');
    toyImage.src = `../assets/toys/${favoriteToys[i]}.png`;
    toyImage.width = 60;
    toyImage.height = 60;
    toyImage.style.cursor = 'grab';
    toyImage.dataset.id = String(favoriteToys[i]);
    toyImage.ondragstart = () => false;
    toyImage.onmousedown = (e) => dragAndDrop(toyImage, e);
    toyContainers[i].append(toyImage);

    const toyCountLabel = document.createElement('div');
    toyCountLabel.textContent = `${toysData.find((x) => x.id === favoriteToys[i]).count}`;
    toyCountLabel.classList.add('toy-item__label');
    toyContainers[i].append(toyCountLabel);
  }
}

function dragAndDrop(toyEl: HTMLImageElement, event: MouseEvent) {
  //* * ------------ Prepare ------------------ */

  const shiftX = event.x - toyEl.getBoundingClientRect().left;
  const shiftY = event.y - toyEl.getBoundingClientRect().top;
  const toysContainer = document.querySelector('.toys-container');
  let toy = toyEl;

  if (toysContainer.contains(toy)) {
    const toyCountLabel = toy.parentElement.querySelector('.toy-item__label') as HTMLElement;

    if (Number(toyCountLabel.textContent) > 1) {
      toy = toyEl.cloneNode() as HTMLImageElement;
      toy.ondragstart = () => false;
      toy.onmousedown = (e) => dragAndDrop(toy, e);
    }

    changeToyCountLabel(toyCountLabel, 'decrement');
  }

  toy.style.cursor = 'grabbing';
  toy.style.zIndex = '1000';
  toy.style.position = 'absolute';
  document.body.append(toy);
  moveAt(event.x, event.y);

  function moveAt(x: number, y: number) {
    toy.style.left = `${x - shiftX}px`;
    toy.style.top = `${y - shiftY}px`;
  }

  //* * ------------ Drag(move) ------------------ */

  const treeArea = document.querySelector('.tree__area');
  const treeImg: HTMLImageElement = document.querySelector('.tree__image');

  document.addEventListener('mousemove', onMouseMove);

  function onMouseMove(e: MouseEvent) {
    moveAt(e.x, e.y);

    toy.style.display = 'none';
    const elemUnderToy = document.elementFromPoint(e.clientX, e.clientY);
    toy.style.display = '';

    if (elemUnderToy === treeArea) {
      treeImg.style.filter = 'drop-shadow(0 0 7px green)';
    } else {
      treeImg.style.filter = 'drop-shadow(0 0 7px red)';
    }
  }

  //* * ------------ Drop ------------------ */

  toy.onmouseup = (e) => {
    toy.style.display = 'none';
    const elemUnderToy = document.elementFromPoint(e.clientX, e.clientY);
    toy.style.display = '';

    if (elemUnderToy === treeArea) {
      const tree = document.querySelector('.tree');
      const { top, left } = tree.getBoundingClientRect();

      const x = e.x - left - shiftX;
      const y = e.y - top - shiftY;
      attachToyToSpruce(toy, x, y);
    } else {
      moveToyToContainer(toy);
    }

    toy.style.cursor = 'move';
    treeImg.style.filter = '';
    document.removeEventListener('mousemove', onMouseMove);
    toy.onmouseup = null;
  };
}

function attachToyToSpruce(toy: HTMLImageElement, left: number, top: number) {
  const tree = document.querySelector('.tree');
  toy.style.position = 'absolute';
  toy.style.top = `${top}px`;
  toy.style.left = `${left}px`;
  tree.append(toy);
}

function moveToyToContainer(toy: HTMLImageElement) {
  const DURATION = 500;
  const toyContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toy-item');
  const favoriteToys: Array<string> = JSON.parse(localStorage.getItem('favoriteToys'));

  const idxOfContainer = favoriteToys.indexOf(toy.dataset.id);
  const toyContainer = toyContainers[idxOfContainer];
  const toyCountLabel = toyContainer.querySelector('.toy-item__label') as HTMLElement;

  const { top, left, width, height } = toyContainer.getBoundingClientRect();

  toy.style.transitionDuration = `${DURATION}ms`;

  toy.style.top = `${top + (height - toy.height) / 2}px`;
  toy.style.left = `${left + (width - toy.width) / 2}px`;

  setTimeout(() => {
    if (Number(toyCountLabel.textContent) === 0) {
      toyContainer.append(toy);
      toy.style.position = '';
      toy.style.zIndex = '';
    } else {
      toy.remove();
    }
    changeToyCountLabel(toyCountLabel, 'increment');
  }, DURATION);
}

function changeToyCountLabel(label: HTMLElement, type: 'increment' | 'decrement') {
  let value = Number(label.textContent);

  if (type === 'increment') value += 1;
  if (type === 'decrement') value -= 1;

  label.textContent = `${value}`;
  label.style.visibility = value <= 0 ? 'hidden' : '';
}
