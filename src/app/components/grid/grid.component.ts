import { PlatformComponent } from './../platform.component';
import { Component, OnInit } from '@angular/core';
import { DoodlerCreatorService } from '../../services/doodler-creator/doodler-creator.service';
import { CreatePlatformsService } from '../../services/create-platforms/create-platforms.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private platformCount: number;
  private gameHeight: number;
  private gameWidth: number;
  private gridElement: Element;
  private firstPlatform: PlatformComponent;
  private doodler: HTMLElement;

  public isGameOver: any;
  
  constructor(
    private doodlerCreator: DoodlerCreatorService,
    private platformCreator: CreatePlatformsService,
    ) { }

  ngOnInit(): void {
    this.isGameOver = this.doodlerCreator.getGameOverStatus().subscribe(value=>{
      this.isGameOver = value
      // if(this.isGameOver){
      //   this.setGame()
      // }

    })
    this.gridElement = document.querySelector('.container__grid');
    this.gameHeight = this.gridElement.clientHeight;
    this.gameWidth = this.gridElement.clientWidth;
    this.platformCount = 5;

    this.setGame()
    this.startGame()

  }

  setGame():void{
    this.firstPlatform = this.platformCreator.createPlatforms(this.platformCount, this.gameHeight, this.gameWidth, this.gridElement)
    this.doodlerCreator.createDoodler('container__grid','doodler', this.firstPlatform);
    this.doodler = document.querySelector('.doodler')
  }

  startGame(){
    setInterval(()=>this.platformCreator.movePlatforms(this.doodler.style.bottom), 30)
    this.doodlerCreator.jump(this.doodler.style.bottom, this.doodler)
  }




}
