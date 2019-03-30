
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class backgroundUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Line","props":{"y":1000,"x":0,"toY":0,"toX":720,"lineWidth":1,"lineColor":"#ff0000"}},{"type":"Line","props":{"y":800,"x":0,"toY":0,"toX":720,"lineWidth":1,"lineColor":"#221e3b"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.backgroundUI.uiView);

        }

    }
}

module ui {
    export class enemyUI extends View {
		public img_enemy:Laya.Image;
		public head:Laya.Sprite;
		public body:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":150,"var":"img_enemy","skin":"img/enemy.jpg","pivotY":75,"pivotX":75,"height":150},"child":[{"type":"Sprite","props":{"y":39,"x":93,"width":48,"var":"head","pivotY":32,"pivotX":24,"height":64}},{"type":"Sprite","props":{"y":106,"x":92,"width":42,"var":"body","pivotY":32,"pivotX":21,"height":64}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.enemyUI.uiView);

        }

    }
}

module ui {
    export class gunUI extends View {
		public gun:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":100,"var":"gun","skin":"img/gun.jpg","pivotY":21,"pivotX":38,"height":50}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gunUI.uiView);

        }

    }
}

module ui {
    export class roleUI extends View {
		public myself:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"y":0,"x":0,"width":48,"var":"myself","skewY":0,"skewX":0,"scaleX":1,"pivotY":80,"pivotX":37,"height":137},"child":[{"type":"Rect","props":{"x":10,"width":31,"lineWidth":1,"height":55,"fillColor":"#9e5353"}},{"type":"Rect","props":{"y":49,"width":48,"lineWidth":1,"height":88,"fillColor":"#0099ff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.roleUI.uiView);

        }

    }
}
