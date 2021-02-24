import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss']
})
export class ScoringComponent implements OnInit {

  @Input() isFirstGame: boolean;
  @Input() isGameOver: boolean;

  @Output() resetGame = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emitResetGame(): void {
    this.resetGame.emit(true);
  }

}
