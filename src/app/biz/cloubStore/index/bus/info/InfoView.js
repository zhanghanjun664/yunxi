import React from 'react';
import './InfoLess.less';
import { inject,observer } from 'mobx-react';

import {StarsList} from 'biz/cloubStore/index/global/stars/StarsView' ; 

import IndexUtil from './../../global/IndexUtil' ; 

@inject("cloubStoreIndex")
@observer
class InfoView extends React.Component {

    constructor(props){
      super(props);
      this.stores = this.props.cloubStoreIndex;
    }

    componentDidMount() {
      let params = {
        longtitude:113.436542,
        latitude:23.103679,
        areaCode:'cq'
      }
      //通过微信定位获取到了当前人员定位信息
      let loca = this.getMyPosition() ;
      if(loca!=null){
        console.log(loca);
        
        let areaCode = this.getMyCity().postCode ;
        params = {
          longtitude:loca.longitude ,
          latitude:loca.latitude,
          'areaCode':areaCode
        } ;
      }

      this.stores.getdealerInfo(params);
    }
    converKm(val){
      val = Number(val) ; 
      if(val<1000){
        return val.toFixed(2)+'m' ;
      }else{
        return (val/1000).toFixed(2)+'km' ;
      }
    }

    // 获取我的城市
    getMyCity = () => {
      let myCityStr = localStorage.getItem('myCity');
      let myCity = null;
      try{
          myCity = JSON.parse(myCityStr);
      }catch(e){
          console.warn(e);
      }
      return myCity
    }
    // 获取我的经纬度
    getMyPosition = () => {
      let myPosStr = localStorage.getItem('myPosition');
      let myPosition = null;
      try {
          myPosition = JSON.parse(myPosStr);
      } catch(e) {
          console.warn(e);
      }
      return myPosition
    }
    //打开地图
    openMap =(dealerInfo) =>{

      let callbacks={
        complete:function(results){
        let name = results.detail.address
        let { lat, lng } =  results.detail.location
        wx.openLocation({
              latitude: lat, // 纬度，浮点数，范围为90 ~ -90
              longitude: lng, // 经度，浮点数，范围为180 ~ -180。
              name: name, // 位置名
              address: name, // 地址详情说明
              scale: 19, // 地图缩放级别,整形值,范围从1~28。默认为最大
              infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
          });
        }
      }
      //TODO 后面需要考虑是不是直接将经销商的经纬度定为后端传递过来的数据
      if(dealerInfo.shops!=null&&dealerInfo.shops.length!=0){
        let geocoder = new qq.maps.Geocoder(callbacks);
        geocoder.getLocation(dealerInfo.shops[0].address);
      }
    
      
    }

    render() {
      let {dealerInfo} = this.stores.state ;
      console.log(dealerInfo);
      
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
                    <div className='infoPage-content-info-m-l' onClick={e=>{this.openMap(dealerInfo)}}>
                      <i className='iconfont icon-ditu'></i>
                      <p className="p1">到这里</p>
                    </div>
                    <div className='infoPage-content-info-m-r'>
                      <p className="p2">距您{`<`}{
                        (dealerInfo.shops!=null&&dealerInfo.shops.length!=0)?
                        this.converKm(dealerInfo.shops[0].distance):''
                      }
                      </p>
                      <span className='infoPage-content-info-m-r-sep'></span>
                      <a href={'tel:'+dealerInfo.salePhone}>
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