export interface IMediator {
    register(client: IClient): void;
    notice(from: IClient, message: string): void;
}

export class Mediator implements IMediator {

    private clients: IClient[] = [];
    register(client: IClient): void {
        for (let i = 0; i < this.clients.length; i ++) {
            if (this.clients[i] === client) {
                return;
            }
        }
        this.clients.push(client);
    }

    notice(from: IClient, message: string): void {
        this.clients.forEach(c => {
            if (from !== c)
                c.receiveMessage(message);
        })
    }
}

export interface IClient {
    sendMessage(message: string): void;
    receiveMessage(message: string): void;
}

export class Client implements IClient {
    private mediator: IMediator;
    private name: string;

    constructor(mediator: IMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
    }

    sendMessage(message: string): void {
        console.log(this.name + ' 发送：' + message);
        this.mediator.notice(this, message);
    }

    receiveMessage(message: string): void {
        console.log(this.name + ' 接收：' + message);
    }
}