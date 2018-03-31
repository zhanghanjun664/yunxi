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
import TabBar from 'pubBiz/tabBar/tabBarView'

@inject("home")
@observer
class HomeView extends Component {

    constructor(props, context) {
        super(props, context);
        this.stores = this.props.home;
    }


    componentDidMount() {
        this.getData();


    }

    //获取数据
    getData = () => {
        this.stores.getIndexData();

    }

    toUrl(url) {
        window.app.routerGoTo(url);
        // location.href = url
    }

    selectAddr = () => {
        this.refs.addrModal.openModal();
    }

    // 跳转到详情
    goToDetail(e) {
        window.app.routerGoTo('/carModelDetail')
    }

    render() {

        let { bannerList, newsList, hotCarList, discountCarList, hotActivityList, position } = this.stores.state;

        return (
            <div className="home-page">
                <Flex className="home-header">
                    <div className="logo"></div>
                    <Flex.Item className="input-wrap">
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
                                        <div className="banner-item-wrap" key={'banner' + index} onClick={this.toUrl.bind(this, item.redirectUrl)}>
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
                        <div>
                            <span className="text1">福特</span>
                            <span className="text2">头条</span>
                        </div>
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
                                ) : null
                            }

                        </Flex.Item>

                        <div className="more-news">更多</div>
                    </Flex>
                    <Flex className="nav">
                        <div className="nav-item" onClick={() => { window.app.routerGoTo('testdrive') }}>
                            <img src="assets/images/home/shichengshijia.png" />
                            <span>预约试驾</span>
                        </div>
                        <div className="nav-item" onClick={() => { window.app.routerGoTo('askprice') }}>
                            <img src="assets/images/home/xundijia.png" />
                            <span>查询底价</span>
                        </div>
                        <div className="nav-item">
                            <img src="assets/images/home/kefuzhongxin.png" />
                            <span>在线客服</span>
                        </div>
                        <div className="nav-item">
                            <img src="assets/images/home/gouchejisuanqi.png" />
                            <span className="ellipsis">金融方案</span>
                        </div>
                        <div className="nav-item" onClick={() => { window.app.routerGoTo('quickLink') }}>
                            <img src="assets/images/home/gengduo.png" />
                            <span>更多</span>
                        </div>
                    </Flex>
                </div>
                {
                    hotCarList && hotCarList.length > 0 && (
                        <div className="home-module hot-cars">
                            <Flex className="home-module-head" justify="center">
                                <span className="icon icon-hot"></span><span>热门车型</span>
                            </Flex>
                            <Flex className="hot-cars-content">
                                {hotCarList.map((item, index) => {
                                    return (
                                        <Flex.Item className="car-item" key={'hotcar' + index}>
                                            <img src={`assets/images/home/chexing_bg0${index + 1}.png`} onClick={e => { this.goToDetail(e) }} />
                                        </Flex.Item>
                                    )
                                })}

                            </Flex>
                        </div>
                    )
                }

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

                {hotActivityList && hotActivityList.length > 0 && (
                    <div className="home-module last-activity">
                        <Flex className="home-module-head" justify="center">
                            <span className="icon icon-activity"></span><span>为你推荐</span>
                        </Flex>
                        <div>
                            {hotActivityList.map((item, index) => {
                                return (
                                    <div className="card mb-30" key={'activity' + index}>
                                        <div className="card-content">
                                            <img src="assets/images/home/banner02.png" />
                                        </div>
                                        <div className="card-footer activity-footer">
                                            <span>最高15000元置换补贴</span><span>24期贷款0利率</span>
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