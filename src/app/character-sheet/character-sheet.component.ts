import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Character } from '../character';
import { CharacterService } from '../character.service';
import { DiceService } from '../dice.service';
import { Skill } from '../skill';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {

  loading;
  characterData: Character;
  originalCharacterData: Character;
  skills: Skill[];
  attributes;
  dataChanged = false;

  constructor(
    private characterService: CharacterService,
    private _dice: DiceService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.characterData = this.characterService.getSelectedCharacter();
    this.originalCharacterData = JSON.parse(JSON.stringify(this.characterData));
    this.attributes = this.characterService.getAttributes();
    this.skills = this.characterService.getSkills();
    console.log(this.characterData, this.attributes, this.skills);
    this.loading = false;
  }

  onRoll(label: string, modifier: number) {
    const roll = this._dice.rollStat(modifier);
    this.displayRollResult(label, roll);
  }

  onRollDamage(label: string, dice: number, modifier: number) {
    const roll = this._dice.rollDamage(dice, modifier);
    this.displayRollResult(label, roll);
  }

  displayRollResult(label: string, result: string) {
    this._snackBar.open(`Roll result for ${label}: ${result}`, 'Close');
  }

  checkForChanges() {
    this.dataChanged = JSON.stringify(this.characterData) != JSON.stringify(this.originalCharacterData);
    console.log('checkForChanges', this.dataChanged, JSON.stringify(this.characterData), JSON.stringify(this.originalCharacterData));
  }

  onSave() {
    this.characterService.saveCharacter(this.characterData);
    this.originalCharacterData = JSON.parse(JSON.stringify(this.characterData));
    this.checkForChanges();
  }

  onReset() {
    this.characterData = JSON.parse(JSON.stringify(this.originalCharacterData));
    this.checkForChanges();
  }

  onClear() {
    if (window.confirm('Do you want to clear all character data?'))
    {
      this.characterService.resetStorage();
    }
  }

}
