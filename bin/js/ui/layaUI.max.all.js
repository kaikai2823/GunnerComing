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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var backgroundUI = /** @class */ (function (_super) {
        __extends(backgroundUI, _super);
        function backgroundUI() {
            return _super.call(this) || this;
        }
        backgroundUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.backgroundUI.uiView);
        };
        backgroundUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Line", "props": { "y": 1000, "x": 0, "toY": 0, "toX": 720, "lineWidth": 1, "lineColor": "#ff0000" } }, { "type": "Line", "props": { "y": 800, "x": 0, "toY": 0, "toX": 720, "lineWidth": 1, "lineColor": "#221e3b" } }] };
        return backgroundUI;
    }(View));
    ui.backgroundUI = backgroundUI;
})(ui || (ui = {}));
(function (ui) {
    var enemyUI = /** @class */ (function (_super) {
        __extends(enemyUI, _super);
        function enemyUI() {
            return _super.call(this) || this;
        }
        enemyUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.enemyUI.uiView);
        };
        enemyUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 150, "var": "img_enemy", "skin": "img/enemy.jpg", "pivotY": 75, "pivotX": 75, "height": 150 }, "child": [{ "type": "Sprite", "props": { "y": 39, "x": 93, "width": 48, "var": "head", "pivotY": 32, "pivotX": 24, "height": 64 } }, { "type": "Sprite", "props": { "y": 106, "x": 92, "width": 42, "var": "body", "pivotY": 32, "pivotX": 21, "height": 64 } }] }] };
        return enemyUI;
    }(View));
    ui.enemyUI = enemyUI;
})(ui || (ui = {}));
(function (ui) {
    var gunUI = /** @class */ (function (_super) {
        __extends(gunUI, _super);
        function gunUI() {
            return _super.call(this) || this;
        }
        gunUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.gunUI.uiView);
        };
        gunUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 720, "height": 1280 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 100, "var": "gun", "skin": "img/gun.jpg", "pivotY": 21, "pivotX": 38, "height": 50 } }] };
        return gunUI;
    }(View));
    ui.gunUI = gunUI;
})(ui || (ui = {}));
(function (ui) {
    var roleUI = /** @class */ (function (_super) {
        __extends(roleUI, _super);
        function roleUI() {
            return _super.call(this) || this;
        }
        roleUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.roleUI.uiView);
        };
        roleUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 48, "var": "myself", "skewY": 0, "skewX": 0, "scaleX": 1, "pivotY": 80, "pivotX": 37, "height": 137 }, "child": [{ "type": "Rect", "props": { "x": 10, "width": 31, "lineWidth": 1, "height": 55, "fillColor": "#9e5353" } }, { "type": "Rect", "props": { "y": 49, "width": 48, "lineWidth": 1, "height": 88, "fillColor": "#0099ff" } }] }] };
        return roleUI;
    }(View));
    ui.roleUI = roleUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map