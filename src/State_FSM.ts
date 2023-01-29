import { Actor } from "./Command";

export enum State {
    STATE_STANDING,
    STATE_JUMPING,
    STATE_DUCKING,
    STATE_DIVING
}

// 状态模式
export class ActorState {
    onKeyDown(evt: Laya.Event, actor: Actor): void {
        
    }

    onUpdate(actor: Actor): void {
        
    }

    enter(actor: Actor): void {

    }

    exit(actor: Actor): void {

    }
}

export class StandingState extends ActorState {

    onKeyDown(evt: Laya.Event, actor: Actor): void {
        if (evt.key.toLowerCase() === ' ') {
            actor.state = new JumpingState();
            console.log('站立->跳跃');

            actor.state.exit(actor);

        } else if (evt.key.toLowerCase() === 's') {
            actor.state = new DuckingState();
            console.log('站立->闪避');

            actor.state.exit(actor);
            
        }
    }

    enter(): void {
        // 处理sprite切换等其他行为
    }

    exit(): void {

    }
}

export class JumpingState extends ActorState {
    onKeyDown(evt: Laya.Event, actor: Actor): void {
        if (evt.key.toLowerCase() === 's') {
            actor.state = new DivingState();
            console.log('跳跃->俯冲');
        }
    }

    override exit(actor: Actor): void {
        Laya.timer.once(2000, this, () => {
            actor.state = new StandingState();
            console.log('跳跃->站立');
        })
    }
}

export class DuckingState extends ActorState {

    private time: number = 0;
    private MAX_TIME = 1500;

    override onUpdate(actor: Actor): void {
        this.time += Laya.timer.delta;
        if (this.time > this.MAX_TIME) {
            actor.fire();
            this.time = 0;
        }
    }

    override exit(actor: Actor): void {
        Laya.timer.once(2000, this, () => {
            actor.state = new StandingState();
            console.log('闪避->站立');
        })
    }

}

export class DivingState extends ActorState {

}