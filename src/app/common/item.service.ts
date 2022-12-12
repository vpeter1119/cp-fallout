import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Armor } from '../models/armor';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  armors: Armor[] = [];
  armors$: BehaviorSubject<Armor[]> = new BehaviorSubject<Armor[]>(this.armors);

  constructor(
    private _http: HttpClient
  ) {
    this._http.get('assets/data/armors.json').subscribe((res: any) => {
      this.armors = res;
      this.armors$.next(this.armors);
    });
  }
}
