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
    var role = /** @class */ (function (_super) {
        __extends(role, _super);
        function role() {
            var _this = _super.call(this) || this;
            //准备状态
            _this.ready = false; //未使用
            //生成一把枪
            _this.gun = new view.gun();
            _this.addChild(_this.gun);
            return _this;
        }
        return role;
    }(ui.roleUI));
    view.role = role;
})(view || (view = {}));
//# sourceMappingURL=role.js.map