import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Armor } from '../models/armor';
import { Weapon } from '../models/weapon';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  armors: Armor[] = [];
  armors$: BehaviorSubject<Armor[]> = new BehaviorSubject<Armor[]>(this.armors);
  weapons: Weapon[] = [];
  weapons$: BehaviorSubject<Weapon[]> = new BehaviorSubject<Weapon[]>(this.weapons);

  constructor(
    private _http: HttpClient
  ) {
    this._http.get('assets/data/armors.json').subscribe((res: any) => {
      this.armors = res;
      this.armors$.next(this.armors);
    });
    this._http.get('assets/data/weapons.json').subscribe((res: any) => {
      this.weapons = res;
      this.weapons$.next(this.weapons);
    });
  }
}
