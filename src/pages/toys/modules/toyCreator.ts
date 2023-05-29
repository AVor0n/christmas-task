/* eslint-disable no-param-reassign */
import { MAX_FAVORITE_TOYS } from '../constants';
import { message } from '@src/modules/message';
import type { BoxOfToys, IToyInfo } from 'types';

export function toyCreator(toyData: IToyInfo, favoriteToys: BoxOfToys, favoriteToysCounter: HTMLDivElement) {
  const toy = document.createElement('div');
  const toyTitle = document.createElement('span');
  const toyImage = document.createElement('img');

  const toyCountLabel = document.createElement('span');
  const toyYearLabel = document.createElement('span');
  const toyShapeLabel = document.createElement('span');
  const toyColorLabel = document.createElement('span');
  const toySizeLabel = document.createElement('span');
  const toyFavoriteLabel = document.createElement('span');

  const toyCount = document.createElement('span');
  const toyYear = document.createElement('span');
  const toyShape = document.createElement('span');
  const toyColor = document.createElement('span');
  const toySize = document.createElement('span');
  const toyFavorite = document.createElement('span');

  if (favoriteToys.some((favoriteToy) => favoriteToy.id === toyData.id)) {
    toy.classList.add('toy', 'gold-glass-effect');
  } else {
    toy.classList.add('toy', 'glass-effect');
  }

  toy.style.cursor = 'pointer';
  toy.addEventListener('click', () => {
    const i = favoriteToys.findIndex((favoriteToy) => favoriteToy.id === toyData.id);
    if (i === -1) {
      if (favoriteToys.length < MAX_FAVORITE_TOYS) {
        favoriteToys.push({ id: toyData.id, count: toyData.count });
        favoriteToysCounter.textContent = `${Number(favoriteToysCounter.textContent) + 1}`;
      } else {
        const delay = 300;
        message(delay, 'Все слоты заполнены', `Максимальное количество избранных игрушек: ${MAX_FAVORITE_TOYS}`);
        return;
      }
    } else {
      favoriteToys.splice(i, 1);
      favoriteToysCounter.textContent = `${Number(favoriteToysCounter.textContent) - 1}`;
    }
    toy.classList.toggle('glass-effect');
    toy.classList.toggle('gold-glass-effect');
    localStorage.setItem('favoriteToys', JSON.stringify(favoriteToys));
  });
  toyTitle.classList.add('toy__title');
  toyImage.classList.add('toy__image');

  toyCountLabel.classList.add('toy__countlabel');
  toyYearLabel.classList.add('toy__yearlabel');
  toyShapeLabel.classList.add('toy__shapelabel');
  toyColorLabel.classList.add('toy__colorlabel');
  toySizeLabel.classList.add('toy__sizelabel');
  toyFavoriteLabel.classList.add('toy__favoritelabel');

  toyCount.classList.add('toy__count');
  toyYear.classList.add('toy__year');
  toyShape.classList.add('toy__shape');
  toyColor.classList.add('toy__color');
  toySize.classList.add('toy__size');
  toyFavorite.classList.add('toy__favorite');

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

  toy.append(toyTitle);
  toy.append(toyImage);
  toy.append(toyCountLabel);
  toy.append(toyCount);
  toy.append(toyYearLabel);
  toy.append(toyYear);
  toy.append(toyShapeLabel);
  toy.append(toyShape);
  toy.append(toyColorLabel);
  toy.append(toyColor);
  toy.append(toySizeLabel);
  toy.append(toySize);
  toy.append(toyFavoriteLabel);
  toy.append(toyFavorite);

  return toy;
}
