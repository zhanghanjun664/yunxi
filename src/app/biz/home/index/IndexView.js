/**
 * Created by zhang.weihua on 2018/3/19.
 */
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Flex, Toast, Carousel, } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './IndexLess.less';
import { AddressPicker } from 'widget';
import TabBar from 'pubBiz/tabBar/TabBarView'
import district from 'widget/addressPicker/district';

@inject("home")
@observer
class HomeView extends Component {

    constructor(props, context) {
        super(props, context);
        this.stores = this.props.home;
    }


    componentDidMount() {
        this.getData();
        this.getCurrCity();
    }

    componentWillMount(){
    }

    getCurrCity(){
        let self = this;
        let callbacks = {
            complete:function(results){
                // 地址名数组
                let nameArr = results.detail.detail.split(',');
                // 省份名
                let provinceName = nameArr[nameArr.length -2];
                // 城市名
                let cityName = nameArr[nameArr.length -3];
                // 区域码
                let postCode = '';
                // 查询城市区域码
                if(0 !== district.length){
                    district.map((province, i) => {
                        if(0 !== province.children.length && (-1 !== provinceName.indexOf(province.label))){
                            province.children.map((city, j) => {
                                if(-1 !== cityName.indexOf(city.label) ){
                                    // Toast.info(JSON.stringify(city));
                                    postCode = city.value;
                                    return;
                                }
                            })
                        }
                    })
                }
                localStorage.setItem('myCity', JSON.stringify({provinceName, cityName, postCode}));
                self.stores.setPosition({label: cityName, value: postCode})
                // Toast.info(JSON.stringify({cityName, postCode, provinceName}), 10)
            }
        }

        wx.ready(function(){
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed; // 速度，以米/每秒计
                    let accuracy = res.accuracy; // 位置精度
                    localStorage.setItem('myPosition', JSON.stringify(res));
                    let cs = new qq.maps.CityService(callbacks);
                    cs.searchCityByLatLng(new qq.maps.LatLng(latitude, longitude));
                }
            });  
        })
      
    }

    //获取数据
    getData = () => {
        this.stores.getIndexData();

    }

    // 轮播图跳转
    toUrl(url) {
        // window.app.routerGoTo(url);
        if(url){
            let urls = Util.getUrl(url)
            location.href = urls
        }
    }

    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

    // 跳转到详情
    goToDetail(itemId) {
        window.app.routerGoTo('/carModelDetail?itemId=' + itemId)
    }
    
    handleClickLogo(data){
        if(data.redirectType == 2){
            let urls = Util.getUrl(data.redirectUrl)
            location.href = urls
        }
        if(data.redirectType == 3){
            console.log(data)
            let urls = '/carModelDetail?itemId='+data.itemId
            window.app.routerGoTo(urls)
        }
    }
    noOpen(){
        Toast.info('此功能暂未开放')
    }

    render() {

        let { bannerList, newsList, hotCarList, discountCarList, hotActivityList, position, quickLinkList, logoData, hideHotCar } = this.stores.state;
        
        return (
            <div className="home-page">
                <Flex className="home-header">
                    <div className="logo" onClick={this.handleClickLogo.bind(this, logoData)}>
                        <img src={logoData.imgUrl} />
                    </div>
                    <Flex.Item className="input-wrap" onClick={this.noOpen.bind(this)}>
                        <div className="input-box">
                            <span>搜索您想要的车型</span>
                            <i className="iconfont icon-sousuo"></i>
                        </div>

                    </Flex.Item>
                    <Flex className="position" onClick={this.selectAddr}>
                        <i className="iconfont icon-dingwei"></i>
                        <span className="ellipsis">{position && position.label}</span>
                    </Flex>
                </Flex>
                <div className="banner">
                    {
                        bannerList && bannerList.length > 0 && (
                            <Carousel
                                className="banner-slide"
                                autoplay={true}
                                infinite
                                selectedIndex={0}
                                dots={false}
                                swipeSpeed={35}>
                                {
                                    bannerList.map((item, index) => {
                                        return (
                                            <div className="banner-item-wrap" key={'banner' + index} onClick={this.handleClickLogo.bind(this, item)}>
                                                <img className="banner-item" src={item.imgUrl} />
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        )
                    }
                </div>

                <div className="nav-wrap">
                    <Flex className="news-wrap">
                        <div className="news-title"><span>福特</span> <span>头条</span></div>
                        <Flex.Item>
                            {
                                newsList.length > 0 ? (
                                    <Carousel
                                        vertical
                                        dots={false}
                                        dragging={false}
                                        swiping={false}
                                        autoplay
                                        infinite
                                    >
                                        {newsList.map((item, index) => {
                                            return (
                                                <div className="news-item ellipsis" key={'news' + index} onClick={this.toUrl.bind(this, item.redirectUrl)}>
                                                    <span className="tag">围观</span>{item.title}
                                                </div>
                                            )
                                        })}
                                    </Carousel>
                                ) : <div>暂无资讯</div>
                            }

                        </Flex.Item>

                        <div className="more-news">更多</div>
                    </Flex>

                    <Flex className="nav" wrap="wrap">
                        {quickLinkList && quickLinkList.length > 0 && quickLinkList.slice(0, 4).map((item, index) => {
                            return (
                                <div className="nav-item" onClick={() => { this.toUrl(item.redirectUrl) }} key={'nav' + index}>
                                    <img src={item.imgUrl} />
                                    <span>{item.name}</span>
                                </div>
                            )
                        })}

                        <div className="nav-item" onClick={() => { window.app.routerGoTo('quickLink') }}>
                            <img src="assets/images/home/gengduo.png" />
                            <span>更多</span>
                        </div>
                    </Flex>
                </div>
                {
                    hotCarList && hotCarList.length > 0 && (
                        <div className={hideHotCar?'hidden':'home-module hot-cars'}>
                            <Flex className="home-module-head" justify="center">
                                <span className="icon icon-hot"></span><span>热门车型</span>
                            </Flex>
                            <Flex className="hot-cars-content">
                                {hotCarList.map((item, index) => {
                                    return (
                                        <Flex.Item className="car-item" key={'hotcar' + index}>
                                            <img src={item.imgUrl} onClick={this.goToDetail.bind(this, item.itemId)} />
                                        </Flex.Item>
                                    )
                                })}

                            </Flex>
                        </div>
                    )
                }

                {
                    // 2期
                    false && (
                        <Flex className="home-module recomment-cars" align="start">
                            <div className="img-wrap">
                                <img src="assets/images/home/jxs_bg.png" />
                            </div>
                            <Flex.Item className="jxs-info">
                                <div className="jxs-name ellipsis-two">重庆安福大石坝分公司(重庆安福
                            百俊）</div>
                                <div className="jxs-position ellipsis">距您19.5km  |  江北区/大石坝大庆村</div>
                                <Flex justify="between">
                                    <div className="to-here">
                                        <span className="iconfont icon-ditu"></span>
                                        <span>到这里</span>
                                    </div>
                                    <div className="to-phone">
                                        <span></span>
                                        <span className="iconfont icon-dianhua"></span>
                                    </div>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    )
                }

                {discountCarList && discountCarList.length > 0 && (
                    <div className="home-module discount-cars">
                        <Flex className="home-module-head" justify="center">
                            <span className="icon icon-discount"></span><span>超值好车</span>
                        </Flex>
                        <div className="product-list">
                            {discountCarList.map((item, index) => {
                                return (
                                    <div className="product-item" key={'discountcar' + index}>
                                        <div className="img-wrap">
                                            <img src="assets/images/home/car02.png" />
                                        </div>
                                        <div className="product-name ellipsis-two">
                                            福克斯 2015款 1.5T自动精英型<span className="color-sky">(库存车型，数量有限)</span>
                                        </div>
                                        <div className="product-price">
                                            <span>￥95,800</span>
                                            <del>￥100,000</del>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                )}


                {
                    // 2期
                    false && (
                        <div className="home-module choose-vedio">
                            <Flex className="home-module-head" justify="center">
                                <span className="icon icon-vedio"></span><span>视频鉴赏</span>
                            </Flex>
                            <div className="card">
                                <div className="card-content">
                                    <img src="assets/images/home/test_shipin.png" />
                                </div>
                                <div className="card-footer vedio-footer">
                                    长安福特官方品牌视频
                        </div>
                            </div>

                        </div>
                    )
                }

                {hotActivityList && hotActivityList.length > 0 && (
                    <div className="home-module last-activity">
                        <Flex className="home-module-head" justify="center">
                            <span className="icon icon-activity"></span><span>为你推荐</span>
                        </Flex>
                        <div>
                            {hotActivityList.map((item, index) => {
                                return (
                                    <div className="card mb-30" key={'activity' + index} onClick={(e)=> window.app.routerGoTo('/activityDetails?id=' + item.id)}>
                                        <div className="card-content">
                                            <img src={item.image}/>
                                        </div>
                                        <div className="card-footer activity-footer">
                                            <span></span><span>{item.name}</span>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                )}

                <AddressPicker ref="addrModal" ok={(item) => {
                    this.stores.setPosition(item);
                }} />

                <TabBar selectedTab='indexTab' />
            </div>
        )
    }
}

module.exports = HomeView;