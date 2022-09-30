export class Dice {
    constructor(private sides: number, private rerollOnMax = false) {
        this.sides = sides;
        this.rerollOnMax = rerollOnMax;
    }
    //sides: number;
    //rerollOnMax: boolean;
    roll(rolls = [], ): number[] {
      const roll1 = Math.floor(Math.random() * this.sides + 1);
      rolls.push(roll1);
      if (this.rerollOnMax && roll1 == this.sides)
      {
        const roll2 = Math.floor(Math.random() * this.sides + 1);
        rolls.push(roll2);
      }
      return rolls;
    }
}
