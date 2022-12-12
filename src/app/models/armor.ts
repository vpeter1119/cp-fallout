export interface Armor {
    ID: number;
    name: string;
    armor: {
        head: number,
        torso: number,
        arm_left: number,
        arm_right: number,
        leg_left: number,
        leg_right: number
    };
    aev: number;
    price: number;
}

export interface CharacterArmor extends Armor {
    currentArmor: {
        head: number,
        torso: number,
        arm_left: number,
        arm_right: number,
        leg_left: number,
        leg_right: number
    };
}