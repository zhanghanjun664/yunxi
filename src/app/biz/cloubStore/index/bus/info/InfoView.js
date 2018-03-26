import React from 'react';
import './InfoLess.less';
import { inject,observer } from 'mobx-react';

import {StarsList} from 'biz/cloubStore/index/global/stars/StarsView' ; 

@inject("cloubStoreIndex")
@observer
class InfoView extends React.Component {

    constructor(props){
      super(props);
      this.stores = this.props.cloubStoreIndex;
    }

    componentDidMount() {
      this.stores.getdealerInfo();
    }

    render() {
      let {dealerInfo} = this.stores.state ;
      
      return (
          <div className='InfoPage'>
              <div className='InfoPage-title'>
                <i className="iconfont icon-jingxiaoshangyundian" />
                <span>经销商云店</span>
              </div>
              <div className='infoPage-content'>
                <div className='infoPage-content-img'>
                  <img src={dealerInfo.imgUrl} />
                </div>
                <div className='infoPage-content-info'>
                  <div className='infoPage-content-info-name ellipsis-two'>
                    {dealerInfo.dealerName}
                  </div>
                  <div className='infoPage-content-info-s'>
                    <StarsList score={dealerInfo.score} className='infoPage-content-info-stars' />
                    <div>
                      <span>{dealerInfo.score}分</span>
                    </div>
                  </div>
                  <div className='infoPage-content-info-m'>
                    <div className='infoPage-content-info-m-l'>
                      <i className='iconfont icon-ditu'></i>
                      <p className="p1">到这里</p>
                    </div>
                    <div className='infoPage-content-info-m-r'>
                      <p className="p2">距您{`<`}10km</p>
                      <a href={'tel:'+dealerInfo.salePhone}>
                        <span className='r-j'></span>
                        <i className='iconfont icon-dianhua'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

          </div>
      )
   
    }
  }
  module.exports =  InfoView;

  /**
   * <div id="wai">
            <div id="title"><i className="iconfont icon-jingxiaoshangyundian"></i>经销商云店</div>
            
            <div id="jxstp">
              <img 
                src={dealerInfo.imgUrl}
              />
            </div>
            <div id="jxsxx">
              <p id="gstitel">{dealerInfo.dealerName}</p>
              <div id="pjx">
                <i className='xx xz iconfont icon-weinintuijian' ></i>
                <i className='xx xz iconfont icon-weinintuijian'></i>
                <i className='xx xz iconfont icon-weinintuijian'></i>
                <i className='xx xz iconfont icon-banxing'></i>
                <i className='xx iconfont icon-weinintuijian'></i>
                <span> {dealerInfo.score}分</span>
              </div>
            </div>
            <div id="dbwz">
                <i className='iconfont icon-ditu'></i>
                <p className="p1">到这里</p>
                <i className='iconfont icon-dianhua'></i>
                <p className="p2">距您 10km</p>
            </div>
          </div>
   */
  /**
   * <div className="xx"><img src="../../../assets/images/cloubStoreIndex/已评星.png"/></div>
            <div className="xx"><img src="../../../assets/images/cloubStoreIndex/已评星.png"/></div>
            <div className="xx"><img src="../../../assets/images/cloubStoreIndex/已评星.png"/></div>
            <div className="xx"><img src="../../../assets/images/cloubStoreIndex/半评星.png"/></div>
            <div className="xx"><img src="../../../assets/images/cloubStoreIndex/未评星.png"/></div>
   */