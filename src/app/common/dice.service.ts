import { Injectable } from '@angular/core';
import { Dice } from '../models/dice';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  d10_main = new Dice(10, true);
  d10 = new Dice(10, false);
  d6 = new Dice(6, false);

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rollStat(modifier: number = 0): string {
    let natRolls = this.d10_main.roll();
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    return `[${natRolls.join(' + ')}] ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${sum}`;
  }

  rollDamage(dice: number, type: number, modifier: number = 0): string {
    let natRolls = [];
    for (let i = 0; i < dice; i++) {
      let die = new Dice(type, false);
      natRolls = natRolls.concat(die.roll());
    }
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    return `[${natRolls.join(' + ')}] ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${sum}`;
  }

  rollWounds(modifier: number = 0, target: number) {
    let natRolls = this.d10_main.roll();
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    return `[${natRolls.join(' + ')}] ${modifier >= 0 ? '+' : '-'} ${Math.abs(modifier)} = ${sum} ${sum <= target ? '<' : '>'} ${target} → ${sum <= target ? 'SUCCESS' : 'FAILURE'}`;
  }

}
