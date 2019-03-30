/*
* 子弹类，可以被自己和敌人调用
*/
class Bullet extends Laya.Sprite{
    
    private hitRadius:number = 1;//被击半径

    private body:Laya.Animation;
    private angle:number;

    public sign:number = 1;//代表子弹属于哪一方,1表示主角,2表示敌人

    constructor(){
        super();
    }
     //初始化
    public init(_angle:number,_sign):void{
        this.sign = _sign;

        this.angle = -_angle;
        //将角度转换为弧度制
        this.angle=this.angle*Math.PI/180;
        //加载图集动画
        Laya.Animation.createFrames(["img/bullet1.png","img/bullet2.png"],"bullet_fly");
		if(!this.body){
			this.body = new Laya.Animation();
            
			this.addChild(this.body); //将图集动画添加到对象容器
		}
		this.playAction("bullet_fly");
        
        Laya.timer.frameLoop(1,this,this.onLoop);
    }
    /**
     * 播放动画并居中
     * @param action 
     */
    playAction(action:String):void{
        this.body.rotation = this.angle;
		this.body.play(0,true,""+action);
        //相对于父容器位置居中
		var bound:Laya.Rectangle = this.body.getBounds();
		this.body.pos(-bound.width/2,-bound.height/2);
        //更改子弹的角度，角度制，修正九十度
        this.body.rotation = -this.angle*180/Math.PI+90;
	}

    onLoop():void{
        //控制子弹移动的速度
        var speed:number = 30;
        //控制子弹移动的方向
        this.body.x += Math.cos(this.angle)*speed;
        this.body.y -= Math.sin(this.angle)*speed;

        //if(this.isHeadHit()){Laya.timer.clear(this,this.onLoop);};//停止子弹循环
        if(this.sign == 1){
            this.isHeadHit();
        }else{
            this.isRoleBehit();
        }
        //飞出界外停止循环子弹并回收子弹
       
        if(this.body.x >1000 || this.body.x<-100){
            Laya.timer.clearAll(this);
            this.body.removeSelf();
            //敌人开枪
            if(this.sign == 1){
                GameMain.enemy.gun.enemyGunInit(22);
            }else{
                //子弹出界重新初始化枪
                GameMain.mainrole.gun.init();
            }
        }
    }
    
    isHeadHit():boolean{
        //根据主角的方向来控制自当检测碰撞
        var direction:number;
        if(GameMain.mainrole.skewY%360 == 0){
            direction = 1;
        }else{
            direction = -1;
        }

        var enemy:view.enemy = GameMain.enemy;
        //根据自身的位置，求子弹的绝对位置
        var aBulletX:number = direction*this.body.x+GameMain.mainrole.x;//负号表示镜像
        var aBulletY:number = this.body.y+GameMain.mainrole.y;

        //计算头部碰撞区域
        var hitRadiusX:number = this.hitRadius + enemy.head.width/2;
        var hitRadiusY:number = this.hitRadius + enemy.head.height/2;

        //求头部的绝对位置
        var enemyHeadX = enemy.x-(enemy.head.x-enemy.img_enemy.width/2);//负号表示镜像
        var enemyHeadY = enemy.y+enemy.head.y-enemy.img_enemy.height/2;
        //根据距离判断头部是否碰撞
        if(Math.abs(aBulletX-enemyHeadX)<hitRadiusX && Math.abs(aBulletY - enemyHeadY)< hitRadiusY){
            console.log("打到头部");
            this.body.visible = false;
            this.body.removeSelf();
            
            GameMain.enemy.behit = true;
            return true;
            //标记受到碰撞，执行后续动作
        }else{
            GameMain.enemy.behit = false;
            return false;
        }
        
    }
    isRoleBehit():void{
        //根据主角的方向来控制自当检测碰撞
        var direction:number;
        if(GameMain.mainrole.skewY%360 == 0){
            direction = -1;
        }else{
            direction = 1;
        }

        var mainrole:view.role = GameMain.mainrole;
        //根据自身的位置，求子弹的绝对位置
        var aBulletX:number = direction*this.body.x+GameMain.enemy.x;//负号表示镜像
        var aBulletY:number = this.body.y+GameMain.enemy.y;

        //计算碰撞区域
        var hitRadiusX:number = this.hitRadius + mainrole.myself.width/2;
        var hitRadiusY:number = this.hitRadius + mainrole.myself.height/2;

        //根据距离判断头部是否碰撞
        if(Math.abs(aBulletX-mainrole.x)<hitRadiusX && Math.abs(aBulletY - mainrole.y)< hitRadiusY){
            console.log("被挨打");
            this.body.visible = false;
            this.body.removeSelf();
            
            //GameMain.mainrole.gun.init();
            //标记受到碰撞，执行后续动作
        }else{
            
        }
    }
}