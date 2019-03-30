/**Created by the LayaAirIDE*/
module view{
	export class gun extends ui.gunUI{
		public isShootEnemy:boolean = false;

		constructor(){
			super();
			this.addChild(this.gun);
		}
		//触发条件为，主角射击后
		public enemyGunInit(shootRotation:number):void{
			this.gun.rotation = 0;
			//从水平方向转动到特定位置
			Laya.timer.frameLoop(1,this,()=>{
				if(shootRotation>0){
					if(this.gun.rotation<shootRotation){
						this.gun.rotation ++;
					}else{
						Laya.timer.clearAll(this);
						this.shootBullet(2);//自动发射子弹
					}
				}else{
					if(this.gun.rotation>shootRotation){
						this.gun.rotation --;
					}else{
						Laya.timer.clearAll(this);
						this.shootBullet(2);//自动发射子弹
					}
				}
			});
		}

		public init():void{
			//清理之前的定时器
			//让枪转动
			Laya.timer.frameLoop(1,this,this.onLoop);
			//检测屏幕点击
			Laya.stage.on(Laya.Event.CLICK,this,this.shootBullet,[1]);
		}
		//转动的速度
		private rotationSpeed:number = 0.5;
		onLoop():void{

			//转动枪
			this.gun.rotation -= this.rotationSpeed;
			//转动的范围 0 到 -60
			if(this.gun.rotation>=0||this.gun.rotation<=-60){
				this.rotationSpeed = -this.rotationSpeed;
			}
			//生成扇形区域
			this.drawPie(this.gun.rotation);
		}
		//停止循环，执行后续动作
		outLoop():void{
			Laya.timer.clear(this,this.onLoop);
			//爆破效果、声音
			//后续动作，恢复水平
			
			Laya.timer.frameLoop(1,this,()=>{
				if(this.gun.rotation>0){
					Laya.timer.clearAll(this);
					this.gun.rotation = 0;//恢复到水平
				}else{
					this.gun.rotation ++;
				}
			});
		}
		//主角发射子弹逻辑
		shootBullet(_sign:number):void{
			//如果不是准备状态不允许发射
			// var bullet:Bullet = new Bullet(this.gun.getGunRotation());
			//从对象池中创建对象
			var bullet:Bullet = Laya.Pool.getItemByClass("bullet",Bullet);
			//子弹的初始发射角度
			bullet.init(this.gun.rotation,_sign);

			//子弹的初始位置
			bullet.pos(this.gun.x,this.gun.y);
			this.addChild(bullet);
			//停止抢的转动
			this.outLoop();
			//停止监听点击事件
			Laya.stage.off(Laya.Event.CLICK,this,this.shootBullet);
		}
		/**
		 * 绘制枪口的扇形区域
		 * @param angle 扇形区域的开合角度
		 */
		drawPie(angle:number):void{
			var sp:Laya.Sprite = new Laya.Sprite();
			this.addChild(sp);
			sp.graphics.drawPie(this.gun.x,this.gun.y,200,angle-3,1,"#a9aab0");
			sp.alpha = 0.5;
			Laya.timer.frameLoop(1,this,()=>{
				sp.graphics.clear(); //清除之前的绘图痕迹
				sp.removeSelf(); //用完之后立即回收
			});
		}
	}
}