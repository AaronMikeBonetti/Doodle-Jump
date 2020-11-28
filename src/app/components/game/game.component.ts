import { DoodlerService } from './../../services/doodler/doodler.service';
import { PlatformComponent } from '../platform.component';
import { Component, OnInit, HostListener } from '@angular/core';
import { PlatformsService } from '../../services/platforms/platforms.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: {
    '(document:keyup)': 'control($event)'
  }
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
  }

  resetGame():void{
    this.setGame();
    this.startGame();
  }

  moveLeft():void{
    this.doodlerService.moveLeft(this.doodler, this.gameWidth)
  }

  moveRight():void{
    this.doodlerService.moveRight(this.doodler, this.gameWidth)
  }

  stop():void{
    this.doodlerService.stop(this.doodler)
  }

  control(e):void{
    switch(e.code){
      case "ArrowLeft": 
        this.moveLeft()
      break
      case "ArrowRight": 
        this.moveRight()
      break
      case "ArrowUp":  
        this.stop()
      break
      case "Space": 
        this.doodlerService.jump(this.doodler.style.bottom, this.doodler);
      break
    }
  }


}
