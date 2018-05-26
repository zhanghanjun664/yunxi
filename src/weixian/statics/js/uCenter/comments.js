$(function(){
	/*选项卡*/
	$(".comments .tab li").tabNav(".comments .tab li",".b_count","cur","click",2);	

	/*去除最后一个分隔线*/
	$(".b_list").each(function(){
		$(this).find("li:last").css("border-bottom",0);
	})

});

$.fn.tabNav = function(obj,targetDiv,curClass,Event,blankNum){

	$(obj).bind(Event,function(){
		var index = $(obj).index(this);
		
		if(index != blankNum){
			$(obj).eq(index).addClass(curClass).siblings().removeClass(curClass);
			$(targetDiv).eq(index).show().siblings(targetDiv).hide();
		}
	});
};
