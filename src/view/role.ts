/**Created by the LayaAirIDE*/
module view{
	export class role extends ui.roleUI{

		//准备状态
		public ready:boolean = false;//未使用
		//生成一把枪
		public gun:view.gun = new view.gun();
		constructor(){
			super();
			this.addChild(this.gun);
		}
	}
}