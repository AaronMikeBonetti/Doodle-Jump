import { PlatformComponent } from './../../components/platform.component';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class DoodlerCreatorService {

  upTimerId: any;
  downTimerId: any;
  isGameOver: EventEmitter<boolean> = new EventEmitter();
  gameOver: boolean
  isFirstJump: boolean;

  constructor() { }

  createDoodler(
    gridClassName: string, 
    doodlerClassName: string,
    firstPlatform: PlatformComponent
    ): void{
    this.isGameOver.emit(false)
    const doodler = document.createElement('div');
    const grid = document.querySelector(`.${gridClassName}`)
    doodler.classList.add(doodlerClassName)
    grid.appendChild(doodler)
    doodler.style.left = `${firstPlatform.platformFromLeft + 15}px`
    doodler.style.bottom = `${firstPlatform.platformFromBottom + 20}px`
  }

  jump(doodlerFromBottom: string, doodler: HTMLElement){
    clearInterval(this.downTimerId)
    this.upTimerId = setInterval(()=>{
      let doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0,-2))
      doodlerFromBottomRawNumber += 20
      doodler.style.bottom = `${doodlerFromBottomRawNumber}px`
      doodlerFromBottom = doodler.style.bottom
      if(doodlerFromBottomRawNumber > 350){
        this.fall(doodlerFromBottom, doodler)
      }
    }, 30)
  }

  fall(doodlerFromBottom: string, doodler: HTMLElement){
    clearInterval(this.upTimerId)
    this.downTimerId = setInterval(()=>{
      let doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0,-2))
      doodlerFromBottomRawNumber -= 5
      doodler.style.bottom = `${doodlerFromBottomRawNumber}px`
      doodlerFromBottom = doodler.style.bottom
      if(doodlerFromBottomRawNumber <= -100){
        this.gameOverFunc()
      }
    }, 30)
  }

  gameOverFunc(){
    clearInterval(this.downTimerId)
    this.isGameOver.emit(true)
  }

  getGameOverStatus(){
    return this.isGameOver
  }
}

