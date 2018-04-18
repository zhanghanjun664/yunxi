import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './SpecialListLess.less';
import { SearchBar,Drawer, List , Flex, Carousel } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'
import cx from 'classnames'

@inject("specialList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class SpecialList extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.specialList;
    }

    componentDidMount() {
        this.getData();
    }

    //获取数据
    getData = () => {
        this.stores.getSpecialData();
    }

    handleClickLogo(data){
        console.log(data)
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

    render() {

        let { specialList,bannerList } = this.stores.state;

        return (
            <div className="special-list-page">
                <div className="banner">
                    {
                        bannerList && bannerList.length>0 && (
                            <Carousel
                                className="banner-slide"
                                autoplay={true}
                                infinite
                                selectedIndex={0}
                                dots={true}
                                swipeSpeed={35} >
                                {
                                    bannerList.map((item, index) => {
                                        return (
                                            <div className="banner-item-wrap" key={index} onClick={this.handleClickLogo.bind(this, item)}>
                                                <img className="banner-item" src={item.imgUrl} />
                                            </div>
                                        )
                                    })
                                }

                            </Carousel>

                        )
                    }
                </div>
                <div className="home-module discount-cars">
                    <div className="discount-header">
                        <span className="discount-title">超值好车</span>
                        <span className="discount-address"><i className="icon iconfont  icon-dingwei"></i>城市名</span>
                    </div>
                    <div className="product-list">
                        {specialList.map((item, index) => {
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
                                    <div className='product-item-label'>
                                        <i className='iconfont icon-remenhaoche' />
                                        <span>热门好车</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="product-item">
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
                            <div className='product-item-label'>
                                <i className='iconfont icon-remenhaoche' />
                                <span>热门好车</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
module.exports = SpecialList;
