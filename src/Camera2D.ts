const { regClass, property } = Laya;

@regClass()
export class Camera2D extends Laya.Sprite {
    private target: Laya.Sprite;
    private rt: Laya.Texture;

    constructor(target: Laya.Sprite, x: number = 0, y: number = 0, width: number = 640, height: number = 360) {
        super();
        this.width = width;
        this.height = height;

        this.graphics.drawRect(x, y, width, height, '#fff');
        this.pos(x, y);
        this.target = target;

        this.updateCamera();
    }

    public updateCamera() {
        this.graphics.clear();
        
    }
}