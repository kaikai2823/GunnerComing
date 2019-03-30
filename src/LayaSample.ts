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

	//公共变量

	//私有变量
	private body:Laya.Animation;

	public static enemy:view.enemy;
	public static mainrole:view.role;

    constructor()
    {
        Laya.init(720, 1280, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#feeefe";
		Laya.loader.load(Consts.resources,Laya.Handler.create(this,this.onLoaded));
    }
	
	onLoaded():void{
		var background:view.background = new view.background();
		Laya.stage.addChild(background);

		this.createMyself();
		//根据主角的位置创建敌人
		this.createEnemy();
	}

	//根据类型创建敌人
	createEnemy():void{
		GameMain.enemy = new view.enemy();
		//设置敌人出现的位置，计算相对位置
		var relativeX:number = GameMain.mainrole.x;
		var relativeY:number = GameMain.mainrole.y;
		for(var i:number = 0;i<Consts.lines[this.seq+1].length;i++){
			if(i%2 === 0){
				relativeX += Consts.lines[this.seq+1][i];
			}else{
				relativeY -= Consts.lines[this.seq+1][i];
			}
		}

		//根据主角的位置，设置敌人初始Y值
		if(GameMain.mainrole.skewY % 360 === 0){
			GameMain.enemy.pos(800,relativeY);
		}else{
			GameMain.enemy.pos(-100,relativeY);
		}
		//设置敌人缓动出现
		
		Laya.Tween.to(GameMain.enemy,{x:relativeX,y:relativeY},500,Laya.Ease.linearIn,null,0);
		
		GameMain.enemy.skewY = GameMain.mainrole.skewY;
		Laya.stage.addChild(GameMain.enemy);

		//回收敌人，
		this.shootEnemy();

	}
	createMyself():void{
		GameMain.mainrole = new view.role();
		//初始位置，状态
		GameMain.mainrole.pos(600,1000);
		GameMain.mainrole.skewY = 180;

		Laya.stage.addChild(GameMain.mainrole);
		GameMain.mainrole.gun.init();
	}
	/**
	 * 根据位置移动角色，需要特定的条件触发
	 */
	moveRole():void{
		var totalTime:number =0;
		var totalX:number =0;
		var totalY:number =0;
		for(var i:number = 0;i<Consts.lines[this.seq].length;i++){
			if(i%2 === 0){
				totalX += Consts.lines[this.seq][i];
				Laya.Tween.to(GameMain.mainrole,{x:GameMain.mainrole.x-totalX},Math.abs(Consts.lines[this.seq][i]*2),Laya.Ease.linearNone,null,totalTime);
			}else{
				totalY += Consts.lines[this.seq][i]
				Laya.Tween.to(GameMain.mainrole,{y:GameMain.mainrole.y-totalY},Consts.lines[this.seq][i]*2,Laya.Ease.linearNone,null,totalTime);
			}
			totalTime += Math.abs(Consts.lines[this.seq][i]*2);
		}
		Laya.timer.once(totalTime,this,()=>{
			GameMain.mainrole.skewY += 180;
			//根据主角的位置创建敌人
			this.createEnemy();
			//初始化枪
			
			GameMain.mainrole.gun.init();
		})
	}
	private seq:number = 0 ;//表示主角的移动次序

	shootEnemy():void{
		//通过定时器来检测是否被击中
		Laya.timer.frameLoop(1,this,ishit);
		function ishit():void{
			if(GameMain.enemy.behit == true){
				console.log("die");
				GameMain.enemy.removeSelf();
				this.moveRole();
				this.seq++; //进行下一步移动
				Laya.timer.clear(this,ishit);
			}else{
			}
		}
	}

}
new GameMain();