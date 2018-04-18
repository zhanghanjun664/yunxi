import React, { PropTypes, Component } from 'react';
import { PullToRefreshListView } from 'widget';
import Util from 'util';


class CouponList extends Component {

  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {
    this.refs.list.start();
  }


  fetchData = async (pageNum, success, error) => {
    let params = {
      pageNum: pageNum,
      pageSize: 10,
      status: this.props.status
    };

    let { data } = await this.props.fetchData(params);
    console.log(data)
    success(data.list, data.pageNum, data.pages);

  }


  renderRow = (rowData, sectionID, rowID) => {

    return (
      <li className='item couponType_1'>
        <div className='itemBox box_shadow'>
          <div className='item_money'>
            <p>{rowData.discountValue}元</p>
            <p>满{rowData.lowestOrderAmt}元使用优惠券</p>
          </div>

          <div className='item_info'>
            <div></div>
            <p>使用范围：{rowData.includeFiltersScope}</p>
            <p>过期时间:{rowData.endDate&&Util.formatDate(rowData.endDate)}</p>
          </div>

        </div>
      </li>
    )
  }

  render() {
    let style = this.props.style || {};
    return (
      <PullToRefreshListView
        fetchData={this.fetchData}
        renderRow={this.renderRow}
        ref="list"
        first={false}
        useBodyScroll={false}
        style={style}
      />

    )
  }
}

module.exports = CouponList;