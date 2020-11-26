import { PlatformComponent } from './../../components/platform.component';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class CreatePlatformsService {

  private platformsArray: Array<PlatformComponent>

  constructor(
    
  ) {
    this.platformsArray = []
   }

  createPlatforms(
    platformCount: number, 
    gameHeight: number, 
    gameWidth: number, 
    grid:Element  )  {

    for( let i=0; i < platformCount; i++) {
      let platformGap = gameHeight / platformCount
      let newPlatformBottom = 100 + (i * platformGap)
      let newPlatform  = new PlatformComponent(newPlatformBottom, gameWidth, grid)
      this.platformsArray.push(newPlatform)
    }
    return this.platformsArray[0]
  }

  movePlatforms(doodlerFromBottom: string){
    let doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0,-2))
    if(doodlerFromBottomRawNumber > 200)
        this.platformsArray.forEach(platform=>{
          platform.platformFromBottom -= 4
          let visual = platform.platformVisual
          visual.style.bottom = `${platform.platformFromBottom}px`
          doodlerFromBottom = visual.style.bottom
        })
  }   
  
}
