$(document).ready(function(){
		
	// first example
	$(".category").treeview({
		persist: "location",
		collapsed: true,
		unique: true
	});


	/*选项卡*/
	$(".b_tab .tab li").tabNav(".b_tab .tab li",".b_count","cur","click");	

	/*去除最后一个分隔线*/
	$(".b_stage .stage a:last").css("padding-right",0);

	


	$(".b_count .cont").each(function(){
		var $this = $(this);
		var h = $this.height();
		if(h>87){
			$this.siblings(".expansion").show();
		}
	});
	

	$(".b_count .expansion").click(function(){
		var $this = $(this);
		if($this.text() =="[+展开]"){
			var $siblings = $(this).siblings(".cont");
			$siblings.css({"max-height":"100%","overflow":"auto"});
			var h = $siblings.height();
			$this.text("[- 收起]");
			$this.css("top",h);

		}else{
			$this.text("[+展开]").css("top","116px");
			$(this).siblings(".cont").css({"max-height":"112px","overflow":"hidden"});
		}
	});

	//展开与折起
	$(".b_opt .open").click(function(){
		var $this = $(this);
		if($this.text() =="[+展开]"){
			$this.text("[- 收起]");
			$(this).parent().siblings(".p_cont").css({"max-height":"100%","overflow":"auto"});
		}else{
			$this.text("[+展开]");
			$(this).parent().siblings(".p_cont").css({"max-height":"232px","overflow":"hidden"});
		}
	});

	$(".version").click(function(){
		$(".per_pop,.p_btn").show();

		$(".b_history .p_cont").each(function(){
			var $this = $(this);
			var h = $this.height();
			if(h<232){
				$this.siblings(".b_opt").find(".open").hide();
			}
		});
	});

	//关闭弹出层
	$(".p_btn .close").click(function(){
		$(".per_pop,.p_btn").hide();
	});

});

$.fn.tabNav = function(obj,targetDiv,curClass,Event){
	$(obj).bind(Event,function(){
		var index = $(obj).index(this);
		$(obj).eq(index).addClass(curClass).siblings().removeClass(curClass);
		$(targetDiv).eq(index).show().siblings(targetDiv).hide();		
	});
};

