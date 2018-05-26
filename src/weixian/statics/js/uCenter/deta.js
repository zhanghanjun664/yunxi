$(function(){
//onchange 当光标消失的时候 只能触发一次  
//ie  下 onpropertychange 输入连续触发  
// 标准 oninput   
msgTips();

//弹出层半透明效果
$(".send").click(function(){
	popup("pop","bgDiv");
});

$(".p_close").click(function(){
	popclose("pop","bgDiv");
});

});

