/**
 * Created by zhang.weihua on 2018/3/21.
 */

import React, { PropTypes, Component } from 'react';
import { RefreshListView } from 'widget';
import { Flex } from 'antd-mobile';

class SubscribeList extends Component {

    constructor(props, context) {
        super(props, context);
        
        // console.log(props.mySubsribe.state);
    }


    componentDidMount(){
        this.refs.list.start();
    }


    refreshList = () => {
        this.refs.list.refreshList2();
    }


    fetchData = async (pageNum, success, error) => {
        let params = {
            pageNum: pageNum,
            pageSize: 10,
            appointmentStatus: this.props.status
        };

        let {data, resultCode, resultMsg} = await this.props.fetchData(params);
        success(data.list, data.pageNum, data.total);

    }


    renderRow = (rowData, sectionID, rowID) => {

        return (
            <div className='mo_listItem'>
                <div className='mo_listTitle'>
                    <div><span className='mo_yysj'>预约试驾</span>预约号:01</div>
                    <div>状态：待支付</div>
                </div>
                <div className='mo_listInfo'>
                    <div>
                        <div>意向车型:</div>
                        <div className='mo_carTags'>
                            <span>福特福克斯</span>
                            <span>三厢</span>
                            <span>EcoBoost</span>
                            <span>1.5T</span>
                            <span>自动旗舰型说法来是否是否</span>
                        </div>
                    </div>

                    <div>
                        <div>经销商:</div>
                        <Flex className='flex-1'>
                            <div className='flex-1'>广州恒福福特</div>
                            <div className='mo_listInfo_tel'>
                                <span className='iconfont icon-dianhua'></span>
                                <span>021-12345612</span>
                            </div>
                        </Flex>

                    </div>

                    <div>
                        <div></div>
                        <Flex className='flex-1'>
                            <div className='mo_listInfo_area'>
                                <span className='iconfont icon-dizhi'></span>
                                <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                            </div>
                            <div className='mo_listInfo_map'>
                                <span className='iconfont icon-ditu'></span>
                                <span>到这里</span>
                            </div>
                        </Flex>


                    </div>

                    <div className='mo_list_userInfo'>
                        <div>预约信息:</div>
                        <div>张先生</div>
                        <div>13012123123</div>
                    </div>

                    <div>
                        <div>预约时间:</div>
                        <div>2018.10.10</div>
                    </div>

                    <div>
                        <div>到店时间:</div>
                        <div>2018.01.10</div>
                    </div>

                </div>

                <div className='mo_btnBox'>
                    <div>查看详情</div>
                    <div className='mo_goPay'>去支付</div>
                </div>

            </div>
        )
    }

    render() {
        let style = this.props.style || {};
        return (
            <RefreshListView
                fetchData={this.fetchData}
                renderRow={this.renderRow}
                ref="list"
                first={false}
                useBodyScroll={false}
                style={style}
                pullToRefresh={true}
            />

        )
    }
}

module.exports = SubscribeList;




