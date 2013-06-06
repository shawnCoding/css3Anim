/**
 *构造函数
 *@name Timer
 *@class 游戏计时器
 *@param {Object} stage 绑定舞台
 *@param {float} fps 设置游戏帧率
 */
var Timer=function(stage){
 	this._stage=stage;//绑定的舞台
 	this.FPS=0;//帧率
 	this._animId;//requestAnimFrame对象
 	this.isRun=false;//计时器是否运行
 }
 /*
 *计时器开始计时
 */
Timer.prototype.run=function(){
	this.isRun=true;
	var self=this;
	var startTime=0;
	(function animLoop(){//animLoop
		self._animId= requestAnimFrame(function (time){	
			if(time){	
				var frameTime=time-startTime;	
				self.FPS=1000/frameTime;
				startTime=time;	
			}else{
				var nowTime=(new Date()).getTime();
				if(startTime!=0){
					var frameTime=nowTime-startTime;	
					self.FPS=1000/frameTime;
				}else{
					var frameTime=0;
					self.FPS=0;
				}
				startTime=nowTime;
			}
        	self._stage._renderSpiritsAndClear(frameTime);	        
	        animLoop();	
		},self);
	})();
}
/*
 *计时器停止计时
 */
Timer.prototype.pause=function(){
	this.isRun=false;
	var animId=this._animId;
	clearRequestTimeout(animId);
}
/*
 *计时器停止计时
 */
Timer.prototype.getFPS=function(){
	return this.FPS;
}
