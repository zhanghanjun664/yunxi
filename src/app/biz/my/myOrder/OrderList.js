/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react';
import { RefreshListView } from 'widget';
import { inject, observer } from 'mobx-react';
import { Toast } from 'antd-mobile';

@inject('myOrder')
@observer
class OrderList extends Component {

  constructor(props, context) {
    super(props, context);
    this.stores = this.props.myOrder
    // console.log(props.mySubsribe.state);
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
      pageSize: 10,
      appointmentStatus: this.props.status
    };

    let { data } = await this.props.fetchData(params);
    success(data.list, data.pageNum, data.total);

  }
  // fetchData = (pageNum, success, error) => {
  //   let params = {
  //     pageNum: pageNum,
  //     pageSize: 10,
  //     appointmentStatus: this.props.status
  //   };
  //   this.stores.getOrderList(params).then((result)=>{
  //     let { data, resultCode, resultMsg } = result;
  //     success(data.list, data.pageNum, data.total)
  //   })

  // }

  noOpen(){
    Toast.info('此功能暂未开放')
  }


  renderRow = (rowData, sectionID, rowID) => {

    return (
      <li className='mo_listItem'>
        <div className='mo_listTitle'>
          <div>订单号:00001</div>
          <div>状态：待支付</div>
        </div>

        <div className='mo_listInfo'>
          <div>
            <div>订单商品:</div>
            <div className='mo_carTags'>
              <span>福特福克斯</span>
              <span>三厢</span>
              <span>EcoBoost</span>
              <span>1.5T</span>
              <span>自动旗舰型</span>
            </div>
          </div>

          <div>
            <div>经销商:</div>
            <div className='flex-1'>广州恒福福特</div>
            <div className='mo_listInfo_tel'>
              <span className='iconfont icon-dianhua'></span>
              <span>021-12345612</span>
            </div>
          </div>

          <div>
            <div></div>
            <div className='mo_listInfo_area'>
              <span className='iconfont icon-dizhi'></span>
              <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
            </div>
            <div className='mo_listInfo_map' onClick={this.noOpen.bind(this)}>
              <span className='iconfont icon-ditu'></span>
              <span>地图</span>
            </div>

          </div>

          <div className='mo_list_userInfo'>
            <div>用户信息:</div>
            <div>张先生</div>
            <div>13012123123</div>
          </div>

          <div>
            <div>订单金额:</div>
            <div>￥5000</div>
          </div>

          <div>
            <div>下单时间:</div>
            <div>2018.01.10</div>
          </div>

        </div>

        <div className='mo_btnBox' onClick={this.noOpen.bind(this)}>
          <div>查看详情</div>
          <div className='mo_goPay'>去支付</div>
        </div>

      </li>
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

module.exports = OrderList;