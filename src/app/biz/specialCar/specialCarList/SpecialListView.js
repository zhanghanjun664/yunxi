import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './SpecialListLess.less';
import { SearchBar,Drawer, List , Flex, Carousel } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'
import { RefreshListView } from 'widget';
import Util from 'util';

@inject("specialList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class SpecialList extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.specialList;
    }

    componentDidMount() {
        this.refs.list.start()
        this.stores.setStyle({
            height: Util.getScrollHeight(['banner', 'discount-header'])
        })
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

    fetchData = async (pageNum, success, error) => {
        let params = {
            pageNum: pageNum,
            pageSize: 5,
            cityCode: '0000'
        };

        let { data, resultCode, resultMsg } = await this.stores.getSpecialList(params);
        success(data.list, data.pageNum, data.pages);
    }

    toUrl(url){
        window.app.routerGoTo(url)
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="product-item" onClick={this.toUrl.bind(this, '/carModelDetail?itemId='+rowData.id+"&dealerId="+rowData.dealerId)}>
                <div className="img-wrap">
                    <img src={rowData.imgUrl} />
                </div>
                <div className="product-name ellipsis-two">
                    {rowData.name}<span className="color-sky">({rowData.adWord})</span>
                </div>
                <div className="product-price">
                    <span>￥{rowData.advicePrice}</span>
                    <del>￥{rowData.sellPrice}</del>
                </div>
                {/* <div className='product-item-label'>
                    <i className='iconfont icon-remenhaoche' />
                    <span>热门好车</span>
                </div> */}
            </div>
        )
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
                        <span className="discount-address"><i className="icon iconfont  icon-dingwei"></i>{Util.getCityID().cityName}</span>
                    </div>
                    
                    <div className='product-list'>
                        <RefreshListView
                            fetchData={this.fetchData}
                            renderRow={this.renderRow}
                            ref="list"
                            first={false}
                            useBodyScroll={false}
                            style={this.stores.state.style}
                            pullToRefresh={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
module.exports = SpecialList;
