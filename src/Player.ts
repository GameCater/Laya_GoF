import Bullet from "./Bullet";

const { regClass, property } = Laya;

@regClass()
export default class Player extends Laya.Script {

    private self: Laya.Sprite;
    private rgBody: Laya.RigidBody;

    @property()
    speed: number;

    @property()
    bulletPrefab: Laya.Prefab;

    private direction: number[] = [0, 1];

    onAwake(): void {
        Laya.stage.focus = this.owner;
        this.self = this.owner as Laya.Sprite;
        this.rgBody = this.self.getComponent(Laya.RigidBody);
    }

    onKeyPress(evt: Laya.Event): void {
        if (evt.key.toLowerCase() === 'w') {
            this.rgBody.setVelocity({ x: 0, y: -this.speed });
            this.direction = [0, -1];

        } else if (evt.key.toLowerCase() === 's') {
            this.rgBody.setVelocity({ x: 0, y: this.speed });
            this.direction = [0, 1];

        } else if (evt.key.toLowerCase() === 'a') {
            this.rgBody.setVelocity({ x: -this.speed, y: 0 });
            this.direction = [-1, 0];

        } else if (evt.key.toLowerCase() === 'd') {
            this.rgBody.setVelocity({ x: this.speed, y: 0 });
            this.direction = [1, 0];

        } 
    }

    onKeyDown(evt: Laya.Event): void {
        if (evt.key.toLowerCase() === ' ') {
            // 发射子弹
            // let bullet: Laya.Sprite = this.bulletPrefab.create() as Laya.Sprite;

            let bullet: Laya.Sprite = Laya.Pool.getItemByCreateFun('Bullet', this.spawnBullet, this);
            
            this.self.parent.addChild(bullet);

            bullet.x = (this.self.width - bullet.width) / 2 + this.self.x + bullet.width / 2;
            bullet.y = (this.self.height - bullet.height) / 2 + this.self.y + bullet.height / 2;

            (bullet.getComponent(Laya.Script) as Bullet).isDestoryed = false;
            
            if (this.direction[0] !== 0) {
                bullet.rotation = 0;
            } else if (this.direction[1]) {
                bullet.rotation = 90;
            }

            (bullet.getComponent(Laya.Script) as Bullet).move(this.direction.map(d => d * 10));
        }
    }

    private spawnBullet() {
        console.log('bullet created');
        let bullet: Laya.Sprite = this.bulletPrefab.create() as Laya.Sprite;
        return bullet;
    }

    onKeyUp(evt: Laya.Event): void {
        this.rgBody.setVelocity({ x: 0, y: 0 });
    }
}