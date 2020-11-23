import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoodlerCreatorService {

  constructor() { }

  createDoodler(gridClassName: string, doodlerClassName: string): void{
    const doodler = document.createElement('div');
    const grid = document.querySelector(`.${gridClassName}`)
    doodler.classList.add(doodlerClassName)
    grid.appendChild(doodler)
  }

  setDoodlerStart(doodler: HTMLDivElement,distanceFromLeft: number, distanceFromBottom: number){
    doodler.style.left = `${distanceFromLeft}px`
    doodler.style.bottom = `${distanceFromBottom}px`
  }
}
