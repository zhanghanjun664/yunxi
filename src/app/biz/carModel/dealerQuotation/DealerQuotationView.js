/**
 * Created by zhang.weihua on 2018/3/22.
 */

import React, { PropTypes, Component } from 'react';
import { Flex, Button, Icon, Toast, } from 'antd-mobile';
import { StarRange, Tabs, RefreshListView, } from 'widget';
import { extend, get, cloneDeep } from 'lodash';
import './DealerQuotationLess.less';
import { inject, observer } from 'mobx-react';
import Util from 'util';

@inject('dealerQuotation')
@observer
class DealerQuotationView extends Component {

    constructor(props, context) {
        super(props, context);

        this.tabs = ['离我最近', '价格最低'];
        this.type = 1;   //1-距离最近， 2-评分最高
        this.stores = this.props.dealerQuotation;
        this.itemId = this.props.location.query.itemId
    }

    componentDidMount() {
        this.refs.list.start();
    }

    callMe(rowData) {
        location.href = 'tel:' + rowData.salePhone;
    }


    fetchData = (pageNum, success, error) => {
        let { postCode } = Util.getCityID()
        let { longitude, latitude } = Util.getCoordinate()
        let params = {   //在这里添加剩余的参数就好了
            pageSize: 20,
            pageNum: 1,
            type: this.type,
            carId: this.itemId,
            cityId: postCode,
            longitude,
            latitude
        }


        this.stores.getDealerList(params).then((result) => {
            let { data, resultCode, resultMsg } = result;
            success(data.list, data.pageNum, data.pages);
        }, (e) => {
            error(e)
        })

    }

    onTabClick = (index) => {
        this.type = index == 0 ? 1 : 3;
        this.refs.list.onRefresh();
    }

    toUrl(url) {
        let query = window.app.router.location.query
		let urls = `${url}&itemId=${query.itemId}`
        window.app.routerGoTo(urls)
    }
    noOpen() {
        Toast.info('此功能暂未开放')
    }


    renderRow = (rowData, sectionID, rowID) => {
        let activity = rowData.activities && rowData.activities.length > 0 ? rowData.activities[0] : null;
        return (
            <div className="inquiry-item">
                <Flex className="inquiry-header" justify="between">
                    <div className="company-name ellipsis">
                        {rowData.dealerName}
                    </div>

                    <StarRange number={rowData.score} />
                </Flex>
                {rowData.shops && rowData.shops.length > 0 &&
                    rowData.shops.map((item, index) => {
                        return (
                            <Flex className="address" justify="between" key={index}>
                                <div className="ellipsis text-width">
                                    <span className="iconfont icon-dizhi"></span>
                                    <span className="text">{item.address}</span>
                                </div>

                                <span className="distance">&lt;{item.distance && (item.distance / 1000).toFixed(2)}km</span>
                            </Flex>

                        )
                    }
                    )}
                {activity && (
                    <div className="lottery-text" onClick={this.toUrl.bind(this, '/activityDetails?from=dealerQuotation&activityId=' + activity.id)}>
                        <div className="icon-yundian"></div>
                        {activity.name}
                    </div>
                )}
                <Flex className="price-wrap">
                    <span className="fz_24">参考报价：</span>
                    <span className="fz_36 color_orange">￥{Util.changeMoney(rowData.price)}万</span>
                    <span className={rowData.stock == 1 ? '"iconfont' : "iconfont icon-xianche"}></span>
                </Flex>
                <Flex justify="between">
                    <Button className="inquiry-btn" onClick={e => this.callMe(rowData)}>致电</Button>
                    <Button className="inquiry-btn" onClick={this.noOpen.bind(this)}>在线客服</Button>
                    <Button className="inquiry-btn btn-orange" onClick={this.toUrl.bind(this, '/askprice?from=dealerQuotation')}>查询底价</Button>
                </Flex>
            </div>
        )
    }


    render() {
        return (

            <div className="dealer-quotation-page">
                <Tabs
                    className="dealer-tabs"
                    tabs={this.tabs}
                    onTabClick={this.onTabClick}
                ></Tabs>
                <RefreshListView
                    fetchData={this.fetchData}
                    renderRow={this.renderRow}
                    ref="list"
                    className="inquiry-list"
                    pullToRefresh={true}
                />
                <div className="price-tips">
                    <span className="iconfont icon-xinxi"></span>
                    <span>所有报价均来自经销商，实际价格以店内报价为准</span>
                </div>
            </div>


        )
    }
}

module.exports = DealerQuotationView;


