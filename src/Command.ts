import { ActorState, StandingState, State } from "./State_FSM";

export class Command {
    execute(actor: Actor) {
        actor.action();
    }

    undo() {

    }
}

export class MoveCommand extends Command {
    execute(actor: Actor): void {
        console.log('Move command');
        super.execute(actor);
    }
}

export class JumpCommand extends Command {
    execute(actor: Actor): void {
        console.log('Jump command');
        super.execute(actor);
    }
}

export class Actor {
    private x: number;
    private y: number;

    state: ActorState = new StandingState();

    public action() {
        console.log('游戏物体行为');
    }

    fire() {
        console.log('蓄能后的攻击波');
    }

    onKeyDown(evt: Laya.Event): void {
        this.state.onKeyDown(evt, this);
    }

    onUpdate(): void {
        this.state.onUpdate(this);
    }
}
