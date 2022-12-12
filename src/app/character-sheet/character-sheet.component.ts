import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Character } from '../models/character';
import { CharacterService } from '../common/character.service';
import { DiceService } from '../common/dice.service';
import { Skill } from '../models/skill';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ItemService } from '../common/item.service';
import { Armor, CharacterArmor } from '../models/armor';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { CharacterWeapon, Weapon } from '../models/weapon';

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

  armors: Armor[] = [];
  weapons: Weapon[] = [];
  selection: any = {};
  totals = {
    aev: 0
  };

  constructor(
    private characterService: CharacterService,
    private _dice: DiceService,
    private _snackBar: MatSnackBar,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.characterData = this.characterService.getSelectedCharacter();
    this.originalCharacterData = JSON.parse(JSON.stringify(this.characterData));
    this.attributes = this.characterService.getAttributes();
    this.skills = this.characterService.getSkills();
    console.log(this.characterData, this.attributes, this.skills);
    this.loading = false;
    this.itemService.armors$.subscribe((armors) => {
      this.armors = armors;
    })
    this.itemService.weapons$.subscribe((weapons) => {
      this.weapons = weapons;
    })
  }

  onRoll(label: string, modifier: number) {
    const roll = this._dice.rollStat(modifier);
    this.displayRollResult(label, roll);
  }

  onRollDamage(label: string, dice: number, type: number, modifier: number) {
    const roll = this._dice.rollDamage(dice, type, modifier);
    this.displayRollResult(label, roll);
  }

  onRollDamageFromString(label: string, damageString: string) {
    let dmgArray1 = damageString.indexOf('+') > -1 ? damageString.split('+') : (damageString.indexOf('-') > -1 ? damageString.split('+') : [damageString]);
    let dmgArray2 = dmgArray1[0].split('d');
    console.warn(parseInt(dmgArray2[0]), 'd', parseInt(dmgArray2[1]), parseInt(dmgArray1[1]));
    this.onRollDamage(label, parseInt(dmgArray2[0]), parseInt(dmgArray2[1]), dmgArray1.length > 1 ? parseInt(dmgArray1[1]) : 0);
  }

  onRollWounds(modifier: number) {
    const roll = this._dice.rollWounds(modifier, this.characterData.attributes.endurance);
    this.displayRollResult('Ájulás mentő', roll);
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

  markWounds(event: MatCheckboxChange, wounds: number) {
    if (event) event.source.checked = true;
    this.characterData.wounds = wounds;
    this.characterService.saveCharacter(this.characterData);
  }

  onArmorSelect(event: MatSelectChange) {
    let newArmor: CharacterArmor = Object.assign({}, event.value);
    newArmor.currentArmor = Object.assign({}, newArmor.armor);
    this.characterData.armors.push(newArmor);
    this.selection.armor = null;
    this.checkForChanges();
    this.getEncTotal();
  }

  onWeaponSelect(event: MatSelectChange) {
    let newWeapon: CharacterWeapon = Object.assign({}, event.value);
    // newArmor.currentArmor = Object.assign({}, newArmor.armor);
    this.characterData.weapons.push(newWeapon);
    this.selection.weapon = null;
    this.checkForChanges();
  }

  onArmorEdit(event: FocusEvent, index: number, field: string) {
    let el = event.currentTarget as HTMLElement;
    var newValue = el.innerText;
    if (field.indexOf('.') > -1)
    {
      const fieldPath = field.split('.');
      this.characterData.armors[index][fieldPath[0]][fieldPath[1]] = newValue;
    }
    else
    {
      this.characterData.armors[index][field] = newValue;
    }
    this.characterService.saveCharacter(this.characterData);
    this.getEncTotal();
  }

  onArmorDelete(index) {
    this.characterData.armors.splice(index, 1);
    this.selection.armor = null;
    this.checkForChanges();
    this.getEncTotal();
  }

  onWeaponDelete(index) {
    this.characterData.weapons.splice(index, 1);
    this.selection.weapon = null;
    this.checkForChanges();
  }

  onRollWeapon(weapon: any) {
    const label = weapon.name;
    const modifier = this.characterData.skills[this.skills[weapon.skillIndex].id] + this.characterData.attributes[this.skills[weapon.skillIndex].attribute] + weapon.accuracy;
    this.onRoll(label, modifier);
  }

  getEncTotal(): number {
    let sum = 0;
    this.characterData.armors.forEach((armor) => {
      sum += armor.aev;
    })
    this.totals.aev = sum;
    return sum;
  }
}
