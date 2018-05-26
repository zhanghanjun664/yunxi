$(function(){
	//下拉框
	$(".b_select").hover(function(){
		var $this = $(this);
		$this.find(".icon").addClass("up");
		$this.children(".a_popup").show();
		var h = $this.children(".a_popup").height() + $this.children(".btn_arrow").height();
		$this.height(h);
	},function(){
		var $this = $(this);
		$this.find(".icon").removeClass("up");
		$this.children(".a_popup").hide();
		$this.css("height","auto");
	});

	//更多

	$(".more").click(function(){
		var $this = $(this);
		if($this.children(".text").text()=="更多"){
			$this.children(".text").text("收起");
			$this.children(".icon").addClass("up");
			$this.parent().parent().siblings(".tips").show();
		}else{
			$this.children(".text").text("更多");
			$this.children(".icon").removeClass("up");
			$this.parent().parent().siblings(".tips").hide();
		}

	});
});
