const durationOfDisplayToast = 5000;

export function message(time: number, ...texts: string[]) {
  const $container = document.createElement('div');
  $container.classList.add('message');

  for (const text of texts) {
    const $paragraph = document.createElement('p');
    $paragraph.textContent = text;
    $container.append($paragraph);
  }
  document.body.append($container);
  $container.style.opacity = '1';

  setTimeout(() => {
    $container.style.opacity = '0';
  }, time);

  setTimeout(() => {
    $container.remove();
  }, time + durationOfDisplayToast);
}
