import { PlatformComponent } from './../../components/platform.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformsService {
  private platformsArray: PlatformComponent[];
  private gameHeight: number;
  private gameWidth: number;
  private grid: Element;

  constructor() {}

  createPlatforms(
    platformCount: number,
    gameHeight: number,
    gameWidth: number,
    grid: Element
  ): PlatformComponent[] {
    this.platformsArray = [];
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.grid = grid;

    for (let i = 0; i < platformCount; i++) {
      const platformGap = gameHeight / platformCount;
      const newPlatformBottom = 100 + i * platformGap;
      const newPlatform = new PlatformComponent(
        newPlatformBottom,
        gameWidth,
        grid
      );
      this.platformsArray.push(newPlatform);
    }
    return this.platformsArray;
  }

  movePlatforms(doodlerFromBottom: string): void {
    const doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0, -2));
    if (doodlerFromBottomRawNumber > 200) {
      this.platformsArray.forEach((platform) => {
        platform.platformFromBottom -= 4;
        const visual = platform.platformVisual;
        visual.style.bottom = `${platform.platformFromBottom}px`;
        doodlerFromBottom = visual.style.bottom;
        if (platform.platformFromBottom < 0) {
          const firstPlatform = this.platformsArray[0].platformVisual;
          firstPlatform.classList.remove('platform');
          const newPlatform = new PlatformComponent(
            this.gameHeight - 10,
            this.gameWidth,
            this.grid
          );
          this.platformsArray.shift();
          this.platformsArray.push(newPlatform);
          const images = document.getElementsByTagName('img');
          const l = images.length - 5;
          for (let i = 0; i < l; i++) {
            images[0].parentNode.removeChild(images[0]);
          }
        }
      });
    }
  }
}
