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
    toyImage.dataset.id = String(favoriteToys[i]);
    toyContainers[i].append(toyImage);

    const toyCountLabel = document.createElement('div');
    toyCountLabel.textContent = `${toysData.find((x) => x.id === favoriteToys[i]).count}`;
    toyCountLabel.classList.add('toy-item__label');
    toyContainers[i].append(toyCountLabel);
  }
}
