import { PlatformComponent } from './../../components/platform.component';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class DoodlerService {

  isGameOver: EventEmitter<boolean> = new EventEmitter();

  upTimerId: any;
  downTimerId: any;
  leftTimerId:any;
  rightTimerId:any;

  gameOver: boolean
  isFirstJump: boolean;
  isJumping: boolean;
  platformsArray: PlatformComponent[];
  doodlerStartPoint: number;
  doodlerBottomSpace: number;
  doodlerFromBottomRawNumber: number;
  doodlerFromLeftRawNumber: number;
  doodlerFromRightRawNumber: number;
  isMovingRight: boolean;
  isMovingLeft: boolean;

  constructor() {
    this.doodlerStartPoint = 150
    this.doodlerBottomSpace = this.doodlerStartPoint
   }

  createDoodler(
    gridClassName: string, 
    doodlerClassName: string,
    platformsArray: PlatformComponent[]
    ): void{
    this.isGameOver.emit(false);
    this.gameOver = false
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
      if(doodlerFromBottomRawNumber > this.doodlerStartPoint + 500){
        this.fall(doodlerFromBottom, doodler)
      }
      doodlerFromBottomRawNumber += 1
      doodler.style.bottom = `${doodlerFromBottomRawNumber}px`
      doodlerFromBottom = doodler.style.bottom
    }, 10)
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

  moveLeft(doodler: HTMLElement, gameWidth: number){
    clearInterval(this.rightTimerId)
    if(!this.isMovingLeft && !this.gameOver){
      this.isMovingRight = false
      this.isMovingLeft = true
      this.leftTimerId = setInterval(()=>{
        if(this.doodlerFromLeftRawNumber <= 0 ){
          this.moveRight(doodler, gameWidth)
        }
        this.doodlerFromLeftRawNumber -=5
        doodler.style.left = `${this.doodlerFromLeftRawNumber}px`
      }, 20)
      
      
    }
  }

  moveRight(doodler: HTMLElement, gameWidth: number){
    clearInterval(this.leftTimerId)
    if(!this.isMovingRight && !this.gameOver){
      this.isMovingRight = true
      this.isMovingLeft = false
      this.rightTimerId = setInterval(()=>{
        if(this.doodlerFromRightRawNumber >= gameWidth ){
          this.moveLeft(doodler, gameWidth)
        }
        this.doodlerFromLeftRawNumber +=5
        doodler.style.left = `${this.doodlerFromLeftRawNumber}px`
        console.log(this.doodlerFromRightRawNumber, gameWidth)
      }, 20)
    }
  }

  stop(doodler: HTMLElement){
    clearInterval(this.leftTimerId)
    clearInterval(this.rightTimerId)
    this.isMovingRight = false
    this.isMovingLeft = false
  }

  gameOverFunc(){
    clearInterval(this.downTimerId)
    clearInterval(this.upTimerId)
    clearInterval(this.leftTimerId)
    clearInterval(this.rightTimerId)
    this.gameOver = true
    this.isGameOver.emit(true)
  }

  getGameOverStatus(){
    return this.isGameOver
  }
}

