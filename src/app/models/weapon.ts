export interface Weapon {
    ID: number;
    name: string;
    skillIndex: number;
    accuracy: number;
    damage: string;
    range: string;
    price: number;
    shots?: number;
    rateOfFire?: number;
    reliability?: number;
}

export interface CharacterWeapon extends Weapon {}