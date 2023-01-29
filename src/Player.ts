const { regClass, property } = Laya;

@regClass()
export default class Player extends Laya.Script {

    private self: Laya.Sprite;
    private rgBody: Laya.RigidBody;

    @property()
    speed: number;

    onAwake(): void {
        Laya.stage.focus = this.owner;
        this.self = this.owner as Laya.Sprite;
        this.rgBody = this.self.getComponent(Laya.RigidBody);
    }

    onKeyDown(evt: Laya.Event): void {
        if (evt.key.toLowerCase() === 'w') {
            this.rgBody.setVelocity({ x: 0, y: -this.speed });
        } else if (evt.key.toLowerCase() === 's') {
            this.rgBody.setVelocity({ x: 0, y: this.speed });
        } else if (evt.key.toLowerCase() === 'a') {
            this.rgBody.setVelocity({ x: -this.speed, y: 0 });
        } else if (evt.key.toLowerCase() === 'd') {
            this.rgBody.setVelocity({ x: this.speed, y: 0 });
        } 
    }
}