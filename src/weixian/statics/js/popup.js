//显示半透明背景及显示层
function popup(popDiv,bgDiv){
	var popup = document.getElementById(popDiv);
	popup.style.display = "block";

	var winh = document.documentElement.clientHeight;
	var winw = document.documentElement.clientWidth;
	var contw = document.getElementById(popDiv).clientWidth;
	var conth = document.getElementById(popDiv).clientHeight;
	var top = (winh-conth)/2;
	var left = (winw - contw)/2;

	var tmpdiv = document.createElement("div");
	var body = document.body;
	body.appendChild(tmpdiv);

	popup.style.top=top+"px";
	popup.style.left=left+'px';

	tmpdiv.id= bgDiv;
	body.style.height = winh+"px";
	body.style.overflow ="hidden";
}

//隐藏半透明背景及显示层
function popclose(popDiv,bgDiv){
	document.getElementById(popDiv).style.display="none";
	var thisNode = document.getElementById(bgDiv);
	thisNode.parentNode.removeChild(thisNode);
}