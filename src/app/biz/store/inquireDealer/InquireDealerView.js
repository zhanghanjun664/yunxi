/**
 * Created by zhang.weihua on 2018/3/23.
 */
import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, } from 'antd-mobile';
import  {debounce} from 'lodash';
import { StarRange, AddressPicker, Tabs, RefreshListView, } from 'widget';
import './InquireDealerLess.less';
import { inject, observer } from 'mobx-react';
import TabBar from 'pubBiz/tabBar/TabBarView'

@inject('inquireDealer')
@observer
class InquireDealerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.tabs = ['离我最近', '评分最高'];
        this.type = 1;   //1-距离最近， 2-评分最高
        this.stores = this.props.inquireDealer;
        this.state = {
            cityName: '重庆市',
            delayRresh: debounce(x=> {
                this.refs.list.start();
              }, 500)
        }
    }

    shouldComponentUpdate() {
        // this.state.delayRresh();
         return true;
     }

    componentDidMount() {
        const myCity = this.getMyCity();
        console.log(myCity)
        const cityName = myCity && myCity.cityName ? myCity.cityName: '重庆市'
        this.setState({cityName})
        this.refs.list.start();
    }

    callMe(item) {
        location.href = 'tel:' + item.salePhone;
    }

    toUrl(url){
        let urls = url + '&from=inquireDealer'
        window.app.routerGoTo(urls)
    }
    
    selectAddr = () => {
        this.stores.changeDirection();
        this.refs.addrModal.openModal();

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

    // 打开并调起地图
    go2Map = (address) => {
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
        let geocoder = new qq.maps.Geocoder(callbacks);
        geocoder.getLocation(address);
    }

    fetchData = (pageNum, success, error) => {
        let params = {   //在这里添加剩余的参数就好了
            pageSize:20,
            pageNum:1,
            cityId:'440000000000',
            longitude:23.10674,
            latitude:113.440332,
            carId:0,
            type:this.type

        }

        let myPosition = this.getMyPosition()

        let myCity = this.getMyCity()
        
        if(myCity && myCity.postCode) {
            params.cityId = myCity.postCode
        }

        if(myPosition && myPosition.longitude && myPosition.latitude) {
            params.longitude = myPosition.longitude;
            params.latitude = myPosition.latitude;
        }

        this.stores.getDealerList(params).then((result) => {
            let { data, resultCode, resultMsg } = result;
            if(resultCode !== 0) {
                return;
            }
            let list = [],pageNum=1,pages=0
            if(data&&data.list.length){
                list = data.list
                pageNum = data.pageNum
                pages = data.pages
            }
            success(list, pageNum, pages);
        }, (e) => {
            error(e)
        })

    }

    onTabClick = (index) => {
        this.type = index + 1; 
        this.refs.list.onRefresh();
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="inquiry-item">
                <Flex className="inquiry-header" justify="between">
                    <div className="company-name ellipsis" onClick={e => this.toUrl('/cloubStore/index?tabBarType=1&dealerId=' + rowData.id)}>{rowData.dealerName}</div>
                    <StarRange number={rowData.score} />
                </Flex>
                {
                    rowData.shops && rowData.shops.length > 0 &&  rowData.shops.map((item, index)=>{
                        return (
                            <div key={index}>
                <Flex className="address" justify="between">
                    <div className="ellipsis text-width">
                        <span className="iconfont icon-dizhi"></span>
                        <span className="text">{item.address}</span>
                    </div>
                    <div className="to-here color_orange" onClick={e => { this.go2Map(item.address)}}>
                        <span className="iconfont icon-ditu"></span>
                        <span>到这里</span>
                    </div>
                </Flex>
                <div className="color_gray ml-34 fz_24">&lt;{item.distance&&(item.distance/1000).toFixed(2)}km</div>
                </div>
                        )
                    })
                }
                
                {rowData.activities&&rowData.activities.length > 0 ?
                <div className="lottery-text"  onClick={e=> {this.toUrl('/activityDetails?activityId=' + rowData.activities[0].id)}}>
                    <div className="icon-yundian"></div>{rowData.activities[0].name}
                </div>:''}
                <Flex justify="between" className="btn-list">
                    <Button className="inquiry-btn" onClick={e=> this.callMe(rowData)}>致电</Button>
                    <Button className="inquiry-btn">在线客服</Button>
                    <Button className="inquiry-btn btn-orange" onClick={e=>this.toUrl('/askprice?dealerId=' + rowData.id)}>查询底价</Button>
                </Flex>
            </div>
        )
    }


    render() {
        return (
            <div className="inquire-dealer-page">
                <Tabs
                    className="dealer-tabs"
                    tabs={this.tabs}
                    onTabClick={this.onTabClick}
                    exact={
                        <Flex className="position-wrap" justify="center" onClick={this.selectAddr}>
                            <div className="line"></div>
                            <span className="iconfont icon-dingwei"></span>
                            <span className="ellipsis">{this.state.cityName}</span>
                        </Flex>
                    }
                ></Tabs>

                <RefreshListView
                    fetchData={this.fetchData}
                    renderRow={this.renderRow}
                    ref="list"
                    className="inquiry-list"
                    pullToRefresh={this.stores.state.isPullToRefresh}
                />

                <div className="price-tips">
                    <span className="iconfont icon-xinxi"></span>
                    <span>所有报价均来自经销商，实际价格以店内报价为准</span> 
                </div>

                <AddressPicker ref="addrModal" ok={(item) => {
                    console.log('item:', item)
                    this.setState({cityName: item.label})
                    localStorage.setItem('myCity', JSON.stringify({cityName: item.label, postCode: item.value, provinceCode: item.provinceCode}))
                    this.refs.list.onRefresh();
                    }} 
                    changeDirection={this.stores.changeDirection}
                    onClose={this.stores.changeDirection}
                />
                <TabBar selectedTab='searchTab' />                
            </div>
        )
    }
}

module.exports = InquireDealerView;