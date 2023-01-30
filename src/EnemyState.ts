import Enemy from "./Enemy";
import Player from "./Player";
import { Vector } from "./Utils";

export class State {
    onUpdate(enemy: Enemy, player: Player) {

    }

    enter(enemy: Enemy): void {

    }

    exit(enemy: Enemy): void {

    }
}

export class PassiveState extends State {
    override onUpdate(enemy: Enemy, player: Player): void {
        const enemy_position = new Vector((enemy.owner as Laya.Sprite).x, (enemy.owner as Laya.Sprite).y);
        const player_position = new Vector((player.owner as Laya.Sprite).x, (player.owner as Laya.Sprite).y);

        if (enemy.health >= 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
            enemy.state = new ActiveState();
            enemy.state.enter(enemy);
        } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
            enemy.state = new DefensiveState();
            enemy.state.enter(enemy);
        }

    }

    /**
     * 根据概率决定ai做什么
     */
    do() {
        let randNum = Math.floor(Math.random() * 100);
        let dayTime = Math.floor(Math.random() * 2);

        switch(dayTime) {
            case DayTime.MorningTime:
                if (randNum < 3) {
                    console.log('巡逻');
                } else if (randNum < 10) {
                    console.log('吃饭');
                } else {
                    console.log('守卫');
                }
                break;
            case DayTime.AfterNoonTime:
                if (randNum < 20) {
                    console.log('走动');
                } else if (randNum < 32) {
                    console.log('吃饭');
                } else {
                    console.log('守卫');
                }
                break;
            case DayTime.NightTime:
                if (randNum < 25) {
                    console.log('走动');
                } else if (randNum < 40) {
                    console.log('吃饭');
                } else {
                    console.log('守卫');
                }
        }
    }
    
    enter(enemy: Enemy): void {
        console.log('进入被动默认状态');

        this.do();
    }
}

export class ActiveState extends State {
    onUpdate(enemy: Enemy, player: Player): void {
        const enemy_position = new Vector((enemy.owner as Laya.Sprite).x, (enemy.owner as Laya.Sprite).y);
        const player_position = new Vector((player.owner as Laya.Sprite).x, (player.owner as Laya.Sprite).y);

        if (enemy.health >= 80 && Vector.distance(enemy_position, player_position) >= enemy.scanDistance) {
            enemy.state = new PassiveState();
            enemy.state.enter(enemy);
        } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) < enemy.scanDistance) {
            enemy.state = new DefensiveState();
            enemy.state.enter(enemy);
        }

        this.follow(enemy, player);
    }

    enter(enemy: Enemy): void {
        console.log('进入攻击状态');
    }

    private follow(enemy: Enemy, player: Player) {
        Laya.Tween.to(enemy.owner, { x: (player.owner as Laya.Sprite).x, y: (player.owner as Laya.Sprite).y }, 1000);
    }
}

export class DefensiveState extends State {
    onUpdate(enemy: Enemy, player: Player): void {
        const enemy_position = new Vector((enemy.owner as Laya.Sprite).x, (enemy.owner as Laya.Sprite).y);
        const player_position = new Vector((player.owner as Laya.Sprite).x, (player.owner as Laya.Sprite).y);

        if (Vector.distance(enemy_position, player_position) >= enemy.scanDistance) {
            enemy.state = new PassiveState();
            enemy.state.enter(enemy);
        } else if (enemy.health < 80) {
            enemy.state = new ActiveState();
            enemy.state.enter(enemy);
        }
    }

    enter(enemy: Enemy): void {
        console.log('进入防御状态');
    }
}

enum DayTime {
    MorningTime,
    AfterNoonTime,
    NightTime
}