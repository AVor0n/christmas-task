export default function messsage(time: number, ...texts: string[]) {
  const container = document.createElement('div');
  container.classList.add('message');
  container.innerHTML = texts.map((text) => `<p>${text}</p>`).join('');
  document.body.append(container);
  container.style.opacity = '1';

  setTimeout(() => {
    container.style.opacity = '0';
  }, time);

  setTimeout(() => {
    container.remove();
  }, time + 5000);
}
