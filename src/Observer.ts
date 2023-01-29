export class Observer {
    name: string = 'observer';
    public onNotified(sub: Subject, event: string): void {
        console.log(this.name);
        // switch(event) {
        //     case MyEvent.EVT_JUMP: 
        //         console.log('跳跃事件');
        //         break;
        //     case MyEvent.EVT_RUN:
        //         console.log('奔跑事件');
        //         break;
        //     default:
        //         console.log('其他未知事件');
        // }
    }
}

export class Subject {
    private observers: Observer[] = [];
    name: string = 'Subject';

    addObserver(ob: Observer) {
        console.log('添加新观察者' + ob.name);
        this.observers.push(ob);
    }

    removeObserver(ob: Observer) {
        console.log('移除观察者' + ob.name);
        let idx = -1;
        for (let i = 0; i < this.observers.length; i ++) {
            if (ob.name === this.observers[i].name) {
                idx = i;
                break;
            }
        }
        this.observers.splice(idx, 1);
    }

    notifyAll(evt: string): void {
        for (let ob of this.observers) {
            (ob as Observer).onNotified(this, evt);
        }
    }
}

export enum MyEvent {
    'EVT_JUMP'= 'jump',
    'EVT_RUN'= 'run',
}

export class A_Observer extends Observer {
    name: string = 'A';
    override onNotified(sub: Subject, event: string): void {
        super.onNotified(sub, event);
        switch(event) {
            case MyEvent.EVT_JUMP:
                console.log('解锁跳跃成就');
                break;
            case MyEvent.EVT_RUN:
                console.log('解锁奔跑成就');
                break;
        }
    }
}

export class B_Observer extends Observer {
    name: string = 'B';
    override onNotified(sub: Subject, event: string): void {
        super.onNotified(sub, event);
        switch(event) {
            case MyEvent.EVT_JUMP:
                console.log('播放跳跃音效');
                break;
            case MyEvent.EVT_RUN:
                console.log('播放奔跑音效');
                break;
        }
    }
}