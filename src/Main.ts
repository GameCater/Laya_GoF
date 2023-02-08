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
        // let tiledmap = new Laya.TiledMap().createMap('resources/tiledMap/orthogonal-outside.json', new Laya.Rectangle(), Laya.Handler.create(this, () => {
        //     Laya.stage.addChild((tiledmap as unknown as Laya.TiledMap).mapSprite());
        // }))

        this.tiledMap = new Laya.TiledMap();
        // this.tiledMap.createMap('resources/tiledMap/orthogonal-outside.json', new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Laya.Handler.create(this, this.onMapCreated));

        this.tiledMap.createMap('resources/tiledMap/level1.json', 
                                new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height), 
                                Laya.Handler.create(this, this.onMapCreated),
                                null,
                                null,
                                true);

        let player = this.owner.getChildByName('Player') as Laya.Sprite;  
        this.camera = new Camera2D(player);
        Laya.stage.addChild(this.camera);
    }

    private camera: Camera2D;

    private onMapCreated() {
        let mapSprite = this.tiledMap.mapSprite();
        mapSprite.removeSelf();
        mapSprite.zOrder = -1;
        Laya.stage.addChild(mapSprite);

        let scareFactor = Math.min(Laya.stage.width / this.tiledMap.width, Laya.stage.height / this.tiledMap.height);
        this.tiledMap.setViewPortPivotByScale(0, 0);
        this.tiledMap.scale = scareFactor;
        // mapSprite.scale(scareFactor, scareFactor);
        mapSprite.x = (Laya.stage.width - this.tiledMap.width * scareFactor) / 2;
        

        let objectLayer = this.tiledMap.getLayerByName('entities');
        let playerGrid = objectLayer.getObjectByName('player');
        let newSprite = new Laya.Sprite();
        newSprite.size(50, 50);
        // 把grid相对于layer的本地坐标转为相对于stage的全局坐标
        let newPoint = objectLayer.localToGlobal(new Laya.Point(playerGrid.x, playerGrid.y));
        newSprite.pos(newPoint.x, newPoint.y)
        newSprite.graphics.drawRect(0, 0, 50, 50, '#eee');
        Laya.stage.addChild(newSprite);

        // 为newSprite(player)添加碰撞
        let rgBody: Laya.RigidBody = newSprite.addComponent(Laya.RigidBody);
        let boxColl: Laya.BoxCollider = newSprite.addComponent(Laya.BoxCollider);
        boxColl.width = newSprite.width;
        boxColl.height = newSprite.height;

        // 为碰撞层所有grid添加碰撞体
        let collisionLayer: Laya.MapLayer = this.tiledMap.getLayerByName('collision');
        console.log(collisionLayer);
        for (let i = 0; i < collisionLayer.numChildren; i ++) {
            let gridSprite: Laya.GridSprite = collisionLayer.getChildAt(i) as Laya.GridSprite;
            let gridArea = gridSprite.getBounds();
            let cols = gridArea.width / this.tiledMap.tileWidth;
            let rows = gridArea.height / this.tiledMap.tileHeight;

            
        }
        

        
        

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
        this.actor.onUpdate();
    }
}