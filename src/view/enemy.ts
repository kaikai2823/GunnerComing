/**Created by the LayaAirIDE*/
module view{
	export class enemy extends ui.enemyUI{
		public behit:boolean = false;//是否被击中
		//生成一把枪
		public gun:view.gun = new view.gun();
		constructor(){
			super();
			this.addChild(this.gun);
			this.gun.skewY = 180;
		}
	}
}