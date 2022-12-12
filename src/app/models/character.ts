export class Character {
    id: number;
    general: {
        name: string,
        age: number,
        caps: number,
        radiation: number
    };
    attributes: {
        strength: number,
        perception: number,
        endurance: number,
        charisma: number,
        intelligence: number,
        agility: number,
        luck: number
    };
    skills: number[]
}
