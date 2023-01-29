import { PassiveState, State } from "./EnemyState";
import Player from "./Player";
const { regClass, property } = Laya;

@regClass()
export default class Enemy extends Laya.Script {
    public health: number = 100;
    public state: State = new PassiveState();
    public scanDistance: number = 200;

    @property()
    player: Laya.Sprite;

    override onEnable(): void {
        
    }

    override onUpdate(): void {
        this.state.onUpdate(this, this.player.getComponent(Laya.Script) as Player);
    }
}