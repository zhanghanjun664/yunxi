import React,{Component} from 'react' ;
import "assets/css/commonCss.less";
/**
 * yie.lvlin
 * 云店路由视图
 */
class CloubStoreView extends Component{

    constructor(){

        super() ;

        console.log('进入云店路由下，需要获取云店的code');
        
    }

    render(){

        return(
            this.props.children 
        )
    }
}

module.exports = CloubStoreView ; 