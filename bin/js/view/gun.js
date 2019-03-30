var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**Created by the LayaAirIDE*/
var view;
(function (view) {
    var gun = /** @class */ (function (_super) {
        __extends(gun, _super);
        function gun() {
            var _this = _super.call(this) || this;
            _this.isShootEnemy = false;
            //转动的速度
            _this.rotationSpeed = 0.5;
            _this.addChild(_this.gun);
            return _this;
        }
        //触发条件为，主角射击后
        gun.prototype.enemyGunInit = function (shootRotation) {
            var _this = this;
            this.gun.rotation = 0;
            //从水平方向转动到特定位置
            Laya.timer.frameLoop(1, this, function () {
                if (shootRotation > 0) {
                    if (_this.gun.rotation < shootRotation) {
                        _this.gun.rotation++;
                    }
                    else {
                        Laya.timer.clearAll(_this);
                        _this.shootBullet(2); //自动发射子弹
                    }
                }
                else {
                    if (_this.gun.rotation > shootRotation) {
                        _this.gun.rotation--;
                    }
                    else {
                        Laya.timer.clearAll(_this);
                        _this.shootBullet(2); //自动发射子弹
                    }
                }
            });
        };
        gun.prototype.init = function () {
            //清理之前的定时器
            //让枪转动
            Laya.timer.frameLoop(1, this, this.onLoop);
            //检测屏幕点击
            Laya.stage.on(Laya.Event.CLICK, this, this.shootBullet, [1]);
        };
        gun.prototype.onLoop = function () {
            //转动枪
            this.gun.rotation -= this.rotationSpeed;
            //转动的范围 0 到 -60
            if (this.gun.rotation >= 0 || this.gun.rotation <= -60) {
                this.rotationSpeed = -this.rotationSpeed;
            }
            //生成扇形区域
            this.drawPie(this.gun.rotation);
        };
        //停止循环，执行后续动作
        gun.prototype.outLoop = function () {
            var _this = this;
            Laya.timer.clear(this, this.onLoop);
            //爆破效果、声音
            //后续动作，恢复水平
            Laya.timer.frameLoop(1, this, function () {
                if (_this.gun.rotation > 0) {
                    Laya.timer.clearAll(_this);
                    _this.gun.rotation = 0; //恢复到水平
                }
                else {
                    _this.gun.rotation++;
                }
            });
        };
        //主角发射子弹逻辑
        gun.prototype.shootBullet = function (_sign) {
            //如果不是准备状态不允许发射
            // var bullet:Bullet = new Bullet(this.gun.getGunRotation());
            //从对象池中创建对象
            var bullet = Laya.Pool.getItemByClass("bullet", Bullet);
            //子弹的初始发射角度
            bullet.init(this.gun.rotation, _sign);
            //子弹的初始位置
            bullet.pos(this.gun.x, this.gun.y);
            this.addChild(bullet);
            //停止抢的转动
            this.outLoop();
            //停止监听点击事件
            Laya.stage.off(Laya.Event.CLICK, this, this.shootBullet);
        };
        /**
         * 绘制枪口的扇形区域
         * @param angle 扇形区域的开合角度
         */
        gun.prototype.drawPie = function (angle) {
            var sp = new Laya.Sprite();
            this.addChild(sp);
            sp.graphics.drawPie(this.gun.x, this.gun.y, 200, angle - 3, 1, "#a9aab0");
            sp.alpha = 0.5;
            Laya.timer.frameLoop(1, this, function () {
                sp.graphics.clear(); //清除之前的绘图痕迹
                sp.removeSelf(); //用完之后立即回收
            });
        };
        return gun;
    }(ui.gunUI));
    view.gun = gun;
})(view || (view = {}));
//# sourceMappingURL=gun.js.map