import React,{Component} from 'react' ;

import { WingBlank, WhiteSpace ,SearchBar ,Flex} from 'antd-mobile';

import { AddressPicker } from 'widget';

import './TopLess.less' ;
import { inject, observer } from 'mobx-react';

import IndexUtil from './../../global/IndexUtil' ;
import Util from 'util';

/**
 * 云店首页搜索和定位
 */
@inject("home") 
@observer
class Top extends Component{

    constructor(props,context){

        super(props,context) ;

        this.storesHome = this.props.home ; 

        //this.getPostion();
    }
    componentWillMount() {
		let cityInfo = Util.getCityID()
		if ('cityName' in cityInfo) {
			this.cityInfo = cityInfo
			this.storesHome.setPosition({
				label: cityInfo.cityName,
                value: cityInfo.postCode,
                provinceCode: cityInfo.provinceCode
			})
		} else {
			this.getPostion();
		}
	}

    getPostion =() => {
    //根据经纬度获取当前所在地
    let res = localStorage.getItem('myPosition') ;
    console.log(res)
    //默认一个值
    if(res == null){
        //29.6213983210,106.4917498827
        //res = {latitude:23.103679,longitude:113.436542}
        //重庆互联网产业园
        res = {latitude:29.6213983210,longitude:106.4917498827}
    }else{
        res = JSON.parse(res) ; 
    }
    let {latitude,longitude} = res ; 
    var data={
            location:latitude+","+longitude,
            /*腾讯地图开发许可key*/
    　　　　　　 key:"HUOBZ-E53WD-R724J-HIKXM-VQ3NJ-HIFIZ",
    　　　　　　 get_poi:0,
            coord_type:5
    　　　　}
        var url="http://apis.map.qq.com/ws/geocoder/v1/?";
        data.output="jsonp";  
        $.ajax({
            type:"get",
            dataType:'jsonp',
            data:data,
            jsonp:"callback",
            jsonpCallback:"QQmap",
            url:url,
            success:function(json){
                //console.log(json);
                
                //console.log(json.result.address_component.city);

            },
            error : function(err){alert("服务端错误，请刷新浏览器后重试")}
    
        }).done(json=>{
            console.log(json);
            //this.storesHome.setPosition({label:json.result.address_component.city,postCode:'00001'})
        })
    }

    componentDidMount(){
        this.storesHome.getLogoData() ;
    }
    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

    handleSearch = () => {
        window.app.router.push('/search') ;
    }
    handleClickLogo =(redirectUrl) =>{
        console.log(redirectUrl);
        
        if(redirectUrl==null||redirectUrl.length==0){
            location.href = 'https://www.ford.com.cn/' ;
        }else{
            IndexUtil.toUrl(redirectUrl)
        }
    }

//<SearchBar placeholder='搜索您想要的车型' cancelText=''  />
    render(){
        let {position,logoData} = this.storesHome.state ; 
        
        return(
            <div>
                <Flex className="home-header">
                    <div className="logo" onClick={e=>{
                        this.handleClickLogo(logoData.redirectUrl)
                    }}>
                        <img src={logoData.imgUrl} />
                    </div>
                    <Flex.Item className="input-wrap">
                        <div className="input-box" onClick={this.handleSearch}>
                            <span>搜索您想要的车型</span>
                            <i className="iconfont icon-sousuo"></i>
                        </div>
                    </Flex.Item>
                    <Flex className="position" onClick={this.selectAddr}>
                        <i className="iconfont icon-dingwei"></i>
                        <span>{position && position.label }</span>
                    </Flex>
                </Flex>

                <AddressPicker ref="addrModal" ok={(item) => {
                    this.storesHome.setPosition(item);
                }} />
            </div>
        )
        
    }
}
/**
 * return(
            <div className='indextop'>
                <div className='indextop-logo'>
                    <img src='assets/images/cloubStoreIndex/fute-logo.png' />
                </div>
                <div className='indextop-search'>
                    <SearchBar placeholder='搜索您想要的车型' cancelText=''  />
                </div>
                <div className='indextop-map' onClick={this.handleMapClick}>
                    <div>
                        <img src='assets/images/cloubStoreIndex/定位.png' />
                    </div>
                    <div>重庆市</div>
                </div>
            </div>
        ) ;
 */
module.exports = Top ; 