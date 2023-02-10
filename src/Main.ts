import { Actor, Command, JumpCommand, MoveCommand } from "./Command";
import { A_Observer, B_Observer, MyEvent, Subject } from "./Observer";
import Event from "./Event";
import { State } from "./State_FSM";
import { Breed } from "./ClassType";
import { Client, Mediator } from "./Mediator";

import { MainUI } from "./MainUIRT";
import { Camera2D } from "./Camera2D";

const { regClass, property } = Laya;

@regClass()
export class Main extends Laya.Script {

    private actor: Actor; 
    private bus: Event;

    private _state: number = State.STATE_STANDING;
    /** 闪避后蓄能时间 */
    private time: number = 0;
    private static MAX_TIME = 1500;

    private ui: MainUI;

    private tiledMap: Laya.TiledMap;
    private viewport: Laya.Rectangle;
    private mapX: number = 0;
    private mapY: number = 0;

    private mLastMouseX: number;
    private mLastMouseY: number;


    @property()
    sceenCamera: Laya.Sprite;

    @property()
    player: Laya.Sprite;

    private initialUI() {
        this.ui = this.owner.scene as MainUI;
        this.ui.baseUI(this.ui);
    }

    onStart() {
        console.log('Game start');
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.handleKeyDown);
        // Laya.stage.focus = this.owner;

        // 命令模式
        this.actor = new Actor();

        // 观察者模式
        let ob_a = new A_Observer();
        let ob_b = new B_Observer();

        let sub = new Subject();
        sub.addObserver(ob_a);
        sub.addObserver(ob_b);
        sub.notifyAll(MyEvent.EVT_JUMP);

        sub.removeObserver(ob_a);
        sub.notifyAll(MyEvent.EVT_RUN);


        // 发布者-订阅者消息模式
        this.bus = Event.getInstance();
        this.bus.on('Jump', (data) => {
            console.log('Jump事件被触发: ' + data);
        })

        // 类型对象
        let none = new Breed();
        let Alice = none.newMonster();
        console.log('Alice:', Alice.health, Alice.attack);
        
        let goblin = new Breed(null, 50, '普通攻击');
        let Joe = goblin.newMonster();
        console.log('Joe:', Joe.health, Joe.attack);

        let goblinWizard = new Breed(goblin, 0, '火焰弹');
        let Yoh = goblinWizard.newMonster();
        console.log('Yoh:', Yoh.health, Yoh.attack);


        // 中介者模式 模拟聊天室
        let mediator = new Mediator();
        let clientA = new Client(mediator, 'clientA');
        let clientB = new Client(mediator, 'clientB');
        let clientC = new Client(mediator, 'clientC');

        mediator.register(clientA);
        mediator.register(clientB);
        mediator.register(clientC);

        clientA.sendMessage('ClientA enter');

        this.initialUI();


        // tiledMap
        this.tiledMap = new Laya.TiledMap();
        this.viewport = new Laya.Rectangle(0, 0, this.sceenCamera.width, this.sceenCamera.height);

        this.tiledMap.createMap('resources/tiledMap/level1.json', 
                                this.viewport,
                                Laya.Handler.create(this, this.onMapCreated),
                                null,
                                null,
                                true);
    }

    private moveViewport() {
        let moveX = this.mapX - (Laya.stage.mouseX - this.mLastMouseX);
        let moveY = this.mapY - (Laya.stage.mouseY - this.mLastMouseY);
        this.tiledMap.moveViewPort(moveX, moveY);
    }

    private onMapCreated() {
        let mapSprite = this.tiledMap.mapSprite();
        mapSprite.removeSelf();
        this.sceenCamera.addChild(mapSprite);
        mapSprite.zOrder = -1;

        // 想让地图居中显示的缩放因子
        // let scareFactor = Math.min(Laya.stage.width / this.tiledMap.width, Laya.stage.height / this.tiledMap.height);
        // scareFactor += 0.5;
        // tiledmap 居中
        // mapSprite.x = (Laya.stage.width - this.tiledMap.width * scareFactor) / 2;
        // mapSprite.y = (Laya.stage.height - this.tiledMap.height * scareFactor) / 2;

        // this.tiledMap.setViewPortPivotByScale(0.5, 0.5);
        // this.tiledMap.scale = scareFactor;
        // mapSprite.scale(scareFactor, scareFactor);

        // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, () => {
        //     this.mLastMouseX = Laya.stage.mouseX;
        //     this.mLastMouseY = Laya.stage.mouseY;
        //     Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.moveViewport)
        // })

        // Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
        //     this.mapX = this.mapX - (Laya.stage.mouseX - this.mLastMouseX);
        //     this.mapY = this.mapY - (Laya.stage.mouseY - this.mLastMouseY);
        //     Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.moveViewport);
        // })

        // 获取tilemap对象层
        let objectLayer = this.tiledMap.getLayerByName('entities');
        // 获取对象层玩家tile
        let playerGrid = objectLayer.getObjectByName('player');
        // 把grid相对于layer的本地坐标转为相对于stage的全局坐标
        let newPoint = objectLayer.localToGlobal(new Laya.Point(playerGrid.x, playerGrid.y));

        // map缩放中心以player为中心 目的是使玩家定位到viewport中心，而整个舞台就是一个viewport
        mapSprite.pivotX = playerGrid.x;
        mapSprite.pivotY = playerGrid.y;

        mapSprite.x = this.sceenCamera.width / 2;
        mapSprite.y = this.sceenCamera.height / 2;

        // 放大mapsprite
        mapSprite.scale(2, 2);

        let pos = new Laya.Point(playerGrid.x, playerGrid.y);
        // 先从相对于mapSprite转为全局坐标
        mapSprite.localToGlobal(pos);
        // 从全局坐标转为相对于screenCamera的局部坐标
        this.sceenCamera.globalToLocal(pos);

        // 玩家初始位置 相对于mapsprite
        this.player.x = pos.x;
        this.player.y = pos.y;

    }

    handleKeyDown(evt: Laya.Event): void {
        /*
        按键->状态
        if (evt.key.toLowerCase() === 'd') {
            let moveCmd: Command = new MoveCommand();
            moveCmd.execute(this.actor);
        }
        if (evt.key.toLowerCase() === ' ') {
            let jumpCmd: Command = new JumpCommand();
            jumpCmd.execute(this.actor);

            this.bus.emit('Jump', 'data');
        }
        */

        // 状态机
        // 状态->按键
        // switch(this._state) {
        //     case State.STATE_STANDING:
        //         if (evt.key.toLowerCase() === ' ') {
        //             this._state = State.STATE_JUMPING;
        //             console.log('站立->跳跃');

        //             Laya.timer.once(2000, this, () => {
        //                 this._state = State.STATE_STANDING;
        //                 console.log('跳跃->站立');
        //             })
        //         } else if (evt.key.toLowerCase() === 's') {
        //             // 再次闪避时，重置蓄能时间
        //             this.time = 0;
        //             this._state = State.STATE_DUCKING;
        //             console.log('站立->闪避');

        //             Laya.timer.once(2000, this, () => {
        //                 this._state = State.STATE_STANDING;
        //                 console.log('闪避->站立');
        //             })
        //         }
        //         break;
        //     case State.STATE_DUCKING:
                
        //         break;
        //     case State.STATE_JUMPING:
        //         if (evt.key.toLowerCase() === 's') {
        //             this._state = State.STATE_DIVING;
        //             console.log('跳跃->俯冲');
        //         }
        //         break;
        //     case State.STATE_DIVING:
                
        //         break;
        // }

        // 状态模式

        // this.actor.onKeyDown(evt);
    }

    onUpdate(): void {
        // this.camera.updateCamera();
        // this.actor.onUpdate();
        
    }

    private mLastX: number = 0;
    private mLastY: number = 0;
    onKeyPress(evt: Laya.Event): void {
        if (evt.key.toLowerCase() === 'w') {
            this.mLastY -= 2;

        } else if (evt.key.toLowerCase() === 's') {
            this.mLastY += 2;

        } else if (evt.key.toLowerCase() === 'a') {
           this.mLastX -= 2;

        } else if (evt.key.toLowerCase() === 'd') {
            this.mLastX += 2;

        }

        this.tiledMap.moveViewPort(this.mLastX, this.mLastY);
    }
}