/**
 *构造函数
 *@name Stage
 *@class 用于绘制元素的舞台
 *@param {String} dom 承载上下文的dom
 *@param {Int} perspective 透视度
 */
var Stage=function(dom,perspective){
  var dom=document.getElementById(dom);//dom初始化
 	dom.style.webkitTransformStyle='preserve-3d';//3d渲染模式
 	dom.style.transformStyle='preserve-3d';
 	dom.style.webkitPerspective=perspective;//透视度
 	dom.style.perspective=perspective;
  	//dom.style.transfrom='perspective('+perspective+')';
  	//dom.style.webkitTransfrom='perspective('+perspective+')';
 	dom.style.position='relative';//定位布局
 	this.dom=dom;	
 	this.spirits=[];//spirits数组
 	this.update=function(){};
}
/*
 *舞台更新
 */
Stage.prototype._update=function(time){
  this.update(time);
}
/*
 *设置更新函数
 */
Stage.prototype.setUpdate=function(updateFnc){
  this.update=updateFnc;
}
/*
*添加精灵
*/
Stage.prototype.addSpirit=function(spirit){
 	this.spirits.push(spirit);
 	this.dom.appendChild(spirit._dom);
}
/*
*删除精灵
*/
Stage.prototype.deleteSpirit=function(spirit){
	spirit._desdroyed=true;
	this.dom.removeChild(spirit._dom);
}
/*
*清除舞台上的所有精灵
*/
Stage.prototype.clear=function(){
	this.spirits=[];
  while(this.dom.lastChild) //当div下还存在末尾节点时 循环删除
  {
  	this.dom.removeChild(this.dom.lastChild);
  }
}
 /*
  *更新精灵和舞台，清理删除的精灵，渲染精灵
  */
Stage.prototype._renderSpiritsAndClear=function(time){
 	this._update(time);//舞台更新
 	var len=this.spirits.length;
	for(var i=len-1;i>=0;i--){
		var e=this.spirits[i];
		if(e._desdroyed){
			len--;
			this.spirits[i]=this.spirits[len];
			continue;
		}
		e._update(time);//精灵更新
 		e._draw();//精灵渲染
 			
 	}
 	this.spirits.length=len;
 }
