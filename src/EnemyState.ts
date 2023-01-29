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
        }
    }

    enter(enemy: Enemy): void {
        console.log('进入被动状态');
    }
}

export class ActiveState extends State {
    onUpdate(enemy: Enemy, player: Player): void {
        const enemy_position = new Vector((enemy.owner as Laya.Sprite).x, (enemy.owner as Laya.Sprite).y);
        const player_position = new Vector((player.owner as Laya.Sprite).x, (player.owner as Laya.Sprite).y);

        if (Vector.distance(enemy_position, player_position) > enemy.scanDistance) {
            enemy.state = new PassiveState();
            enemy.state.enter(enemy);
        } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
            enemy.state = new DefensiveState();
        }
    }

    enter(enemy: Enemy): void {
        console.log('进入攻击状态');
    }
}

export class DefensiveState extends State {
    onUpdate(enemy: Enemy, player: Player): void {
        console.log('防御玩家攻击');
    }
}