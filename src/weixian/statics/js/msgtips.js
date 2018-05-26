function msgTips(){  

    var odiv=document.getElementById('pop');  
    var op=document.getElementById('ptips');  
    var ot=odiv.getElementsByTagName('textarea')[0];  
    var oa=odiv.getElementsByTagName('a')[0];  
    var ie=!-[1,];//判断是否为ie浏览器  
    var bbtn=true;  
    var timer=null;  
    var nnn=0;  
    ot.onfocus=function(){  
        if(bbtn){  
            op.innerHTML='你还可以输入：<span class="green">130</span>字';  
            bbtn=false;  
        }  
    };  
    
  
    if(ie){  
        ot.onpropertychange=toChange;  
    }else{  
        ot.oninput=toChange;  
          
    }  
    function toChange(){  
        var num=Math.ceil(getLength(ot.value)/2);  
        var oSpan=odiv.getElementsByTagName('span')[0];  
        if(num<=130){  
            oSpan.innerHTML=130-num;  
            oSpan.style.color='';  
        }else{  
            oSpan.innerHTML=num-130;  
            oSpan.style.color='red';  
        }  
        if(ot.value==''||num>130){  
            oa.className='dis';  
        }else{  
            oa.className='';  
        }  
    }  
    function getLength(str){  
        return String(str).replace(/[^\x00-\xff]/g,'aa').length;  
    }  
    oa.onclick=function(){  
        if(this.className=='dis'){  
            clearInterval(timer);  
            timer=setInterval(function(){
                if(nnn==5){  
                    clearInterval(timer);  
                    nnn=0;  
                }else{  
                    nnn++;  
                }  
                if(nnn%2){  
                    ot.style.background='#dddddd';  
                }else{  
                    ot.style.background='';  
                }  
            },100);  
        }else{  
             popclose("pop","bgDiv"); 
        }  
    }  
}  
