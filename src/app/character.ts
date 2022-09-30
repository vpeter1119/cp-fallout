export class Character {
    id: number;
    name: string;
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
