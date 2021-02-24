import { DoodlerService } from './../../services/doodler/doodler.service';
import { PlatformComponent } from '../platform.component';
import { Component, OnInit, HostListener } from '@angular/core';
import { PlatformsService } from '../../services/platforms/platforms.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  host: {
    '(document:keyup)': 'control($event)',
  },
})
export class GameComponent implements OnInit {
  private platformCount: number;
  private gameHeight: number;
  private gameWidth: number;
  private gridElement: Element;
  private platformArray: PlatformComponent[];
  private doodler: HTMLElement;
  private platformInterval: any;

  emittedResetGame: any;

  public isFirstGame = true;
  public isFirstJump = true;
  public isGameOver: any;
  currentGameScore: number;
  currentGameInterval: any;

  constructor(
    private doodlerService: DoodlerService,
    private platformService: PlatformsService
  ) {}

  ngOnInit(): void {
    this.setGameOver();
    this.isGameOver = true;
    this.gridElement = document.querySelector('.container__grid');
    this.gameHeight = this.gridElement.clientHeight;
    this.gameWidth = this.gridElement.clientWidth;
    this.platformCount = 5;
  }

  setGameOver(): void{
    this.doodlerService
      .getGameOverStatus()
      .subscribe((value) => {
        if ( value ){
          clearInterval(this.currentGameInterval);
        }
        this.isGameOver = value;
      });
  }

  setScore(): void{
    this.currentGameScore = 0;
    this.currentGameInterval = setInterval(() => {
      this.currentGameScore += 100;
    }, 80);
  }

  setFirstJump(): void{
    this.setScore();
    this.isFirstJump = false;
    this.doodlerService.jump(this.doodler.style.bottom, this.doodler);
  }

  setGame(): void {
    this.platformArray = this.platformService.createPlatforms(
      this.platformCount,
      this.gameHeight,
      this.gameWidth,
      this.gridElement
    );
    this.doodlerService.createDoodler(
      'container__grid',
      'doodler',
      this.platformArray
    );
    this.doodler = document.querySelector('.doodler');
  }

  startGame(): void {
    this.setGame();
    this.platformInterval = setInterval(
      () => this.platformService.movePlatforms(this.doodler.style.bottom),
      30
    );
  }

  resetGame(): void {
    this.isFirstJump = true;
    this.isFirstGame = false;
    this.isGameOver = false;
    clearInterval(this.platformInterval);
    this.startGame();
  }

  moveLeft(): void {
    this.doodlerService.moveLeft(this.doodler, this.gameWidth);
  }

  moveRight(): void {
    this.doodlerService.moveRight(this.doodler, this.gameWidth);
  }

  stop(): void {
    this.doodlerService.stop(this.doodler);
  }

  control(e): void {
    switch (e.code) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowDown':
        this.stop();
        break;
      case 'ArrowUp':
        if (this.isFirstJump) {
          this.setFirstJump();
        } else {
          this.stop();
        }
        break;
    }
  }
}
