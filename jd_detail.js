/****************鼠标滑过导航条父菜单弹出子菜单****************/
function hoverSub(li,display){
	//1、找到li下要弹出的子菜单即相应的子菜单div
	var div=li.querySelector("div");
	//2、根据传入的参数设置相应的样式
	div.style.display=display;
}
/*当鼠标移到上述子菜单上时保持附菜单的hover样式
css中定义一个和:hover完全一样的样式类*/
function keepHover(div,isHover){
	var label=div.parentNode.querySelector("label");
	label.className=isHover?label.className+" hover":"rt";
	var a = label.querySelector("a");
	a.className=isHover?"hover":"";
}

/***************全部商品类别菜单的子菜单弹出**************************/
function hoverCate(display){
	var allCate=document.querySelector("#all_cate");
	allCate.style.display=display;
}
function hoverSubCate(div,display){
	var subDiv=div.querySelector(".sub_cate_box");
	subDiv.style.display=display;
}
/*当鼠标移到上述子菜单上时保持附菜单的hover样式
css中定义一个和:hover完全一样的样式类*/
function keepH3Hover(subDiv,isHover){
	var h3=subDiv.parentNode.querySelector("h3");
	h3.className=isHover?"hover":"";
}

/****************放大图****************/
/*左右移动小图片*/
//每个图片的宽度~每个小图片都放在一个对应li里
const LIWIDTH=62;
//times记录移动的次数
var times=0;
var iconList=document.querySelector("#icon_list");
	var counts=iconList.querySelectorAll("li").length;//看下一共有几个元素
function move(btn){
	//让iconList每次移动62像素
	if(btn.id=="btnLeft"){
		if(times!=0){
			times-=1;
			btn.parentNode.querySelector("#btnRight").className="right";
			
		}else{
			btn.className="left_disabled";
		}
	}else{
		if(counts-times>5){
			times+=1;
			btn.parentNode.querySelector("#btnLeft").className="left";
		}else{
			btn.className="right_disabled";
		}
	}
	iconList.style.left=(-1)*LIWIDTH*times+"px";
}
/*鼠标滑过小图片~显示中图片*/
var imgs=iconList.querySelectorAll("img");
var mimg=document.querySelector("#mImg");
for(var i=0; i<imgs.length;i++){
	imgs[i].onmouseover=function(){
		//product-s1.jpg小图片路径
		//product-s1-m.jpg中图片路径
		var src=this.src;
		var dotIndex=src.lastIndexOf(".");
		var sIndex = src.indexOf("D");
		mimg.src=src.substring(sIndex + 2,dotIndex)+"-m"+src.substring(dotIndex);
	}
}
/*显示发大图*/
var mask=document.querySelector("#mask");
var largeDiv=document.querySelector("#largeDiv");
function showMask(display){
	console.log(mask);
	mask.style.display=display;
	largeDiv.style.display=display;
}
function zoom(evt){
	//offsetX:鼠标指针位置相对于触发事件的对象的 x 坐标
	//offsetY:鼠标指针位置相对于触发事件的对象的 Y 坐标
	var top=evt.offsetY-175/2;
	var left=evt.offsetX-175/2;
	top=top<0?0:top>(350-175)?(350-175):top;
	left=left<0?0:left>(350-175)?(350-175):left;
	mask.style.top=top+"px";
	mask.style.left=left+"px";
	//product-s1-m.jpg中图片路径
	//product-s1-l.jpg大图片路径
	var src=mimg.src;
	var sIndex = src.index("D");
	var dotIndex=src.lastIndexOf(".");
	src=src.substring(sIndex + 2,dotIndex-1)+"l"+src.substring(dotIndex);
	largeDiv.style.backgroundImage="url("+src+")";
	largeDiv.style.backgroundPositionX=(-2)*left+"px";
	largeDiv.style.backgroundPositionY=(-2)*top+"px";
}
/*分享到*/
function shareMore(aMore){
	//用以判断当前是伸展还是收缩状态
	var isBack=aMore.className.indexOf("back")!=-1;
	//根据isBack返回的状态设置div的宽度
	var div=aMore.parentNode;
	div.style.width=isBack?"155px":"200px";
	//取得要显示的a标签
	var as=div.querySelectorAll("a");
	for(var i=3;i<as.length-1;i++){
		as[i].style.display=isBack?"none":"block";
	}
	//为当前按钮追加back类~以便让箭头反向
	aMore.className=isBack?"share_more":"share_more back";
}
/*送货地址选择*/
function storeHover(display){
	var divContent=document.querySelector("#store_content");
	divContent.style.display=display;
}
function storeTabChange(index){
	//获取ul下全部的大地区
	var lis=document.querySelectorAll("#store_tabs li");
	//移除说有li上的class，仅为选中的当前li设置class
	for(var i=0;i<lis.length;i++){
		lis[i].className="";
	}
	lis[index].className="hover";
}
/*迷你购物车*/
function showMiniCart(divCart,display){
	divCart.querySelector("div").style.display=display;
}
/*产品详情的页签切换*/
var tabs=["product_info","product_data","product_package","product_saleAfter"];
function showTab(li,index){
	//变换li上current样式类的位置
	var lis=li.parentNode.querySelectorAll("li");
	for(var i=0;i<lis.length;i++){
		lis[i].className="";
	}
	li.className="current";
	//显示指定li对应的div内容
	for(var i=0;i<tabs.length;i++){
		var div=document.querySelector("#"+tabs[i]);
		div.style.display=(i==index)?"block":"none";
	}
}
/*弹出回复表单*/
function showReply(aObj){
	//根据当前点击的a定位对应的reply div
	var divComment=aObj.parentNode.parentNode;
	var divReply=null;
	//元素类型的nodeType是1
	//文本类型的nodetype是3
	if(divComment.nextSibling.nodeType==3){//如果当前找到的节点是文本那就要再找下一个节点
		divReply=divComment.nextSibling.nextSibling;
	}else{
		divReply=divComment.nextSibling
	}
	//获得reply div的display属性，反转
	var cssStyle=null;
	//通过下面的if else可以得到当前元素的所有的css样式
	if(divReply.currentStyle){
		cssStyle=divReply.currentStyle;
	}else{
		cssStyle=getComputedStyle(divReply,null);
	}
	divReply.style.display=cssStyle.display=="none"?"block":"none";
}