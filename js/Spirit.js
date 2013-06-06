/**
 *构造函数
 *@name Spirit
 *@class 动画精灵类
 *@param {Object} props 指定生成的DOM的样式对象
 */
var Spirit=function(position,props){
	//创建dom
 	this._dom=document.createElement('div');
 	this._dom.style.position='absolute';
	this._dom.style.left='0px';
	this._dom.style.top='0px';
	//是否被删除
	this._desdroyed=false;
	//位置属性&transform属性
	this.position={x:(position&&position.x?position.x:0),y:(position&&position.y?position.y:0),z:(position&&position.z?position.z:0)};
	this.rotate={x:0,y:0,z:0};
	this.scale={x:1,y:1,z:1};
	this.skew={x:0,y:0,z:0};
	this.opacity=1;
	//静态属性	
	this.width=(props&&props.width)?props.width:'100px';
	this.height=(props&&props.height)?props.height:'100px';
	this.backgroundColor=(props&&props.backgroundColor)?props.backgroundColor:'#000';
	this.backgroundImage=(props&&props.backgroundImage)?props.backgroundImage:null;

	this.update=function(){};

	this.animList=[];//设置动画列表
	this._targetProps={};//缓动动画的目标属性
	this._startProps={};//缓动动画的目标属性
	this.runTime=0;//当前动画的进度
	this.allTime=0;//总共的动画时间
	this.animCount=0;//当前动画
}
/*
 *精灵自我渲染的方法
 */
Spirit.prototype._draw=function(){
	this._dom.style.width=this.width+'px';
	this._dom.style.height=this.height+'px';
	this._dom.style.backgroundColor=this.backgroundColor;
	if(this.backgroundImage){
		this._dom.style.backgroundImage=this.backgroundImage;
		this._dom.style.backgroundSize='contain';
	}
	this._dom.style.opacity=this.opacity;
	var rotateCss='rotateX('+this.rotate.x+'deg) rotateY('+this.rotate.y+'deg) rotateZ('+this.rotate.z+'deg)';
	var translateCss='translateX('+this.position.x+'px) translateY('+this.position.y+'px) translateZ('+this.position.z+'px)';
	var skewCss='skewX('+this.skew.x+'deg) skewY('+this.skew.y+'deg)';
	var scaleCss='scaleX('+this.scale.x+') scaleY('+this.scale.y+') scaleZ('+this.scale.z+')';
	var TransformCss=translateCss+' '+rotateCss+' '+scaleCss+' '+skewCss;
	this._dom.style.webkitTransform=TransformCss;
	//console.log(TransformCss);	
}
/*
 *精灵自我更新的方法
 */
Spirit.prototype._update=function(time){
	this.update(time);
	this._countAnimList(time);
}
/*
 *执行精灵的动画列表
*/ 
Spirit.prototype._countAnimList=function(time){
	
	this.runTime+=time;
	//toggleAnim
	if(this.runTime>=this.allTime){
		this.animCount=this.animList.length;
		this.animCount--;
		if(this.animCount<0){return;}
		this.runTime=0;
		//this.allTime重赋值
		this.allTime=this.animList[this.animCount].time;
		//this._targetProps
		this._targetProps=this.animList[this.animCount].props;
		//this._startProps
		this.animList.length=this.animCount;
		for(var key in this._targetProps){
			if(key==='position'||key==='rotate'||key==='scale'||key==='skew'){
				this._startProps[key]={x:0,y:0,z:0};
				this._startProps[key].x=this[key].x;
				this._startProps[key].y=this[key].y;
				this._startProps[key].z=this[key].z;
			}else{
				this._startProps[key]=this[key];
			}
		}
	}
	var a=this.runTime/this.allTime;
	//runAnim
	for(var key in this._targetProps){
		if(key==='position'||key==='rotate'||key==='scale'||key==='skew'){
			var delta=this._targetProps[key].x-this._startProps[key].x;
			this[key].x=this._startProps[key].x+(this._targetProps[key].x-this._startProps[key].x)*a;
			this[key].y=this._startProps[key].y+(this._targetProps[key].y-this._startProps[key].y)*a;
			this[key].z=this._startProps[key].z+(this._targetProps[key].z-this._startProps[key].z)*a;
		}else{
			this[key]=this._startProps[key]+(this._targetProps[key]-this._startProps[key])*a;
		}
		
	}
}
/*
 *设置更新函数
 */
Spirit.prototype.setUpdate=function(updateFnc){
	this.update=updateFnc;
}
/*
 *添加动画到队列
 *{props:{},time:time}
 */
Spirit.prototype.setAnim=function(anim){
	this.animList=anim;
}
/*
 *从队列中删除动画
 */
Spirit.prototype.deleteAnim=function(anim){
	
}