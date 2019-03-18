var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Ease = Laya.Ease;
var Tween = Laya.Tween;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(800, 800, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#232628";
        this.setup();
    }
    GameMain.prototype.setup = function () {
        var vGap = 100;
        this.button1 = this.createButton("点我3秒以后");
        this.button1.x = (Laya.stage.width - this.button1.width) / 2;
        this.button1.y = (Laya.stage.height - this.button1.height - vGap) / 2;
        Laya.stage.addChild(this.button1);
        this.button1.on(Laya.Event.CLICK, this, this.onDecreaseAlpha1);
        this.button2 = this.createButton("点我60帧以后");
        this.button2.pos(this.button1.x, this.button1.y + vGap);
        Laya.stage.addChild(this.button2);
        this.button2.on(Laya.Event.CLICK, this, this.onDecreaseAlpha2);
    };
    GameMain.prototype.createButton = function (label) {
        var w = 300, h = 60;
        var button = new Sprite();
        button.graphics.drawRect(0, 0, w, h, "#ff7f50");
        button.size(w, h);
        button.graphics.fillText(label, w / 2, 17, "20px simHei", "#ffffff", "center");
        return button;
    };
    GameMain.prototype.onDecreaseAlpha1 = function (e) {
        this.button1.off(Laya.Event.CLICK, this, this.onDecreaseAlpha1);
        Laya.timer.once(3000, this, this.onComplete1);
    };
    GameMain.prototype.onDecreaseAlpha2 = function (e) {
        this.button2.off(Laya.Event.CLICK, this, this.onDecreaseAlpha2);
        Laya.timer.frameOnce(60, this, this.onComplete2);
    };
    GameMain.prototype.onComplete1 = function () {
        this.button1.alpha -= 0.5;
    };
    GameMain.prototype.onComplete2 = function () {
        this.button2.alpha -= 0.5;
    };
    GameMain.resources = [
        "res/atlas/comp.atlas",
    ];
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map