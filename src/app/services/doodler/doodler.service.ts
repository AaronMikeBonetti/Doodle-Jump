import { PlatformComponent } from './../../components/platform.component';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class DoodlerService {

  upTimerId: any;
  downTimerId: any;
  leftTimeId:any;
  rightTimeId:any;

  isGameOver: EventEmitter<boolean> = new EventEmitter();
  gameOver: boolean
  isFirstJump: boolean;
  isJumping: boolean;
  platformsArray: PlatformComponent[];
  doodlerStartPoint: number;
  doodlerBottomSpace: number;
  doodlerFromBottomRawNumber: number;
  doodlerFromLeftRawNumber: number;
  doodlerFromRightRawNumber: number;

  constructor() {
    this.doodlerStartPoint = 150
    this.doodlerBottomSpace = this.doodlerStartPoint
   }

  createDoodler(
    gridClassName: string, 
    doodlerClassName: string,
    platformsArray: PlatformComponent[]
    ): void{
    this.isGameOver.emit(false)
    this.platformsArray = platformsArray
    const doodler = document.createElement('div');
    const grid = document.querySelector(`.${gridClassName}`)
    doodler.classList.add(doodlerClassName)
    grid.appendChild(doodler)
    doodler.style.left = `${platformsArray[0].platformFromLeft + 15}px`
    doodler.style.bottom = `${platformsArray[0].platformFromBottom + 20}px`
  }

  jump(doodlerFromBottom: string, doodler: HTMLElement){
    this.isJumping = true
    clearInterval(this.downTimerId)
    this.upTimerId = setInterval(()=>{
      let doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0,-2))
      doodlerFromBottomRawNumber += 10
      doodler.style.bottom = `${doodlerFromBottomRawNumber}px`
      doodlerFromBottom = doodler.style.bottom
      if(doodlerFromBottomRawNumber > this.doodlerStartPoint + 500){
        this.fall(doodlerFromBottom, doodler)
      }
      
    }, 30)
  }

  fall(doodlerFromBottom: string, doodler: HTMLElement){
    this.isJumping = false
    clearInterval(this.upTimerId)
    this.downTimerId = setInterval(()=>{
      this.doodlerFromBottomRawNumber = Number(doodlerFromBottom.slice(0,-2))
      this.doodlerFromLeftRawNumber = Number(doodler.style.left.slice(0,-2))
      this.doodlerFromRightRawNumber = Number(doodler.style.left.slice(0,-2)) + 60
      this.doodlerFromBottomRawNumber -= 5
      doodler.style.bottom = `${this.doodlerFromBottomRawNumber}px`
      doodlerFromBottom = doodler.style.bottom
      if(this.doodlerFromBottomRawNumber <= 0){
        this.gameOverFunc()
      }
      this.platformsArray.forEach(platform=>{
          const topOfPlatform = platform.platformVisual.clientHeight + platform.platformFromBottom
          const bottomOfPlatform = platform.platformFromBottom
          const leftOfPlatform = platform.platformFromLeft
          const rightOfPlatform =  platform.platformFromLeft + platform.platformVisual.clientWidth
          if(
            topOfPlatform >= this.doodlerFromBottomRawNumber &&
            bottomOfPlatform <= this.doodlerFromBottomRawNumber &&
            leftOfPlatform <= this.doodlerFromRightRawNumber &&
            rightOfPlatform >= this.doodlerFromLeftRawNumber &&
            !this.isJumping
            ){
            this.doodlerStartPoint = this.doodlerFromBottomRawNumber
            this.jump(doodlerFromBottom, doodler)
          }
      })
    }, 30)
  }

  doodlerMovingLeft(doodler: HTMLElement){
    clearInterval(this.rightTimeId)
    this.leftTimeId = setInterval(()=>{
      this.doodlerFromLeftRawNumber -=5
      doodler.style.left = `${this.doodlerFromLeftRawNumber}px`
    }, 30)
  }
  doodlerMovingRight(doodler: HTMLElement){
    clearInterval(this.leftTimeId)
    this.leftTimeId = setInterval(()=>{
      this.doodlerFromLeftRawNumber -=5
      doodler.style.left = `${this.doodlerFromLeftRawNumber}px`
    }, 30)
  }

  gameOverFunc(){
    clearInterval(this.downTimerId)
    clearInterval(this.upTimerId)
    this.isGameOver.emit(true)
  }

  getGameOverStatus(){
    return this.isGameOver
  }
}

