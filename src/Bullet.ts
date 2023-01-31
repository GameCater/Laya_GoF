const { regClass } = Laya;

@regClass()
export default class Bullet extends Laya.Script {
    
    private self: Laya.Sprite;
    private time: number = 1000;
    private curTime: number = 0;
    isDestoryed: boolean = false;
    private damage: number = 5;

    private rgBody: Laya.RigidBody;

    override onAwake(): void {
        this.self = this.owner as Laya.Sprite;
        this.rgBody = this.self.getComponent(Laya.RigidBody);
    }

    onUpdate(): void {
        if (this.isDestoryed) return;

        this.curTime += Laya.timer.delta;
        if (this.curTime > this.time) {
            this.destroySelf();
        } 
    }

    destroySelf(): void {

        this.curTime = 0;
        this.isDestoryed = true;
        this.rgBody.setVelocity({ x: 0, y: 0 });
        this.self.removeSelf();
        Laya.Pool.recover('Bullet', this.self);
    }

    move(direction: number[]) {
        if (!this.isDestoryed && this.curTime < this.time) {
            this.rgBody.setVelocity({ x: direction[0], y: direction[1] });
        }
    }

    onTriggerEnter(other: Laya.PhysicsComponent | Laya.ColliderBase): void {
        if (other.owner.name === 'Enemy') {
            this.destroySelf();

            other.owner.event('Damage', this.damage);
        }
    }

    onDestroy(): void {
        super.destroy();
    }
}