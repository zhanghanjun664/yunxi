/**
 * Created by zhang.weihua on 2018/3/21.
 */

import React, { PropTypes, Component } from 'react';
import { RefreshListView } from 'widget';
import { Flex } from 'antd-mobile';
import Util from 'util';

class SubscribeList extends Component {

    constructor(props, context) {
        super(props, context);
    }


    componentDidMount() {
        this.refs.list.start();
    }


    refreshList = () => {
        this.refs.list.refreshList2();
    }


    fetchData = async (pageNum, success, error) => {
        let params = {
            pageNum: pageNum,
            pageSize: 5,
            appointmentStatus: this.props.status
        };

        let { data, resultCode, resultMsg } = await this.props.fetchData(params);
        success(data.list, data.pageNum, data.pages);

    }


    renderRow = (rowData, sectionID, rowID) => {
        let appointmentStatus, btnText;
        switch (rowData.appointmentStatus) {
            case 1:
                appointmentStatus = '待到店';
                btnText = <div className='mo_goPay'>取消预约</div>
                break
            case 2:
                appointmentStatus = '已完成';
                btnText = <div className='mo_goPay'>去评价</div>
                break
            case 3:
                appointmentStatus = '已取消';
                btnText = <div className='mo_goPay'>再次预约</div>
                break
        }
        return (
            <div className='mo_listItem'>
                <div className='mo_listTitle'>
                    <div className='ellipsis'><span className='mo_yysj'>预约试驾</span>预约号:{rowData.appointmentId}</div>
                    <div>状态：{appointmentStatus}</div>
                </div>
                <div className='mo_listInfo'>
                    <div>
                        <div>意向车型:</div>
                        <div className='mo_carTags'>
                            {rowData.vehicleModel}
                            {/* <span>福特福克斯</span>
                            <span>三厢</span>
                            <span>EcoBoost</span>
                            <span>1.5T</span>
                            <span>自动旗舰型说法来是否是否</span> */}
                        </div>
                    </div>

                    <div>
                        <div>经销商:</div>
                        <Flex className='flex-1'>
                            <div className='flex-1'>{rowData.dealer&&rowData.dealer.name}</div>
                            <div className='mo_listInfo_tel'>
                                <span className='iconfont icon-dianhua'></span>
                                <span>{rowData.dealer&&rowData.dealer.phone}</span>
                            </div>
                        </Flex>

                    </div>

                    <div>
                        <div></div>
                        <Flex className='flex-1'>
                            <div className='mo_listInfo_area'>
                                <span className='iconfont icon-dizhi'></span>
                                <span>{rowData.dealer&&rowData.dealer.address}</span>
                            </div>
                            <div className='mo_listInfo_map'>
                                <span className='iconfont icon-ditu'></span>
                                <span>到这里</span>
                            </div>
                        </Flex>


                    </div>

                    <div className='mo_list_userInfo'>
                        <div>预约信息:</div>
                        <div>{rowData.memberName}</div>
                        <div>{rowData.memberMobile}</div>
                    </div>

                    <div>
                        <div>预约时间:</div>
                        <div>{rowData.createTime&&Util.formatDate(rowData.createTime)}</div>
                    </div>

                    <div>
                        <div>到店时间:</div>
                        <div>{rowData.arrivalTime&&Util.formatDate(rowData.arrivalTime)}</div>
                    </div>

                </div>

                <div className='mo_btnBox'>
                    <div>查看详情</div>
                    {/* <div className='mo_goPay'>去支付</div> */}
                    {btnText}
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




