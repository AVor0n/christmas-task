import SmoothShuffle from '../utils/SmoothShuffle';
import toysData from '../data';

function toysPageController() {
  const container: HTMLDivElement = document.querySelector('.toys__container');
  const ss: SmoothShuffle<toyInfo> = new SmoothShuffle(container, toysData, toyCreator);
}

function toyCreator(toyData: toyInfo) {
  const toy = document.createElement('div');
  const toyTitle = document.createElement('p');
  const toyImage = document.createElement('img');

  const toyCountLabel = document.createElement('p');
  const toyYearLabel = document.createElement('p');
  const toyShapeLabel = document.createElement('p');
  const toyColorLabel = document.createElement('p');
  const toySizeLabel = document.createElement('p');
  const toyFavoriteLabel = document.createElement('p');

  const toyCount = document.createElement('p');
  const toyYear = document.createElement('p');
  const toyShape = document.createElement('p');
  const toyColor = document.createElement('p');
  const toySize = document.createElement('p');
  const toyFavorite = document.createElement('p');

  toy.className = 'toy glass-effect';
  toyTitle.className = 'toy__title';
  toyImage.className = 'toy__image';

  toyCountLabel.className = 'toy__countlabel';
  toyYearLabel.className = 'toy__yearlabel';
  toyShapeLabel.className = 'toy__shapelabel';
  toyColorLabel.className = 'toy__colorlabel';
  toySizeLabel.className = 'toy__sizelabel';
  toyFavoriteLabel.className = 'toy__favoritelabel';

  toyCount.className = 'toy__count';
  toyYear.className = 'toy__year';
  toyShape.className = 'toy__shape';
  toyColor.className = 'toy__color';
  toySize.className = 'toy__size';
  toyFavorite.className = 'toy__favorite';

  toyCountLabel.textContent = 'Количество: ';
  toyYearLabel.textContent = 'Год покупки: ';
  toyShapeLabel.textContent = 'Форма: ';
  toyColorLabel.textContent = 'Цвет : ';
  toySizeLabel.textContent = 'Размер: ';
  toyFavoriteLabel.textContent = 'Любимая: ';

  toy.id = toyData.id;
  toyTitle.textContent = toyData.name;
  toyImage.src = `./assets/toys/${toyData.id}.png`;
  toyImage.height = 150;
  toyCount.textContent = `${toyData.count}`;
  toyYear.textContent = `${toyData.year}`;
  toyShape.textContent = toyData.shape;
  toyColor.textContent = toyData.color;
  toySize.textContent = toyData.size;
  toyFavorite.textContent = toyData.favorite ? 'да' : 'нет';

  toy.appendChild(toyTitle);
  toy.appendChild(toyImage);
  toy.appendChild(toyCountLabel);
  toy.appendChild(toyCount);
  toy.appendChild(toyYearLabel);
  toy.appendChild(toyYear);
  toy.appendChild(toyShapeLabel);
  toy.appendChild(toyShape);
  toy.appendChild(toyColorLabel);
  toy.appendChild(toyColor);
  toy.appendChild(toySizeLabel);
  toy.appendChild(toySize);
  toy.appendChild(toyFavoriteLabel);
  toy.appendChild(toyFavorite);

  return toy;
}

export default toysPageController;
