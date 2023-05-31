// import { message } from '../core/message';
// import { data } from '../data';
// import { Garland } from '../features/garland';
// import { $, $$, LS } from '@src/utils';
// import type { IAppState, BoxOfToys, ToyPosition, GarlandColor } from 'types';

export function treePageController() {
  // initTree();
  // initTreeBackground();
  // initFavoriteToysCounter();
  // initToys();
  // initSavedTrees();
  // initSnowfall();
  // initMusic();
  // const garlandColor = LS.getItem<GarlandColor>('garland') ?? '';
  // const countLines = 4;
  // const curvature = 0.4;
  // const gap = 20;
  // const garlandContainer = $<HTMLInputElement>('.garland-container');
  // garland = new Garland(garlandContainer, { countLines, curvature, gap, color: garlandColor });
  // const garlandBtns = $$<HTMLInputElement>('.garland-option');
  // for (const garlandBtn of garlandBtns) {
  //   garlandBtn.checked = garlandBtn.getAttribute('value') === garlandColor;
  //   // eslint-disable-next-line @typescript-eslint/no-loop-func
  //   garlandBtn.addEventListener('click', () => {
  //     if (garlandBtn.getAttribute('value') === garland.color) {
  //       garlandBtn.checked = false;
  //       garland.off();
  //       localStorage.setItem('garland', '');
  //     } else {
  //       garland.setColor(garlandBtn.getAttribute('value') as GarlandColor);
  //       localStorage.setItem('garland', garland.color);
  //       for (const btn of garlandBtns) {
  //         btn.checked = btn.getAttribute('value') === garlandBtn.getAttribute('value');
  //       }
  //     }
  //   });
  // }
  // const saveBtn = $<HTMLButtonElement>('.save-tree');
  // saveBtn.addEventListener('click', () => {
  //   const appState = saveStateOfApp();
  //   const container = getContainerForTree();
  //   printTreeToContainer(container);
  //   container.addEventListener('click', () => restoreStateOfApp(appState));
  // });
  // const resetBtn = $<HTMLButtonElement>('.reset-settings');
  // resetBtn.addEventListener('click', () => {
  //   clearInterval(LS.getItem<number>('snowfall') ?? 0);
  //   localStorage.clear();
  //   removeToysFromTree();
  //   clearBoxOfToys();
  //   initToys();
  //   setFavoriteToysCounter(0);
  //   clearSavedTrees();
  //   setTree(1);
  //   setTreeBackground(1);
  //   setMusic('reset');
  //   initSnowfall();
  //   garland.off();
  //   const defaultTreeBtn = $<HTMLInputElement>('.tree-item-default');
  //   const defaultBackBtn = $<HTMLInputElement>('.bg-item-default');
  //   defaultTreeBtn.checked = true;
  //   defaultBackBtn.checked = true;
  //   for (const btn of garlandBtns) {
  //     btn.checked = false;
  //   }
  // });
}

// function initTree() {
//   const treeId = LS.getItem<number>('treeId') ?? 1;
//   setTree(treeId);

//   const treeItems = $$<HTMLDivElement>('.tree-item');

//   for (const treeItem of treeItems) {
//     treeItem.addEventListener('click', () => {
//       setTree(Number(treeItem.getAttribute('id')));
//       const countDeletedToys = removeToysFromTree('soft', (toy) => !isCorrectToyPosition(toy));
//       if (countDeletedToys > 0) {
//         const delay = 5000;
//         message(delay, 'Игрушки, которые не нашли опору,', 'вернулись в коробку.');
//       }
//     });
//   }
// }

// function setTree(id: number | string) {
//   id = Number(id) || 1;
//   const TREE_COORDS: Record<string, string> = {
// eslint-disable-next-line max-len
//     1: '215,3,190,1,189,33,166,34,166,55,153,71,163,84,167,111,140,97,123,112,147,137,132,157,141,168,129,175,95,166,80,189,102,201,96,225,131,240,93,250,96,280,63,278,56,299,87,313,84,348,20,348,9,372,37,381,36,408,63,404,70,421,56,436,5,434,2,467,25,471,19,486,34,507,50,502,50,521,67,529,94,520,82,549,109,561,128,526,147,573,174,572,184,545,191,569,228,569,234,548,244,572,276,566,288,570,309,558,308,540,355,551,370,531,364,517,380,511,389,475,378,464,405,462,401,432,355,426,345,389,371,386,370,353,335,352,333,324,296,326,302,315,351,303,348,278,313,282,310,264,295,256,322,246,325,224,294,212,332,193,319,167,291,182,289,153,278,145,296,123,279,106,249,123,258,100,248,89,218,102,253,61,231,46,236,35,215,26',
// eslint-disable-next-line max-len
//     2: '215,34,203,0,194,29,175,31,179,53,164,51,173,71,152,71,165,92,140,93,153,110,139,115,145,141,133,147,132,157,115,159,118,185,107,188,114,209,96,230,112,235,76,244,81,261,71,265,92,281,89,296,59,304,80,320,70,333,83,343,43,365,61,382,31,391,36,404,19,409,45,425,24,428,40,447,37,460,13,449,14,480,32,493,2,518,28,520,48,509,67,518,59,529,107,539,82,559,108,564,107,578,175,542,209,546,212,563,225,553,255,564,254,546,270,565,284,562,317,569,292,534,323,533,349,548,358,535,390,527,353,502,398,496,382,480,404,473,369,458,367,445,387,448,375,436,393,425,362,417,370,399,352,375,369,364,331,353,324,339,350,334,327,316,331,286,306,274,320,255,302,253,315,224,287,239,297,213,288,207,309,199,292,192,300,176,262,191,284,161,266,159,272,150,259,147,269,136,257,132,266,118,258,112,264,106,250,104,261,81,238,85,248,71,236,66,246,53,224,50,229,35',
// eslint-disable-next-line max-len
//     3: '205,10,192,1,179,11,188,32,163,46,175,63,145,95,161,108,153,119,137,119,142,129,127,140,136,148,123,153,122,177,134,184,115,191,120,207,104,207,114,224,93,251,101,263,88,276,87,296,69,306,80,324,59,327,62,354,50,380,56,388,32,398,51,408,28,434,43,444,17,462,26,475,5,495,22,510,19,529,40,520,37,538,54,531,45,549,100,551,114,538,119,547,108,561,116,566,118,576,140,557,149,563,166,549,186,571,217,544,222,564,237,557,238,572,252,564,258,577,261,562,298,555,298,542,312,548,308,520,327,544,348,549,384,532,391,512,375,493,394,495,397,472,394,460,378,449,389,444,382,421,361,407,378,395,364,380,368,366,349,365,348,341,358,334,335,326,343,309,332,299,341,290,330,274,313,274,308,261,323,254,305,243,311,235,300,222,310,218,299,209,309,198,283,199,291,185,277,179,286,160,264,148,278,126,257,104,263,95,242,90,250,74,233,64,243,46,227,41,226,32,211,36,205,25',
// eslint-disable-next-line max-len
//     4: '203,25,201,1,194,1,194,32,179,24,185,37,166,40,177,57,155,58,166,71,148,88,146,116,121,126,145,129,133,139,137,153,99,169,132,175,116,186,118,207,93,225,99,235,67,256,103,253,106,266,83,266,71,291,69,311,50,332,89,317,84,327,91,337,28,395,71,388,34,440,35,463,1,489,28,482,26,490,18,493,28,503,0,513,27,517,6,538,28,533,50,525,50,540,60,540,73,545,65,579,89,555,89,568,115,537,132,544,140,564,144,540,150,547,161,557,185,545,179,559,201,560,207,577,219,576,214,560,229,565,240,551,264,569,270,564,253,549,261,546,269,554,278,552,292,564,297,539,329,565,335,559,356,570,360,564,343,556,355,550,339,541,343,532,332,518,374,524,354,508,361,503,343,493,357,491,376,504,374,495,397,503,400,497,369,484,369,467,338,450,339,439,326,434,326,425,364,426,342,404,344,397,321,400,326,386,324,376,361,378,353,366,326,356,337,340,341,326,319,313,317,300,288,291,286,280,328,286,304,261,320,257,297,241,285,231,299,214,270,195,298,188,261,171,279,166,257,152,260,145,276,140,253,127,264,119,242,111,250,100,235,87,234,76,231,55,214,58,230,44,209,39,214,26',
// eslint-disable-next-line max-len
//     5: '214,28,200,5,198,20,187,28,180,63,159,85,154,117,139,140,147,153,135,162,121,205,127,215,109,232,106,247,110,255,97,264,93,283,106,303,84,322,80,334,63,339,68,355,97,365,71,378,55,374,50,384,79,403,41,418,35,443,73,445,19,469,37,488,4,497,6,512,57,519,39,533,43,546,67,542,57,562,69,569,102,554,108,572,125,559,140,559,153,540,158,555,169,562,179,547,190,568,207,563,214,551,234,571,242,556,260,572,283,560,292,573,302,564,306,543,351,559,356,546,342,533,343,520,400,516,393,495,360,490,387,476,359,459,368,423,330,407,344,391,313,368,340,348,300,305,316,286,292,270,300,260,273,252,272,239,285,235,281,209,258,197,279,184,253,161,263,149,256,145,243,148,235,140,253,123,230,96,240,85,229,80,224,47,209,45',
// eslint-disable-next-line max-len
//     6: '215,2,202,5,201,53,184,36,188,68,166,58,162,80,168,93,154,91,140,127,126,116,124,127,137,157,130,166,110,156,104,165,135,193,91,206,92,216,110,220,98,231,84,227,79,236,105,255,88,270,74,264,71,287,49,290,52,301,92,305,61,310,73,331,43,346,45,359,67,366,41,377,55,391,18,417,23,425,53,425,15,452,37,479,2,502,54,520,45,536,67,542,85,534,81,546,91,554,101,544,111,554,148,544,132,557,141,569,189,556,205,567,229,563,244,574,254,568,243,555,270,561,330,542,349,521,387,526,388,496,371,493,369,474,403,474,400,461,378,460,386,447,366,443,382,430,360,421,377,408,348,400,370,391,369,369,354,367,324,342,350,339,349,326,325,318,361,309,356,300,334,294,342,282,307,261,333,250,303,236,328,223,301,216,300,205,319,200,283,188,282,177,302,153,277,156,283,125,265,127,269,106,263,86,247,91,249,67,235,63,241,35,233,29,214,55',
//   };

//   const treeBtn = $<HTMLInputElement>(`.tree-item-input[data-id="${id}"]`);
//   const treeImg = $<HTMLImageElement>('.tree__image');
//   const treeArea = $<HTMLAreaElement>('.tree__area');

//   treeImg.src = `./assets/tree/${id}.png`;
//   treeArea.coords = TREE_COORDS[id];
//   treeBtn.checked = true;
//   localStorage.setItem('treeId', String(id));
// }

// function initTreeBackground() {
//   const treeBackId: number = LS.getItem('treeBackId') ?? 1;
//   setTreeBackground(treeBackId);

//   const bgItems: NodeListOf<HTMLDivElement> = document.querySelectorAll('.bg-item');

//   for (const bgItem of bgItems) {
//     bgItem.addEventListener('click', () => setTreeBackground(bgItem.getAttribute('id') ?? 1));
//   }
// }

// function setTreeBackground(id: number | string) {
//   id = Number(id) || 1;
//   const treeBgBtn = $<HTMLInputElement>(`.bg-item-input[data-id="${id}"]`);
//   const treeImgBack = $<HTMLImageElement>('.tree-back');
//   treeImgBack.style.backgroundImage = `url('./assets/bg/${id}.jpg')`;
//   treeBgBtn.checked = true;
//   localStorage.setItem('treeBackId', String(id));
// }

// function initFavoriteToysCounter() {
//   const favoriteToys = LS.getItem<BoxOfToys>('favoriteToys') ?? [];
//   setFavoriteToysCounter(favoriteToys.length);
// }

// function setFavoriteToysCounter(count: number) {
//   const toysCounter = $<HTMLDivElement>('.toys__counter');
//   toysCounter.textContent = String(count);
// }

// function initToys() {
//   const toysOnTree = LS.getItem<ToyPosition[]>('toysOnTree') ?? [];
//   const boxOfToys = LS.getItem<BoxOfToys>('favoriteToys') ?? [];

//   setToys(toysOnTree, boxOfToys);
// }

// function setToys(toysOnTree: ToyPosition[], boxOfToys: BoxOfToys) {
//   const tree = $<HTMLElement>('.tree');
//   const toyContainers = $$<HTMLDivElement>('.toy-item');

//   if (boxOfToys.length === 0) {
//     boxOfToys = data.slice(0, 20).map((toy) => ({ id: toy.id, count: toy.count }));
//   }

//   for (const toyOnTree of toysOnTree) {
//     const toy = createToyImage(toyOnTree.id);
//     attachToyToTree(tree, toy, +toyOnTree.left, +toyOnTree.top);
//     const toyInBox = boxOfToys.find((toyFromBox) => toyFromBox.id === toyOnTree.id);
//     if (toyInBox) {
//       toyInBox.count -= 1;
//     }
//   }

//   boxOfToys = boxOfToys.filter((toyFromBox) => toyFromBox.count > 0);

//   for (const [i, boxOfToy] of boxOfToys.entries()) {
//     const toyImage = createToyImage(boxOfToy.id);
//     toyContainers[i].append(toyImage);

//     const toyCountLabel = $<HTMLElement>('.toy-item__label', toyContainers[i]);
//     toyCountLabel.textContent = `${boxOfToy.count}`;
//     if (boxOfToy.count > 0) {
//       toyCountLabel.style.visibility = 'visible';
//     }
//   }

//   saveToysPosition();
// }

// function createToyImage(id: number | string) {
//   id = String(id);
//   const toyImage = document.createElement('img');
//   toyImage.src = `./assets/toys/${id}.png`;
//   toyImage.width = 60;
//   toyImage.height = 60;
//   toyImage.style.cursor = 'grab';
//   toyImage.classList.add('toy-image');
//   toyImage.setAttribute('id', id);
//   toyImage.addEventListener('dragstart', () => false);
//   toyImage.addEventListener('mousedown', (e) => dragAndDrop(toyImage, e));
//   return toyImage;
// }

// function saveToysPosition() {
//   const tree = $('.tree');
//   const toysOnTreeEl = [...$$<HTMLImageElement>('.toy-image', tree)];
//   const toysOnTreeData: ToyPosition[] = [];
//   const treeWidth = tree.clientWidth;
//   const treeHeight = tree.clientHeight;

//   for (const toyEl of toysOnTreeEl) {
//     const toyLeft = Number(toyEl.style.left.replace('px', ''));
//     const toyTop = Number(toyEl.style.top.replace('px', ''));

//     const id = toyEl.getAttribute('id');
//     if (id) {
//       const toyData = {
//         id,
//         left: String(toyLeft / treeWidth),
//         top: String(toyTop / treeHeight),
//       };
//       toysOnTreeData.push(toyData);
//     }
//   }

//   const toysInBoxEl = $$<HTMLDivElement>('.toy-item');
//   const toysInBoxData: BoxOfToys = [];

//   for (const toyEl of toysInBoxEl) {
//     const toyImage = $('img', toyEl);
//     const toyCountLabel = $('.toy-item__label', toyEl);
//     const id = toyImage.getAttribute('id');
//     if (id) {
//       const toy = {
//         id,
//         count: Number(toyCountLabel.textContent),
//       };
//       toysInBoxData.push(toy);
//     }
//   }

//   localStorage.setItem('toysOnTree', JSON.stringify(toysOnTreeData));
//   localStorage.setItem('boxOfToys', JSON.stringify(toysInBoxData));
// }

// function attachToyToTree(tree: HTMLElement, toy: HTMLImageElement, x: number, y: number) {
//   tree.append(toy);
//   toy.style.position = 'absolute';
//   toy.style.left = `${x * tree.clientWidth}px`;
//   toy.style.top = `${y * tree.clientHeight}px`;
// }

// function moveToyToContainer(toy: HTMLImageElement) {
//   const DURATION = 500;
//   const id = toy.getAttribute('id');
//   if (!id) {
//     return;
//   }
//   const toyContainer = findContainerForToy(id);

//   if (!toyContainer) {
//     toy.remove();
//     saveToysPosition();
//     return;
//   }

//   const t = toy.getBoundingClientRect().top;
//   const l = toy.getBoundingClientRect().left;
//   document.body.append(toy);
//   toy.style.left = `${l}px`;
//   toy.style.top = `${t}px`;

//   const toyCountLabel = toyContainer.querySelector('.toy-item__label') as HTMLElement;
//   const { top, left, width, height } = toyContainer.getBoundingClientRect();

//   toy.style.transitionDuration = `${DURATION}ms`;
//   toy.style.top = `${top + (height - toy.height) / 2}px`;
//   toy.style.left = `${left + (width - toy.width) / 2}px`;

//   setTimeout(() => {
//     if (Number(toyCountLabel.textContent) === 0) {
//       toyContainer.append(toy);
//       toy.style.position = '';
//       toy.style.zIndex = '';
//       toy.style.transitionDuration = '';
//     } else {
//       toy.remove();
//     }
//     changeToyCountLabel(toyCountLabel, 'increment');
//   }, DURATION);

//   saveToysPosition();
// }

// function findContainerForToy(id: string) {
//   const toyContainers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.toy-item');

//   for (const toyContainer of toyContainers) {
//     const toyImage = toyContainer.querySelector('img');
//     if (toyImage && toyImage.getAttribute('id') === id) {
//       return toyContainer;
//     }
//   }

//   for (const toyContainer of toyContainers) {
//     const toyImage = toyContainer.querySelector('img');
//     if (!toyImage) {
//       return toyContainer;
//     }
//   }

//   return null;
// }

// function changeToyCountLabel(label: HTMLElement, type: 'increment' | 'decrement') {
//   let value = Number(label.textContent);

//   if (type === 'increment') {
//     value++;
//   }
//   if (type === 'decrement') {
//     value--;
//   }

//   label.textContent = `${value}`;
//   label.style.visibility = value <= 0 ? 'hidden' : 'visible';
// }

// function getContainerForTree() {
//   const containers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.store-item');
//   if (containers.length === 2) {
//     if (!containers[0].hasChildNodes()) {
//       return containers[0];
//     }

//     if (!containers[1].hasChildNodes()) {
//       containers[1].remove();
//     }
//   }

//   const container = containers[0].cloneNode() as HTMLDivElement;
//   container.setAttribute('id', `${Number(containers[0].getAttribute('id')) + 1}`);
//   containers[0].before(container);
//   return container;
// }

// function printTreeToContainer(container: HTMLElement) {
//   const tree = $<HTMLElement>('.tree');
//   const treeBack = $<HTMLElement>('.tree-back');
//   const k = container.clientWidth / treeBack.clientWidth;

//   const treeClone = tree.cloneNode(true) as HTMLElement;
//   $('.garland-container', treeClone).remove();
//   const treeImage = $<HTMLImageElement>('.tree__image', treeClone);
//   treeImage.height *= k;
//   treeImage.width *= k;

//   const toysOnTree = $$<HTMLImageElement>('.toy-image', treeClone);
//   for (const toyOnTree of toysOnTree) {
//     toyOnTree.height *= k;
//     toyOnTree.width *= k;

//     toyOnTree.style.top = `${Number.parseFloat(toyOnTree.style.top) * k}px`;
//     toyOnTree.style.left = `${Number.parseFloat(toyOnTree.style.left) * k}px`;
//   }

//   treeClone.style.pointerEvents = 'none';
//   container.style.backgroundImage = treeBack.style.backgroundImage;
//   container.append(treeClone);
// }

// function saveStateOfApp() {
//   const countSavedStates = LS.getItem<number>('countSavedStates') ?? 0;
//   const stateId = String(countSavedStates);
//   const stateOfApp: IAppState = {
//     treeImageId: LS.getItem('treeId') ?? 1,
//     backgroundImageId: LS.getItem('treeBackId') ?? 1,
//     favoriteToys: LS.getItem('favoriteToys') ?? [],
//     toysOnTree: LS.getItem('toysOnTree') ?? [],
//     snowfallTimerId: LS.getItem('snowfall') ?? 0,
//     isPlayMusic: LS.getItem('music') ?? false,
//     garland: LS.getItem('garland') ?? '',
//   };
//   LS.setItem('countSavedStates', countSavedStates + 1);
//   LS.setItem(`state${stateId}`, stateOfApp);
//   return stateOfApp;
// }

// function restoreStateOfApp(state: IAppState) {
//   clearInterval(Number(localStorage.getItem('snowfall')));
//   removeToysFromTree();
//   clearBoxOfToys();

//   localStorage.setItem('treeId', String(state.treeImageId));
//   localStorage.setItem('treeBackId', String(state.backgroundImageId));
//   localStorage.setItem('toysOnTree', JSON.stringify(state.toysOnTree));
//   localStorage.setItem('favoriteToys', JSON.stringify(state.favoriteToys));
//   localStorage.setItem('snowfall', String(state.snowfallTimerId));
//   localStorage.setItem('music', String(state.isPlayMusic));
//   localStorage.setItem('garland', state.garland);

//   initToys();
//   setTree(state.treeImageId);
//   setTreeBackground(state.backgroundImageId);
//   setFavoriteToysCounter(state.favoriteToys.length);
//   setMusic('reset');
//   setMusic(state.isPlayMusic ? 'play' : 'pause');
//   initSnowfall();
//   garland.setColor(state.garland);
//   const garlandBtns = $$<HTMLInputElement>('.garland-option');
//   for (const garlandBtn of garlandBtns) {
//     garlandBtn.checked = garlandBtn.getAttribute('value') === garland.color;
//   }
// }

// function removeToysFromTree(mode?: 'soft' | 'hard', condition?: (toy: HTMLImageElement) => boolean) {
//   const tree = $<HTMLElement>('.tree');
//   const toysOnTree = $$<HTMLImageElement>('.toy-image', tree);
//   let countDeletedToys = 0;

//   for (const toyOnTree of toysOnTree) {
//     if (!condition || condition(toyOnTree)) {
//       if (mode && mode === 'soft') {
//         moveToyToContainer(toyOnTree);
//       } else {
//         toyOnTree.remove();
//       }
//       countDeletedToys++;
//     }
//   }

//   return countDeletedToys;
// }

// function clearBoxOfToys() {
//   const toyContainers = $$<HTMLDivElement>('.toy-item');
//   for (const toyContainer of toyContainers) {
//     const toyImage = toyContainer.querySelector('img');
//     if (toyImage) {
//       toyImage.remove();
//     }

//     const toyCountLabel = $<HTMLElement>('.toy-item__label', toyContainer);
//     toyCountLabel.textContent = '0';
//     toyCountLabel.style.visibility = 'hidden';
//   }
// }

// function initSavedTrees() {
//   const countSavedTrees = LS.getItem<number>('countSavedStates') ?? 0;

//   for (let i = 0; i < countSavedTrees; i++) {
//     const state = LS.getItem<IAppState>(`state${i}`);
//     if (!state) {
//       return;
//     }
//     const container = getContainerForTree();
//     container.classList.add('tree-back');
//     container.style.backgroundImage = `url('../assets/bg/${state.backgroundImageId}.jpg')`;

//     const tree = document.createElement('div');
//     tree.classList.add('tree');
//     container.append(tree);
//     container.addEventListener('click', () => restoreStateOfApp(state));

//     const treeImg = document.createElement('img');
//     treeImg.src = `./assets/tree/${state.treeImageId}.png`;
//     treeImg.classList.add('tree__image');
//     tree.append(treeImg);

//     setTimeout(() => {
//       for (const toyData of state.toysOnTree) {
//         const toy = document.createElement('img');
//         toy.src = `../assets/toys/${toyData.id}.png`;
//         const zoomFactor = 0.1;
//         toy.width = tree.clientHeight * zoomFactor;
//         toy.height = tree.clientHeight * zoomFactor;
//         attachToyToTree(tree, toy, +toyData.left, +toyData.top);
//       }
//     }, 1000);
//   }
// }

// function clearSavedTrees() {
//   const storeContainer = $<HTMLElement>('.store-container');
//   // eslint-disable-next-line github/no-inner-html
//   storeContainer.innerHTML = `
//     <div class="store-item" data-id="0"></div>
//     <div class="store-item"></div>`;
// }

// function isCorrectToyPosition(toy: HTMLImageElement) {
//   const treeArea = $<HTMLAreaElement>('.tree__area');
//   const { left, right, top } = toy.getBoundingClientRect();
//   toy.style.display = 'none';
//   const elemUnderToy = document.elementFromPoint((left + right) / 2, top);

//   toy.style.display = '';
//   return elemUnderToy === treeArea;
// }
