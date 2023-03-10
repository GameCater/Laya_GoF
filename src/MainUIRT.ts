import Enemy from "./Enemy";
import { MainUIRTBase } from "./MainUIRT.generated";

const { regClass, property } = Laya;

@regClass()
export class MainUI extends MainUIRTBase {

    private prefabUrls: string[] = [
        'Enemy.lh',
        'EnemyPro.lh',
    ];

    constructor() {
        super();
    }

    public baseUI(ui: Laya.Scene) {
        this.list_enemies.array = this.prefabUrls;
        this.list_enemies.itemRender = ListItem;
        this.list_enemies.vScrollBarSkin = '';

        this.list_enemies.renderHandler = Laya.Handler.create(this, (cell: ListItem) => {
            cell.init(this.Player);
        }, null, false);
    }   
}

class ListItem extends Laya.Box {
    private enemyPrefabUrl: string;
    // 个体模板
    private child: Laya.Sprite;
    // 需要放置的个体
    private copied: Laya.Sprite;

    private dragRegion: Laya.Rectangle = new Laya.Rectangle(0, 0, Laya.stage.width - 200, Laya.stage.height);

    private storeX: number;
    private storeY: number;

    private XTouch: number;
    private YTouch: number;

    private player: Laya.Sprite;

    set dataSource(data: string) {
        this.enemyPrefabUrl = data;
    }

    constructor() {
        super();
        this.width = 144;
        this.height = 144;
        this.left = 28;
        this.bgColor = '#eee';
        
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {

            // e.stageX
            // 拷贝对象跟随鼠标移动
            if (this.copied) {
                let x = Laya.stage.mouseX;
                let y = Laya.stage.mouseY;

                this.copied.pos(x, y);        
            }
            
        })
    }

    init(player: Laya.Sprite) {
        
        // 取得游戏舞台中的玩家
        this.player = player;
        
        Laya.loader.load(`resources/${this.enemyPrefabUrl}`).then((res: Laya.Prefab) => {
            let enemy = res.create() as Laya.View;
            enemy.left = this.width - enemy.width >> 1;
            enemy.top = this.height - enemy.height >> 1;
            this.child = enemy;
            this.addChild(enemy);

            this.child.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                this.handleMouseDown(e, res);
            });
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.handleMouseUp);
        })
    }

    /**
     * 松开时取消创建新的敌人
     * @returns 
     */
    handleMouseUp() {
        if (!this.copied) return;

        // this.copied.destroy();
        (this.copied.getComponent(Laya.Script) as Enemy).player = this.player;
        this.copied = null;
    }

    handleMouseDown(e: Laya.Event, data: any) {     
        if (this.copied) return;
        
        this.copyTarget(e, data);
    }

    /**
     * 拷贝一份
     */
    copyTarget(e: Laya.Event, res: Laya.Prefab) {
        if (this.copied) return;
         
        let copied = (res.create() as Laya.View).getChildAt(0) as Laya.Sprite;
        copied.x = Laya.stage.mouseX - 10;
        copied.y = Laya.stage.mouseY - 10;

        this.copied = copied;
        Laya.stage.addChild(this.copied);
    }

    onDestroy(): void {
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.handleMouseUp);
        if (this.child) {
            // this.child.off(Laya.Event.MOUSE_DOWN, this, this.onStartDrag);
        }
        super.destroy();
    }
}