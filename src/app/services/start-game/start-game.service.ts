import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartGameService {

  constructor() { }

  start(isGameOver: boolean, createDoodlerFunc: Function, createPlatforms: Function){
    if(isGameOver){
      createDoodlerFunc()
      createPlatforms()
    }
  }
}
