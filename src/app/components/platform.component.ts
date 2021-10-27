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
    if(cloudNum % 4 === 0){
      platformVisual.setAttribute('src', `../../assets/cucumber/cucumber.jpg`);
      platformVisual.classList.add('platform');
    } else{
      platformVisual.setAttribute('src', `../../assets/clouds/cloud_${cloudNum}.png`);
      platformVisual.classList.add('platform');
    }
    platformVisual.style.left = `${this.platformFromLeft}px`;
    platformVisual.style.bottom = `${this.platformFromBottom}px`;
    const platformContainer = document.getElementsByClassName('platform__container')[0];
    platformContainer.appendChild(platformVisual);
  }
}
