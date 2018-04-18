import React,{Component} from 'react' ; 

import MaskTitle from '../../global/title/TitleView' ;

import './SelectedVideoLess.less' ;
/**
 * 精选视频
 */
class SelectedVideo extends Component{

    render(){

        return(
            <MaskTitle className='selectedVideo' titleName='视频鉴赏' iconClass='icon icon-vedio' >
                <div className="card">
                    <div className="card-content">
                        <img src="assets/images/home/test_shipin.png" />
                    </div>
                    <div className="card-footer vedio-footer">
                        长安福特官方品牌视频 
                    </div>
                </div>
            </MaskTitle>
        )
    }
}

//iconUrl='assets/images/cloubStore/shipin.png'

module.exports = SelectedVideo ; 