$(function(){

	stretch(".btn_close", "<< 收起", ">> 展开", "p_stretch", '.close_box', 0);
	

});
/*
	参数说明：
	btn --点击的对象
	value --点击对象的原始值
	changeVal -- 点击对象的变换值
	addclasss --添加的calss
	width -- 点击对象的父元素
	bdWidth -- 父元素border宽度
*/
function stretch(btn,value,changeVal,addclasss,box,bdWidth){
	var ow = $(box).width()
	$(btn).click(function(){
		var moveWidth = $(box).width() + bdWidth*2;
		if($(this).text() == value){
			$(this).text(changeVal).addClass(addclasss);
			$(box).animate({
				width: 0
			})
			$(box).toggleClass('hover')
			
		}else{
			$(this).text(value).removeClass(addclasss);
			$(box).toggleClass('hover')
			$(box).animate({
				width: ow
			})			
			
		}
	});
}