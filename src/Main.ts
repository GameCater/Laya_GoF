import { Actor, Command, JumpCommand, MoveCommand } from "./Command";
import { A_Observer, B_Observer, MyEvent, Subject } from "./Observer";
import Event from "./Event";
import { State } from "./State_FSM";
import { Breed } from "./ClassType";
import { Client, Mediator } from "./Mediator";

import { MainUI } from "./MainUIRT";

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
        this.actor.onUpdate();
    }
}