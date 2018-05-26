$(function(){
	/*关闭按钮显示与隐藏*/
	$(".sel_city p").hover(function(){
		$(this).find(".close_icon").show();
	},function(){
		$(this).find(".close_icon").hide();
	});

	/*删除调研区域*/
	$(".sel_city .close_icon").click(function(){
		$(this).parent().remove();
	});

	/*阶段设置操作块显示与隐藏*/
	$(".b_set .rel").hover(function(){
		$(this).find(".abs").show();
	},function(){
		$(this).find(".abs").hide();
	});

	$(".res_icon:last").hide();

});

