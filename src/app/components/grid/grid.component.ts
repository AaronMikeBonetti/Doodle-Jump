import { Component, OnInit } from '@angular/core';
import { DoodlerCreatorService } from '../../services/doodler-creator/doodler-creator.service'
import { CreatePlatformsService } from '../../services/create-platforms/create-platforms.service'
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public platformCount: number;
  public gameHeight: number;
  public gameWidth: number;

  private isGameOver: boolean;
  private gridElement: Element;
  private doodlerElement: HTMLDivElement;
  private firstPlatform: Element;
  
  constructor(
    private doodlerCreator: DoodlerCreatorService,
    private platformCreator: CreatePlatformsService
    ) { }

  ngOnInit(): void {
    this.isGameOver = true;
    this.gridElement = document.querySelector('.container__grid');
    this.gameHeight = this.gridElement.clientHeight;
    this.gameWidth = this.gridElement.clientWidth;
    this.platformCount = 5;
    this.doodlerCreator.createDoodler('container__grid','doodler');
    this.doodlerElement = document.querySelector('.doodler');
    this.platformCreator.createPlatforms(this.platformCount, this.gameHeight, this.gameWidth, this.gridElement)
    // this.firstPlatform = document.querySelector(".platform").firstElementChild;
    this.doodlerCreator.setDoodlerStart(this.doodlerElement, 10, 90);
  }

  

}
