export class Snowfall {
  // TODO: оптимизировать, вынести на другой слой, requestAnimationFrame
  container: HTMLDivElement;

  snowFlakeSpawnInterval: number;

  private snowTimerID: number | null = null;

  constructor(container: HTMLDivElement, snowFlakeSpawnInterval = 150) {
    this.container = container;
    this.snowFlakeSpawnInterval = snowFlakeSpawnInterval;
  }

  toggle() {
    if (this.snowTimerID) {
      clearInterval(this.snowTimerID);
      this.snowTimerID = null;
    } else {
      this.snowTimerID = window.setInterval(() => this.createSnowFlake(), this.snowFlakeSpawnInterval);
    }
  }

  private createSnowFlake() {
    const snowflake = document.createElement('span');
    snowflake.textContent = '❄';
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * this.container.clientWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 3}s`; // between 2 - 5 seconds
    snowflake.style.opacity = `${Math.random()}`;
    snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;

    this.container.append(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 5000); // FIXME
  }
}
