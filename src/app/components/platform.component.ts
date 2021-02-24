export class PlatformComponent {
  public platformFromBottom: number;
  public platformFromLeft: number;
  public platformVisual: HTMLDivElement;

  constructor(
    public newPlatformBottom: number,
    public gameWidth: number,
    public grid: Element
  ) {
    this.platformFromBottom = newPlatformBottom;
    this.platformFromLeft = Math.random() * (gameWidth - 85);
    this.platformVisual = document.createElement('div');

    const platformVisual = this.platformVisual;

    platformVisual.classList.add('platform');
    platformVisual.style.left = `${this.platformFromLeft}px`;
    platformVisual.style.bottom = `${this.platformFromBottom}px`;
    grid.appendChild(platformVisual);
  }
}
