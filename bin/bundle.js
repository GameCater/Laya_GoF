
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

  // E:/projects/laya3/Laya_GoF/src/Bullet.ts
  var __decorate = __$decorate("8f172430-d004-4d82-b2d3-3485a7f5e6eb", "../src/Bullet.ts");
  var { regClass } = Laya;
  var Bullet = /* @__PURE__ */ __name(class Bullet2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.time = 1e3;
      this.curTime = 0;
      this.isDestoryed = false;
      this.damage = 5;
    }
    onAwake() {
      this.self = this.owner;
      this.rgBody = this.self.getComponent(Laya.RigidBody);
    }
    onUpdate() {
      if (this.isDestoryed)
        return;
      this.curTime += Laya.timer.delta;
      if (this.curTime > this.time) {
        this.destroySelf();
      }
    }
    destroySelf() {
      this.curTime = 0;
      this.isDestoryed = true;
      this.rgBody.setVelocity({ x: 0, y: 0 });
      this.self.removeSelf();
      Laya.Pool.recover("Bullet", this.self);
    }
    move(direction) {
      if (!this.isDestoryed && this.curTime < this.time) {
        this.rgBody.setVelocity({ x: direction[0], y: direction[1] });
      }
    }
    onTriggerEnter(other) {
      if (other.owner.name === "Enemy") {
        this.destroySelf();
        other.owner.event("Damage", this.damage);
      }
    }
    onDestroy() {
      super.destroy();
    }
  }, "Bullet");
  Bullet = __decorate([
    regClass()
  ], Bullet);

  // E:/projects/laya3/Laya_GoF/src/Camera2D.ts
  var __decorate2 = __$decorate("a3874742-8b74-4d07-8883-4756f44fcb18", "../src/Camera2D.ts");
  var _a;
  var { regClass: regClass2, property } = Laya;
  var Camera2D = /* @__PURE__ */ __name(class Camera2D2 extends Laya.Sprite {
    constructor(target, x = 0, y = 0, width = 640, height = 360) {
      super();
      this.width = width;
      this.height = height;
      this.graphics.drawRect(x, y, width, height, "#fff");
      this.pos(x, y);
      this.target = target;
      this.updateCamera();
    }
    updateCamera() {
      this.graphics.clear();
    }
  }, "Camera2D");
  Camera2D = __decorate2([
    regClass2(),
    __metadata("design:paramtypes", [typeof (_a = typeof Laya !== "undefined" && Laya.Sprite) === "function" ? _a : Object, Number, Number, Number, Number])
  ], Camera2D);

  // E:/projects/laya3/Laya_GoF/src/Utils.ts
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

  // E:/projects/laya3/Laya_GoF/src/EnemyState.ts
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
        enemy.state.enter(enemy);
      }
    }
    do() {
      let randNum = Math.floor(Math.random() * 100);
      let dayTime = Math.floor(Math.random() * 2);
      switch (dayTime) {
        case DayTime.MorningTime:
          if (randNum < 3) {
            console.log("\u5DE1\u903B");
          } else if (randNum < 10) {
            console.log("\u5403\u996D");
          } else {
            console.log("\u5B88\u536B");
          }
          break;
        case DayTime.AfterNoonTime:
          if (randNum < 20) {
            console.log("\u8D70\u52A8");
          } else if (randNum < 32) {
            console.log("\u5403\u996D");
          } else {
            console.log("\u5B88\u536B");
          }
          break;
        case DayTime.NightTime:
          if (randNum < 25) {
            console.log("\u8D70\u52A8");
          } else if (randNum < 40) {
            console.log("\u5403\u996D");
          } else {
            console.log("\u5B88\u536B");
          }
      }
    }
    enter(enemy) {
      console.log("\u8FDB\u5165\u88AB\u52A8\u9ED8\u8BA4\u72B6\u6001");
      this.do();
    }
  };
  __name(PassiveState, "PassiveState");
  var ActiveState = class extends State {
    onUpdate(enemy, player) {
      const enemy_position = new Vector(enemy.owner.x, enemy.owner.y);
      const player_position = new Vector(player.owner.x, player.owner.y);
      if (enemy.health >= 80 && Vector.distance(enemy_position, player_position) >= enemy.scanDistance) {
        enemy.state = new PassiveState();
        enemy.state.enter(enemy);
      } else if (enemy.health < 80 && Vector.distance(enemy_position, player_position) < enemy.scanDistance) {
        enemy.state = new DefensiveState();
        enemy.state.enter(enemy);
      }
      this.follow(enemy, player);
    }
    enter(enemy) {
      console.log("\u8FDB\u5165\u653B\u51FB\u72B6\u6001");
    }
    follow(enemy, player) {
      Laya.Tween.to(enemy.owner, { x: player.owner.x, y: player.owner.y }, 1e3);
    }
  };
  __name(ActiveState, "ActiveState");
  var DefensiveState = class extends State {
    onUpdate(enemy, player) {
      const enemy_position = new Vector(enemy.owner.x, enemy.owner.y);
      const player_position = new Vector(player.owner.x, player.owner.y);
      if (Vector.distance(enemy_position, player_position) >= enemy.scanDistance) {
        enemy.state = new PassiveState();
        enemy.state.enter(enemy);
      } else if (enemy.health >= 80) {
        enemy.state = new ActiveState();
        enemy.state.enter(enemy);
      }
    }
    enter(enemy) {
      console.log("\u8FDB\u5165\u9632\u5FA1\u72B6\u6001");
    }
  };
  __name(DefensiveState, "DefensiveState");
  var DayTime = /* @__PURE__ */ ((DayTime2) => {
    DayTime2[DayTime2["MorningTime"] = 0] = "MorningTime";
    DayTime2[DayTime2["AfterNoonTime"] = 1] = "AfterNoonTime";
    DayTime2[DayTime2["NightTime"] = 2] = "NightTime";
    return DayTime2;
  })(DayTime || {});

  // E:/projects/laya3/Laya_GoF/src/Enemy.ts
  var __decorate3 = __$decorate("12843c7a-55a3-4124-bf12-0e47353d5c5a", "../src/Enemy.ts");
  var _a2;
  var { regClass: regClass3, property: property2 } = Laya;
  var Enemy = /* @__PURE__ */ __name(class Enemy2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.health = 100;
      this.state = new PassiveState();
      this.scanDistance = 200;
    }
    onAwake() {
      this.animator = this.owner.getComponent(Laya.Animator2D);
    }
    onEnable() {
      this.owner.on("Damage", this, this.handleDamage);
      this.health = 100;
      this.state = new PassiveState();
      this.animator.setParamsBool("Death", false);
    }
    handleDamage(damage) {
      this.health -= damage;
      if (this.health < 0) {
        this.animator.setParamsBool("Death", true);
        this.owner.removeSelf();
        Laya.Pool.recover("Enemy", this.owner);
        Laya.timer.once(2e3, this, () => {
          let newEnemy = Laya.Pool.getItem("Enemy");
          newEnemy.pos(Math.random() * Laya.stage.width, Math.random() * Laya.stage.height);
          Laya.stage.addChild(newEnemy);
        });
      }
    }
    onUpdate() {
      if (this.player) {
        this.state.onUpdate(this, this.player.getComponent(Laya.Script));
      }
    }
  }, "Enemy");
  __decorate3([
    property2(),
    __metadata("design:type", typeof (_a2 = typeof Laya !== "undefined" && Laya.Sprite) === "function" ? _a2 : Object)
  ], Enemy.prototype, "player", void 0);
  Enemy = __decorate3([
    regClass3()
  ], Enemy);

  // E:/projects/laya3/Laya_GoF/src/State_FSM.ts
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

  // E:/projects/laya3/Laya_GoF/src/Command.ts
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

  // E:/projects/laya3/Laya_GoF/src/Observer.ts
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

  // E:/projects/laya3/Laya_GoF/src/Event.ts
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

  // E:/projects/laya3/Laya_GoF/src/ClassType.ts
  var Breed = class {
    constructor(parent, health, attack) {
      this._health = 100;
      this._attack = "\u653B\u51FB\u6CE2";
      this._parent = null;
      if (parent != null) {
        this._parent = parent;
        this._health = parent._health;
        this._attack = parent._attack;
      }
      if (health) {
        this._health = health;
      }
      if (attack) {
        this._attack = attack;
      }
    }
    newMonster() {
      return new Monster(this);
    }
  };
  __name(Breed, "Breed");
  var Monster = class {
    constructor(breed) {
      this._breed = breed;
    }
    get health() {
      return this._breed._health;
    }
    get attack() {
      return this._breed._attack;
    }
  };
  __name(Monster, "Monster");

  // E:/projects/laya3/Laya_GoF/src/Mediator.ts
  var Mediator = class {
    constructor() {
      this.clients = [];
    }
    register(client) {
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i] === client) {
          return;
        }
      }
      this.clients.push(client);
    }
    notice(from, message) {
      this.clients.forEach((c) => {
        if (from !== c)
          c.receiveMessage(message);
      });
    }
  };
  __name(Mediator, "Mediator");
  var Client = class {
    constructor(mediator, name) {
      this.mediator = mediator;
      this.name = name;
    }
    sendMessage(message) {
      console.log(this.name + " \u53D1\u9001\uFF1A" + message);
      this.mediator.notice(this, message);
    }
    receiveMessage(message) {
      console.log(this.name + " \u63A5\u6536\uFF1A" + message);
    }
  };
  __name(Client, "Client");

  // E:/projects/laya3/Laya_GoF/src/Main.ts
  var __decorate4 = __$decorate("7bad1742-6eed-4d8d-81c0-501dc5bf03d6", "../src/Main.ts");
  var _a3;
  var _b;
  var { regClass: regClass4, property: property3 } = Laya;
  var Main = /* @__PURE__ */ __name(class Main2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this._state = 0 /* STATE_STANDING */;
      this.time = 0;
      this.mapX = 0;
      this.mapY = 0;
      this.mLastX = 0;
      this.mLastY = 0;
    }
    initialUI() {
      this.ui = this.owner.scene;
      this.ui.baseUI(this.ui);
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
      let none = new Breed();
      let Alice = none.newMonster();
      console.log("Alice:", Alice.health, Alice.attack);
      let goblin = new Breed(null, 50, "\u666E\u901A\u653B\u51FB");
      let Joe = goblin.newMonster();
      console.log("Joe:", Joe.health, Joe.attack);
      let goblinWizard = new Breed(goblin, 0, "\u706B\u7130\u5F39");
      let Yoh = goblinWizard.newMonster();
      console.log("Yoh:", Yoh.health, Yoh.attack);
      let mediator = new Mediator();
      let clientA = new Client(mediator, "clientA");
      let clientB = new Client(mediator, "clientB");
      let clientC = new Client(mediator, "clientC");
      mediator.register(clientA);
      mediator.register(clientB);
      mediator.register(clientC);
      clientA.sendMessage("ClientA enter");
      this.initialUI();
      this.tiledMap = new Laya.TiledMap();
      this.viewport = new Laya.Rectangle(0, 0, this.sceenCamera.width, this.sceenCamera.height);
      this.tiledMap.createMap("resources/tiledMap/level1.json", this.viewport, Laya.Handler.create(this, this.onMapCreated), null, null, true);
    }
    moveViewport() {
      let moveX = this.mapX - (Laya.stage.mouseX - this.mLastMouseX);
      let moveY = this.mapY - (Laya.stage.mouseY - this.mLastMouseY);
      this.tiledMap.moveViewPort(moveX, moveY);
    }
    onMapCreated() {
      let mapSprite = this.tiledMap.mapSprite();
      mapSprite.removeSelf();
      this.sceenCamera.addChild(mapSprite);
      mapSprite.zOrder = -1;
      let objectLayer = this.tiledMap.getLayerByName("entities");
      let playerGrid = objectLayer.getObjectByName("player");
      let newPoint = objectLayer.localToGlobal(new Laya.Point(playerGrid.x, playerGrid.y));
      mapSprite.pivotX = playerGrid.x;
      mapSprite.pivotY = playerGrid.y;
      mapSprite.x = this.sceenCamera.width / 2;
      mapSprite.y = this.sceenCamera.height / 2;
      mapSprite.scale(2, 2);
      let pos = new Laya.Point(playerGrid.x, playerGrid.y);
      mapSprite.localToGlobal(pos);
      this.sceenCamera.globalToLocal(pos);
      this.player.x = pos.x;
      this.player.y = pos.y;
    }
    handleKeyDown(evt) {
    }
    onUpdate() {
    }
    onKeyPress(evt) {
      if (evt.key.toLowerCase() === "w") {
        this.mLastY -= 2;
      } else if (evt.key.toLowerCase() === "s") {
        this.mLastY += 2;
      } else if (evt.key.toLowerCase() === "a") {
        this.mLastX -= 2;
      } else if (evt.key.toLowerCase() === "d") {
        this.mLastX += 2;
      }
      this.tiledMap.moveViewPort(this.mLastX, this.mLastY);
    }
  }, "Main");
  Main.MAX_TIME = 1500;
  __decorate4([
    property3(),
    __metadata("design:type", typeof (_a3 = typeof Laya !== "undefined" && Laya.Sprite) === "function" ? _a3 : Object)
  ], Main.prototype, "sceenCamera", void 0);
  __decorate4([
    property3(),
    __metadata("design:type", typeof (_b = typeof Laya !== "undefined" && Laya.Sprite) === "function" ? _b : Object)
  ], Main.prototype, "player", void 0);
  Main = __decorate4([
    regClass4()
  ], Main);

  // E:/projects/laya3/Laya_GoF/src/MainUIRT.generated.ts
  var MainUIRTBase = class extends Laya.Scene {
  };
  __name(MainUIRTBase, "MainUIRTBase");

  // E:/projects/laya3/Laya_GoF/src/MainUIRT.ts
  var __decorate5 = __$decorate("f93993db-43e8-4700-a9dc-bcbdf7a23edb", "../src/MainUIRT.ts");
  var { regClass: regClass5, property: property4 } = Laya;
  var MainUI = /* @__PURE__ */ __name(class MainUI2 extends MainUIRTBase {
    constructor() {
      super();
      this.prefabUrls = [
        "Enemy.lh",
        "EnemyPro.lh"
      ];
    }
    baseUI(ui) {
      this.list_enemies.array = this.prefabUrls;
      this.list_enemies.itemRender = ListItem;
      this.list_enemies.vScrollBarSkin = "";
      this.list_enemies.renderHandler = Laya.Handler.create(this, (cell) => {
        cell.init(this.Player);
      }, null, false);
    }
  }, "MainUI");
  MainUI = __decorate5([
    regClass5(),
    __metadata("design:paramtypes", [])
  ], MainUI);
  var ListItem = class extends Laya.Box {
    set dataSource(data) {
      this.enemyPrefabUrl = data;
    }
    constructor() {
      super();
      this.dragRegion = new Laya.Rectangle(0, 0, Laya.stage.width - 200, Laya.stage.height);
      this.width = 144;
      this.height = 144;
      this.left = 28;
      this.bgColor = "#eee";
      Laya.stage.on(Laya.Event.MOUSE_MOVE, this, (e) => {
        if (this.copied) {
          let x = Laya.stage.mouseX;
          let y = Laya.stage.mouseY;
          this.copied.pos(x, y);
        }
      });
    }
    init(player) {
      this.player = player;
      Laya.loader.load(`resources/${this.enemyPrefabUrl}`).then((res) => {
        let enemy = res.create();
        enemy.left = this.width - enemy.width >> 1;
        enemy.top = this.height - enemy.height >> 1;
        this.child = enemy;
        this.addChild(enemy);
        this.child.on(Laya.Event.MOUSE_DOWN, this, (e) => {
          this.handleMouseDown(e, res);
        });
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.handleMouseUp);
      });
    }
    handleMouseUp() {
      if (!this.copied)
        return;
      this.copied.getComponent(Laya.Script).player = this.player;
      this.copied = null;
    }
    handleMouseDown(e, data) {
      if (this.copied)
        return;
      this.copyTarget(e, data);
    }
    copyTarget(e, res) {
      if (this.copied)
        return;
      let copied = res.create().getChildAt(0);
      copied.x = Laya.stage.mouseX - 10;
      copied.y = Laya.stage.mouseY - 10;
      this.copied = copied;
      Laya.stage.addChild(this.copied);
    }
    onDestroy() {
      Laya.stage.off(Laya.Event.MOUSE_UP, this, this.handleMouseUp);
      if (this.child) {
      }
      super.destroy();
    }
  };
  __name(ListItem, "ListItem");

  // E:/projects/laya3/Laya_GoF/src/Player.ts
  var __decorate6 = __$decorate("a51a9993-7212-4529-af9d-4d56a3c8a7a3", "../src/Player.ts");
  var _a4;
  var { regClass: regClass6, property: property5 } = Laya;
  var Player = /* @__PURE__ */ __name(class Player2 extends Laya.Script {
    constructor() {
      super(...arguments);
      this.direction = [0, 1];
    }
    onAwake() {
      Laya.stage.focus = this.owner;
      this.self = this.owner;
      this.rgBody = this.self.getComponent(Laya.RigidBody);
    }
    onKeyPress(evt) {
      if (evt.key.toLowerCase() === "w") {
        this.rgBody.setVelocity({ x: 0, y: -this.speed });
        this.direction = [0, -1];
      } else if (evt.key.toLowerCase() === "s") {
        this.rgBody.setVelocity({ x: 0, y: this.speed });
        this.direction = [0, 1];
      } else if (evt.key.toLowerCase() === "a") {
        this.rgBody.setVelocity({ x: -this.speed, y: 0 });
        this.direction = [-1, 0];
      } else if (evt.key.toLowerCase() === "d") {
        this.rgBody.setVelocity({ x: this.speed, y: 0 });
        this.direction = [1, 0];
      }
    }
    onKeyDown(evt) {
      if (evt.key.toLowerCase() === " ") {
        let bullet = Laya.Pool.getItemByCreateFun("Bullet", this.spawnBullet, this);
        this.self.parent.addChild(bullet);
        bullet.x = (this.self.width - bullet.width) / 2 + this.self.x + bullet.width / 2;
        bullet.y = (this.self.height - bullet.height) / 2 + this.self.y + bullet.height / 2;
        bullet.getComponent(Laya.Script).isDestoryed = false;
        if (this.direction[0] !== 0) {
          bullet.rotation = 0;
        } else if (this.direction[1]) {
          bullet.rotation = 90;
        }
        bullet.getComponent(Laya.Script).move(this.direction.map((d) => d * 10));
      }
    }
    spawnBullet() {
      console.log("bullet created");
      let bullet = this.bulletPrefab.create();
      return bullet;
    }
    onKeyUp(evt) {
      this.rgBody.setVelocity({ x: 0, y: 0 });
    }
  }, "Player");
  __decorate6([
    property5(),
    __metadata("design:type", Number)
  ], Player.prototype, "speed", void 0);
  __decorate6([
    property5(),
    __metadata("design:type", typeof (_a4 = typeof Laya !== "undefined" && Laya.Prefab) === "function" ? _a4 : Object)
  ], Player.prototype, "bulletPrefab", void 0);
  Player = __decorate6([
    regClass6()
  ], Player);
})();
//# sourceMappingURL=bundle.js.map
