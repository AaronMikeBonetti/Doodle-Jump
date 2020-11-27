import { PlatformComponent } from '../platform.component';
import { Component, OnInit } from '@angular/core';
import { DoodlerService } from '../../services/doodler/doodler.service';
import { PlatformsService } from '../../services/platforms/platforms.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private platformCount: number;
  private gameHeight: number;
  private gameWidth: number;
  private gridElement: Element;
  private platformArray: PlatformComponent[];
  private doodler: HTMLElement;
  
  public isFirstGame: boolean = true
  public isGameOver: any;
  public isGoingLeft: boolean;
  public isGoingRight: boolean;
  
  constructor(
    private doodlerService: DoodlerService,
    private platformService: PlatformsService,
    ) { }

  ngOnInit():void{
    document.addEventListener('keyup', this.moveLeft);
    this.isGameOver = this.doodlerService.getGameOverStatus().subscribe(value=>{
      this.isGameOver = value;
    })
    this.gridElement = document.querySelector('.container__grid');
    this.gameHeight = this.gridElement.clientHeight;
    this.gameWidth = this.gridElement.clientWidth;
    this.platformCount = 5;
    this.isGoingLeft = false
    this.isGoingRight = false
  }

  setGame():void{
    this.platformArray = this.platformService.createPlatforms(this.platformCount, this.gameHeight, this.gameWidth, this.gridElement);
    this.doodlerService.createDoodler('container__grid','doodler', this.platformArray);
    this.doodler = document.querySelector('.doodler');
  }

  startGame():void{
    this.isFirstGame = false;
    setInterval(()=>this.platformService.movePlatforms(this.doodler.style.bottom), 30);
    this.doodlerService.jump(this.doodler.style.bottom, this.doodler);
  }

  resetGame():void{
    this.setGame();
    this.startGame();
  }

  moveLeft(){
    this.isGoingLeft = true
    this.isGoingRight = false
    this.doodlerService.doodlerMovingLeft(this.doodler)
  }

  moveRight(){
    this.isGoingLeft = false
    this.isGoingRight = true
    this.doodlerService.doodlerMovingRight(this.doodler)
  }

  control(e):void{
    console.log('hi')
    switch(e.key){
      case "ArrowLeft": 
        this.moveLeft()
      break
      case "ArrowRight": 
        this.moveRight()
      break
      case "Space":
        this.doodlerService.jump(this.doodler.style.bottom, this.doodler)
      break
    }
  }


}
