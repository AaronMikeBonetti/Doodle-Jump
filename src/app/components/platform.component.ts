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
    const cloudNum = Math.floor((Math.random() * 5) + 1);

    platformVisual.style.left = `${this.platformFromLeft}px`;
    platformVisual.style.bottom = `${this.platformFromBottom}px`;
    platformVisual.setAttribute('src', `../../assets/clouds/cloud_${cloudNum}.png`);
    platformVisual.classList.add('platform');
    grid.appendChild(platformVisual);
  }
}
