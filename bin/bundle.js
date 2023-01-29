
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (let i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(k, v);
    }
}

var _regClass = window._regClass;
var _dummyRegClass = Laya.regClass();
function __$decorate(assetId, codePath) {
    return function(...args) {
        let i = args[0].indexOf(_dummyRegClass);
        if (i != -1) {
            if (_regClass)
                args[0][i] = _regClass(assetId, codePath);
            else
                args[0][i] = function(constructor) { Laya.ClassUtils.regClass(assetId, constructor); };
        }
        return __decorate(...args);
    }
}

(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Utils.ts
  var Vector = class {
    constructor(x, y) {
      this.x = 0;
      this.y = 0;
      this.x = x;
      this.y = y;
    }
    static distance(vec1, vec2) {
      return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }
  };
  __name(Vector, "Vector");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/EnemyState.ts
  var State = class {
    onUpdate(enemy, player) {
    }
    enter(enemy) {
    }
    exit(enemy) {
    }
  };
  __name(State, "State");
  var PassiveState = class extends State {
    onUpdate(enemy, player) {
      const enemy_position = new Vector(enemy.owner.x, enemy.owner.y);
      const player_position = new Vector(player.owner.x, player.owner.y);
      if (enemy.health >= 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
        enemy.state = new ActiveState();
        enemy.state.enter(enemy);
      } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
        enemy.state = new DefensiveState();
      }
    }
    enter(enemy) {
      console.log("\u8FDB\u5165\u88AB\u52A8\u72B6\u6001");
    }
  };
  __name(PassiveState, "PassiveState");
  var ActiveState = class extends State {
    onUpdate(enemy, player) {
      const enemy_position = new Vector(enemy.owner.x, enemy.owner.y);
      const player_position = new Vector(player.owner.x, player.owner.y);
      if (Vector.distance(enemy_position, player_position) > enemy.scanDistance) {
        enemy.state = new PassiveState();
        enemy.state.enter(enemy);
      } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) <= enemy.scanDistance) {
        enemy.state = new DefensiveState();
      }
    }
    enter(enemy) {
      console.log("\u8FDB\u5165\u653B\u51FB\u72B6\u6001");
    }
  };
  __name(ActiveState, "ActiveState");
  var DefensiveState = class extends State {
    onUpdate(enemy, player) {
      console.log("\u9632\u5FA1\u73A9\u5BB6\u653B\u51FB");
    }
  };
  __name(DefensiveState, "DefensiveState");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Enemy.ts
  var __decorate = __$decorate("12843c7a-55a3-4124-bf12-0e47353d5c5a", "../src/Enemy.ts");
  var _a;
  var { regClass, property } = Laya;
  var Enemy = /* @__PURE__ */ __name(class Enemy2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.health = 100;
      this.state = new PassiveState();
      this.scanDistance = 200;
    }
    onEnable() {
    }
    onUpdate() {
      this.state.onUpdate(this, this.player.getComponent(Laya.Script));
    }
  }, "Enemy");
  __decorate([
    property(),
    __metadata("design:type", typeof (_a = typeof Laya !== "undefined" && Laya.Sprite) === "function" ? _a : Object)
  ], Enemy.prototype, "player", void 0);
  Enemy = __decorate([
    regClass()
  ], Enemy);

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/State_FSM.ts
  var ActorState = class {
    onKeyDown(evt, actor) {
    }
    onUpdate(actor) {
    }
    enter(actor) {
    }
    exit(actor) {
    }
  };
  __name(ActorState, "ActorState");
  var StandingState = class extends ActorState {
    onKeyDown(evt, actor) {
      if (evt.key.toLowerCase() === " ") {
        actor.state = new JumpingState();
        console.log("\u7AD9\u7ACB->\u8DF3\u8DC3");
        actor.state.exit(actor);
      } else if (evt.key.toLowerCase() === "s") {
        actor.state = new DuckingState();
        console.log("\u7AD9\u7ACB->\u95EA\u907F");
        actor.state.exit(actor);
      }
    }
    enter() {
    }
    exit() {
    }
  };
  __name(StandingState, "StandingState");
  var JumpingState = class extends ActorState {
    onKeyDown(evt, actor) {
      if (evt.key.toLowerCase() === "s") {
        actor.state = new DivingState();
        console.log("\u8DF3\u8DC3->\u4FEF\u51B2");
      }
    }
    exit(actor) {
      Laya.timer.once(2e3, this, () => {
        actor.state = new StandingState();
        console.log("\u8DF3\u8DC3->\u7AD9\u7ACB");
      });
    }
  };
  __name(JumpingState, "JumpingState");
  var DuckingState = class extends ActorState {
    constructor() {
      super(...arguments);
      this.time = 0;
      this.MAX_TIME = 1500;
    }
    onUpdate(actor) {
      this.time += Laya.timer.delta;
      if (this.time > this.MAX_TIME) {
        actor.fire();
        this.time = 0;
      }
    }
    exit(actor) {
      Laya.timer.once(2e3, this, () => {
        actor.state = new StandingState();
        console.log("\u95EA\u907F->\u7AD9\u7ACB");
      });
    }
  };
  __name(DuckingState, "DuckingState");
  var DivingState = class extends ActorState {
  };
  __name(DivingState, "DivingState");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Command.ts
  var Actor = class {
    constructor() {
      this.state = new StandingState();
    }
    action() {
      console.log("\u6E38\u620F\u7269\u4F53\u884C\u4E3A");
    }
    fire() {
      console.log("\u84C4\u80FD\u540E\u7684\u653B\u51FB\u6CE2");
    }
    onKeyDown(evt) {
      this.state.onKeyDown(evt, this);
    }
    onUpdate() {
      this.state.onUpdate(this);
    }
  };
  __name(Actor, "Actor");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Observer.ts
  var Observer = class {
    constructor() {
      this.name = "observer";
    }
    onNotified(sub, event) {
      console.log(this.name);
    }
  };
  __name(Observer, "Observer");
  var Subject = class {
    constructor() {
      this.observers = [];
      this.name = "Subject";
    }
    addObserver(ob) {
      console.log("\u6DFB\u52A0\u65B0\u89C2\u5BDF\u8005" + ob.name);
      this.observers.push(ob);
    }
    removeObserver(ob) {
      console.log("\u79FB\u9664\u89C2\u5BDF\u8005" + ob.name);
      let idx = -1;
      for (let i = 0; i < this.observers.length; i++) {
        if (ob.name === this.observers[i].name) {
          idx = i;
          break;
        }
      }
      this.observers.splice(idx, 1);
    }
    notifyAll(evt) {
      for (let ob of this.observers) {
        ob.onNotified(this, evt);
      }
    }
  };
  __name(Subject, "Subject");
  var A_Observer = class extends Observer {
    constructor() {
      super(...arguments);
      this.name = "A";
    }
    onNotified(sub, event) {
      super.onNotified(sub, event);
      switch (event) {
        case "jump" /* EVT_JUMP */:
          console.log("\u89E3\u9501\u8DF3\u8DC3\u6210\u5C31");
          break;
        case "run" /* EVT_RUN */:
          console.log("\u89E3\u9501\u5954\u8DD1\u6210\u5C31");
          break;
      }
    }
  };
  __name(A_Observer, "A_Observer");
  var B_Observer = class extends Observer {
    constructor() {
      super(...arguments);
      this.name = "B";
    }
    onNotified(sub, event) {
      super.onNotified(sub, event);
      switch (event) {
        case "jump" /* EVT_JUMP */:
          console.log("\u64AD\u653E\u8DF3\u8DC3\u97F3\u6548");
          break;
        case "run" /* EVT_RUN */:
          console.log("\u64AD\u653E\u5954\u8DD1\u97F3\u6548");
          break;
      }
    }
  };
  __name(B_Observer, "B_Observer");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Event.ts
  var Event = class {
    constructor() {
      this.listeners = {};
    }
    static getInstance() {
      if (!Event.instance) {
        Event.instance = new Event();
      }
      return Event.instance;
    }
    on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
    emit(event, data) {
      const callbacks = this.listeners[event];
      if (callbacks) {
        callbacks.forEach((c) => {
          c(data);
        });
      }
    }
  };
  __name(Event, "Event");

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Main.ts
  var __decorate2 = __$decorate("7bad1742-6eed-4d8d-81c0-501dc5bf03d6", "../src/Main.ts");
  var { regClass: regClass2, property: property2 } = Laya;
  var Main = /* @__PURE__ */ __name(class Main2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this._state = 0 /* STATE_STANDING */;
      this.time = 0;
    }
    onStart() {
      console.log("Game start");
      Laya.stage.on(Laya.Event.KEY_DOWN, this, this.handleKeyDown);
      this.actor = new Actor();
      let ob_a = new A_Observer();
      let ob_b = new B_Observer();
      let sub = new Subject();
      sub.addObserver(ob_a);
      sub.addObserver(ob_b);
      sub.notifyAll("jump" /* EVT_JUMP */);
      sub.removeObserver(ob_a);
      sub.notifyAll("run" /* EVT_RUN */);
      this.bus = Event.getInstance();
      this.bus.on("Jump", (data) => {
        console.log("Jump\u4E8B\u4EF6\u88AB\u89E6\u53D1: " + data);
      });
    }
    handleKeyDown(evt) {
      this.actor.onKeyDown(evt);
    }
    onUpdate() {
      this.actor.onUpdate();
    }
  }, "Main");
  Main.MAX_TIME = 1500;
  Main = __decorate2([
    regClass2()
  ], Main);

  // ../../../../../Document/Project/LayaAir/LayaAir3/Laya_GoF/src/Player.ts
  var __decorate3 = __$decorate("a51a9993-7212-4529-af9d-4d56a3c8a7a3", "../src/Player.ts");
  var { regClass: regClass3, property: property3 } = Laya;
  var Player = /* @__PURE__ */ __name(class Player2 extends Laya.Script {
    onAwake() {
      Laya.stage.focus = this.owner;
      this.self = this.owner;
      this.rgBody = this.self.getComponent(Laya.RigidBody);
    }
    onKeyDown(evt) {
      if (evt.key.toLowerCase() === "w") {
        this.rgBody.setVelocity({ x: 0, y: -this.speed });
      } else if (evt.key.toLowerCase() === "s") {
        this.rgBody.setVelocity({ x: 0, y: this.speed });
      } else if (evt.key.toLowerCase() === "a") {
        this.rgBody.setVelocity({ x: -this.speed, y: 0 });
      } else if (evt.key.toLowerCase() === "d") {
        this.rgBody.setVelocity({ x: this.speed, y: 0 });
      }
    }
  }, "Player");
  __decorate3([
    property3(),
    __metadata("design:type", Number)
  ], Player.prototype, "speed", void 0);
  Player = __decorate3([
    regClass3()
  ], Player);
})();
//# sourceMappingURL=bundle.js.map