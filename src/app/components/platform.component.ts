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
    this.platformVisual = document.createElement('img');

    const platformVisual = this.platformVisual;

    platformVisual.style.left = `${this.platformFromLeft}px`;
    platformVisual.style.bottom = `${this.platformFromBottom}px`;
    platformVisual.setAttribute('src', '../../assets/clouds/cloud_1.png');
    platformVisual.classList.add('platform');
    grid.appendChild(platformVisual);
  }
}
