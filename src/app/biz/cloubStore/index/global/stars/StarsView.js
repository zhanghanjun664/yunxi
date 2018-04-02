import React,{Component} from 'react' ;
import PropTypes from 'prop-types';

import './StarsLess.less' ;

/**
 * yie.lv
 * 单星星控件
 */
class Stars extends Component{

    
    render(){

        let type = this.props.type ; 
        
        //判断星的类型
        let starsClass = type!='2'?'icon-weinintuijian':'icon-banxing' ;

        //是否点亮
        let light = type!='0'?true:false ; 

        return(
            <i
              className={'iconfont '+ starsClass }
              style={light?{color:this.props.color}:{}}
            ></i>
        )
        
    }

    static propTypes = {
        type:PropTypes.string,  //0 未点亮  1点亮  2半星
        color:PropTypes.string
    }

    static defaultProps = {
        type:'0', 
        color:'#FD5C0E',
    }  
}

/**
 * 多星星排列
 * 根据score计算
 */
class StarsList extends Component{

    
    render(){
        let score = this.props.score ; 
        

        if(score==null)return(<div></div>) ;
		let [n,f] = (score+'').split('.') ; 
		//绘制各种星的数量
		let [fnum,mnum,nnum] = [0,0,0] ;
        
        
		let arr = new Array(5) ;
		if(n>=5){
			fnum = 5 ; 
			arr.fill(1,0,5) ;
		}else{
			fnum = n ;
			fnum = parseInt(fnum) ;
			arr.fill(1,0,fnum) ;
            
			//半星
			if(fnum!=0&&f!=0){
				mnum = 1;
				arr.fill(2,fnum,fnum+1) ;
			}
			//添加为点亮的星星
			arr.fill(0,fnum+mnum,5) ;
		}
        
        return(
            <div className={'startList '+this.props.className}>
                {
                    arr.map((v,i) => {
						return(
							<Stars key={`start-${i}`} type={v+""} />
						)
					})
                }
            </div>
        )
    }
}

module.exports =  {
    'Stars':Stars,
    'StarsList':StarsList
}