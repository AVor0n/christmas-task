export function dragAndDrop(/* toyEl: HTMLImageElement, event: MouseEvent */) {
  // //* * ------------ Prepare ------------------ */
  // const { left: toyLeft, right: toyRight, top: toyTop } = toyEl.getBoundingClientRect();
  // const shiftPivotX = event.x - (toyLeft + toyRight) / 2;
  // const shiftPivotY = event.y - toyTop;
  // const shiftX = event.x - toyEl.getBoundingClientRect().left;
  // const shiftY = event.y - toyEl.getBoundingClientRect().top;
  // const toysContainer = $<HTMLDivElement>('.toys-container');
  // let toy = toyEl;
  // if (toysContainer.contains(toy)) {
  //   const toyCountLabel = $<HTMLElement>('.toy-item__label', toy.parentElement!);
  //   if (Number(toyCountLabel.textContent) > 1) {
  //     toy = toyEl.cloneNode() as HTMLImageElement;
  //     toy.addEventListener('dragstart', () => false);
  //     toy.addEventListener('mousedown', (e) => dragAndDrop(toy, e));
  //   }
  //   changeToyCountLabel(toyCountLabel, 'decrement');
  // }
  // toy.style.cursor = 'grabbing';
  // toy.style.zIndex = '1000';
  // toy.style.position = 'absolute';
  // document.body.append(toy);
  // moveAt(event.x, event.y);
  // function moveAt(x: number, y: number) {
  //   toy.style.left = `${x - shiftX}px`;
  //   toy.style.top = `${y - shiftY}px`;
  // }
  // //* * ------------ Drag(move) ------------------ */
  // const treeArea = $('.tree__area');
  // const treeImg = $<HTMLImageElement>('.tree__image');
  // document.addEventListener('mousemove', onMouseMove);
  // function onMouseMove(e: MouseEvent) {
  //   moveAt(e.x, e.y);
  //   toy.style.display = 'none';
  //   const elemUnderToy = document.elementFromPoint(e.x - shiftPivotX, e.y - shiftPivotY);
  //   toy.style.display = '';
  //   treeImg.style.filter = elemUnderToy === treeArea ? 'drop-shadow(0 0 7px green)' : 'drop-shadow(0 0 7px red)';
  // }
  // //* * ------------ Drop ------------------ */
  // const onMouseUpHandler = (e: MouseEvent) => {
  //   toy.style.display = 'none';
  //   const elemUnderToy = document.elementFromPoint(e.x - shiftPivotX, e.y - shiftPivotY);
  //   toy.style.display = '';
  //   if (elemUnderToy === treeArea) {
  //     const tree = $<HTMLImageElement>('.tree');
  //     const { top, left } = tree.getBoundingClientRect();
  //     const x = (e.x - left - shiftX) / tree.clientWidth;
  //     const y = (e.y - top - shiftY) / tree.clientHeight;
  //     attachToyToTree(tree, toy, x, y);
  //   } else {
  //     moveToyToContainer(toy);
  //   }
  //   toy.style.cursor = 'grab';
  //   treeImg.style.filter = '';
  //   document.removeEventListener('mousemove', onMouseMove);
  //   toy.removeEventListener('mouseup', onMouseUpHandler);
  //   saveToysPosition();
  // };
  // toy.addEventListener('mouseup', onMouseUpHandler);
}
