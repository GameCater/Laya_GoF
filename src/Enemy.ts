import { PassiveState, State } from "./EnemyState";
import Player from "./Player";
const { regClass, property } = Laya;

@regClass()
export default class Enemy extends Laya.Script {
    public health: number = 100;
    // public state: State = new PassiveState();
    public scanDistance: number = 200;

    @property()
    player: Laya.Sprite;

    private animator: Laya.Animator2D;

    onAwake() {
        this.animator = this.owner.getComponent(Laya.Animator2D);
    }

    override onEnable(): void {
        this.owner.on('Damage', this, this.handleDamage);

        this.health = 100;
        // this.state = new PassiveState();
        this.animator.setParamsBool('Death', false);
    }

    private handleDamage(damage: number) {
        
        this.health -= damage;
        if (this.health < 0) {
            // todo 死亡动画的延迟显示
            this.animator.setParamsBool('Death', true);

            this.owner.removeSelf();
            Laya.Pool.recover('Enemy', this.owner);

            Laya.timer.once(2000, this, () => {
                let newEnemy = Laya.Pool.getItem('Enemy') as Laya.Sprite;
                newEnemy.pos(Math.random() * Laya.stage.width, Math.random() * Laya.stage.height);
                Laya.stage.addChild(newEnemy);
            });
        }
    }

    override onUpdate(): void {
        if (this.player) {
            // this.state.onUpdate(this, this.player.getComponent(Laya.Script) as Player);
        }
    }
}
