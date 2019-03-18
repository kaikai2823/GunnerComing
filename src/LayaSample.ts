import WebGL = Laya.WebGL;
import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import Texture = Laya.Texture;
import Browser = Laya.Browser;
import Handler = Laya.Handler;

import Ease = Laya.Ease;
import Tween = Laya.Tween;

// 程序入口
class GameMain{
	static resources = [
        "res/atlas/comp.atlas", 
    ];

	private button1:Sprite;
	private button2:Sprite;

    constructor()
    {
        Laya.init(800, 800, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";
		this.setup();
    }

	private setup():void{
		var vGap:number = 100;
		
		this.button1 = this.createButton("点我3秒以后");
		this.button1.x = (Laya.stage.width - this.button1.width)/2;
		this.button1.y = (Laya.stage.height - this.button1.height - vGap)/2;
		Laya.stage.addChild(this.button1);
		this.button1.on(Laya.Event.CLICK,this,this.onDecreaseAlpha1);

		this.button2 = this.createButton("点我60帧以后");
		this.button2.pos(this.button1.x,this.button1.y+vGap);
		Laya.stage.addChild(this.button2);
		this.button2.on(Laya.Event.CLICK,this,this.onDecreaseAlpha2);
		
	}
    private createButton(label:string):Sprite{
		var w:number =300,h:number = 60;

		var button:Sprite = new Sprite();
		button.graphics.drawRect(0,0,w,h,"#ff7f50");
		button.size(w,h);
		button.graphics.fillText(label, w / 2, 17, "20px simHei", "#ffffff", "center")
		return button;
	}

	private onDecreaseAlpha1(e:Event):void{
		this.button1.off(Laya.Event.CLICK,this,this.onDecreaseAlpha1);
		Laya.timer.once(3000,this,this.onComplete1);
	}

	private onDecreaseAlpha2(e:Event):void{
		this.button2.off(Laya.Event.CLICK,this,this.onDecreaseAlpha2);
		Laya.timer.frameOnce(60,this,this.onComplete2);
	}

	private onComplete1():void{
		this.button1.alpha -=0.5;
	}
	private onComplete2():void{
		this.button2.alpha -=0.5;
	}
}
new GameMain();