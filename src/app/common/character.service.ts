import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  selectedCharacter: Character;
  selectedCharacter$: BehaviorSubject<Character>;

  defaultCharacter: Character = {
    id: 0,
    general: {
      name: '',
      age: 0,
      caps: 0,
      radiation: 0
    },
    attributes: {
        strength: 0,
        perception: 0,
        endurance: 0,
        charisma: 0,
        intelligence: 0,
        agility: 0,
        luck: 0
    },    
    skills: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    wounds: 0
  }

  attributes = [
    { value: 'strength', display: 'Strength' },
    { value: 'perception', display: 'Perception' },
    { value: 'endurance', display: 'Endurance' },
    { value: 'charisma', display: 'Charisma' },
    { value: 'intelligence', display: 'Intelligence' },
    { value: 'agility', display: 'Agility' },
    { value: 'luck', display: 'Luck' },
  ]

  skills: Skill[] = [
    { id: 0, title: 'Állóképesség', attribute: 'endurance' },
    { id: 1, title: 'Barkácsolás', attribute: 'intelligence' },
    { id: 2, title: 'Éberség', attribute: 'perception' },
    { id: 3, title: 'Emberismeret', attribute: 'perception' },
    { id: 4, title: 'Elsősegély', attribute: 'intelligence' },
    { id: 5, title: 'Hackelés', attribute: 'intelligence' },
    { id: 6, title: 'Kézi lőfegyver', attribute: 'agility' },
    { id: 7, title: 'Közelharc', attribute: 'strength' },
    { id: 8, title: 'Lopakodás', attribute: 'agility' },
    { id: 9, title: 'Meggyőzés', attribute: 'charisma' },
    { id: 10, title: 'Pusztakezes harc', attribute: 'strength' },
    { id: 11, title: 'Radioaktív ellenállás', attribute: 'endurance' },
    { id: 12, title: 'Robbantás', attribute: 'perception' },
    { id: 13, title: 'Rohamfegyver', attribute: 'agility' },
    { id: 14, title: 'Tudomány', attribute: 'intelligence' },
    { id: 15, title: 'Túlélés', attribute: 'intelligence' },
    { id: 16, title: 'Üzletelés', attribute: 'charisma' },
    { id: 17, title: 'Zárnyitás', attribute: 'perception' },
    { id: 18, title: 'Zsebmetszés', attribute: 'perception' }
  ];

  constructor() {
    if (!this.selectedCharacter) this.selectedCharacter = this.getCharacterFromLocalStorage() || this.defaultCharacter;
  }

  getSelectedCharacter(): Character {
    return this.selectedCharacter;
  }

  setSelectedCharacter(character: Character): void {
    this.selectedCharacter = character;
    this.selectedCharacter$.next(this.selectedCharacter);
  }

  getAttributes() {
    return this.attributes;
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getCharacter(): Character {
    return this.getCharacterFromLocalStorage();
  }

  saveCharacter(data) {
    this.saveCharacterToLocalStorage(data);
  }

  getCharacterFromLocalStorage(): Character {
    const characterString = localStorage.getItem('characterData');
    return JSON.parse(characterString);
  }

  saveCharacterToLocalStorage(data) {
    console.log('saveCharacterToLocalStorage', data);
    localStorage.setItem('characterData', JSON.stringify(data));
  }

  resetStorage() {
    localStorage.removeItem('characterData');
  }
}
