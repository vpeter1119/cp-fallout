import { Injectable } from '@angular/core';
import { Dice } from '../models/dice';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  d10 = new Dice(10, true);
  d6 = new Dice(6, false);

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rollStat(modifier: number = 0): string {
    let natRolls = this.d10.roll();
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    console.warn(natRolls);
    return `[${natRolls.join(' + ')}] ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${sum}`;
  }

  rollDamage(dice: number, modifier: number = 0): string {
    let natRolls = [];
    for (let i = 0; i < dice+1; i++) {
      natRolls = natRolls.concat(this.d6.roll());
    }
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    console.warn(natRolls);
    return `[${natRolls.join(' + ')}] ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${sum}`;
  }
}
