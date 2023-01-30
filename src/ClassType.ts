export class Breed {

    _health: number = 100;
    _attack: string = '攻击波';
    private _parent: Breed = null;

    constructor(parent?: Breed, health?: number, attack?: string) {
        if (parent != null) {
            this._parent = parent;

            this._health = parent._health;
            this._attack = parent._attack;
        }

        if (health) {
            this._health = health;
        }
        if (attack) {
            this._attack = attack;
        }
    }

    /**
     * 生成怪物的工厂函数
     * @param breed 怪物的种族
     */
    newMonster(): Monster {
        return new Monster(this);
    }
}

export class Monster {

    private _breed: Breed;

    constructor(breed: Breed) {
        this._breed = breed;
    }

    get health() {
        return this._breed._health;
    }

    get attack() {
        return this._breed._attack;
    }
}