import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  d10 = {
    roll: (rolls: number[] = []) => {
      const roll1 = this.randomIntFromInterval(1, 10);
      rolls.push(roll1);
      if (roll1 == 10)
      {
        const roll2 = this.randomIntFromInterval(1, 10);
        rolls.push(roll2);
      }
      return rolls;
    }
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rollStat(modifier: number = 0): string {
    let natRolls = this.d10.roll();
    let sum = natRolls.reduce((partialSum, a) => partialSum + a, 0);
    sum += modifier;
    console.warn(natRolls);
    return `[${natRolls.join(' + ')}] + ${modifier} = ${sum}`;
  }
}
