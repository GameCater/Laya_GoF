export default class Event {
    private listeners: { [propname: string]: Listener[] } = {};
    private static instance: Event;

    private constructor() {}

    // 单例模式
    static getInstance(): Event {
        if (!Event.instance) {
            Event.instance = new Event();
        }
        return Event.instance;
    }

    on(event: string, listener: Listener): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        } 
        this.listeners[event].push(listener);
    }

    emit(event: string, data: any): void {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach(c => {
                c(data);
            });
        } 
    }

}

/**
 * 识别是否是事件中心注册的回调函数
 */
export interface Listener {
    (data: any): void;
}