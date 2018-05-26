$(function(){
	srcoll_sub(".b_notice li",".play_text li",4000,600,".b_notice ul");
});

function srcoll_sub(li,nav_li,time,ch_time,position){
	var scroll_t , scroll_n = 0, count;
	var times = parseInt($(li).length/2);
	
	var mod = $(li).length%2;
	count= (mod == 0 ? times-1 : times);

	//自动播放
	scroll_t = setInterval(function(){
		scroll_n = scroll_n >=count? 0 :++scroll_n;
		Showauto(scroll_n,li,nav_li,ch_time,position);
		}, time);

	//鼠标经过与离开
	$(li).hover(
		function(){clearInterval(scroll_t);},
		function(){
			scroll_t = setInterval(function(){
				scroll_n = scroll_n >=count? 0 :++scroll_n;
				Showauto(scroll_n,li,nav_li,ch_time,position);
			}, time);
		}
	);
	
};

//切换特效函数
function Showauto(i,li,nav_li,ch_time,position) {
		$(position).animate({top: i*-32 +"px"},ch_time);	
};
