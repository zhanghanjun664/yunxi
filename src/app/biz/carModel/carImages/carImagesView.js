/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'
import './CarImagesLess.less';
import Util from 'util';


@inject("productDetailIndex")
@observer
class ModelList extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.state = {
      qjList: [],
      wgList: [],
      zkList: [],
      zyList: [],
      xjList: [],
      spList: []
    }
    this.itemId = this.props.location.query.itemId
  }
  type = Util.getQueryString('ci_type')
  renderTabs = tab => (
    <div className='changAnt_tabs'>{tab.title}</div>
  )
  changeTab(tab, index) {
    console.log(tab, index)
  }
  toUrl(url) {
    window.app.routerGoTo(url)
  }
  componentWillMount() {
    // this.handleTabsBox()
    let { baseInfo, itemId } = this.stores.state
    if (!('itemId' in baseInfo)) {
      this.stores.getCarConfig({
        itemId: this.itemId
      })
    }
    console.log(baseInfo)

  }
  componentDidMount() {
  }
  renderDetailImages = (data) => {
    const { activeIndex } = this.stores.state.imgDetail
    return (
      <div className='detaildImg'>
        <div className='di_title'><img src={data[activeIndex].fileUrl} /></div>
        <div className='di_box'>
          <div>{activeIndex + 1}/{data.length}</div>
          <div>
            <ul className='di_listBox'>
              {
                data.map((item, index) => {
                  return (
                    <li className={activeIndex == index ? "di_item active" : "di_item"} key={index} onClick={() => this.stores.changeImg({
                      index,
                      urls: item.fileUrl
                    })}>
                      <img src={item.fileUrl} />
                    </li>

                  )
                })
              }

            </ul>

          </div>
        </div>
      </div>
    )
  }
  renderVideoTemp = () => {
    return (
      <div className='videoTemp'>
        <ul>
          <li className='vt_item box_shadow'>
            <div className='vt_videoBox'>
              <img src="assets/images/carModel/ci_video1.jpg" />
            </div>
            <div className='vt_title'>
              长安福特官方品牌视频
            </div>
          </li>

        </ul>

      </div>
    )
  }

  render() {
    const { data, tabsBox, qjList, wgList, zkList, zyList, xjList, spList } = this.stores.state.imgDetail
    console.log(data)
    return (
      <div className='carImages'>

        <Tabs tabs={tabsBox}
          renderTab={this.renderTabs}
          initialPage={this.type == 'video' ? 5 : 0}
          onTabClick={(tab, index) => this.changeTab(tab, index)}
          animated={false}
        >
          {
            qjList.length && (
              <div>
                <ul>
                  {
                    qjList.map(((item, index) => {
                      return (
                        <li className='ci_imgItem' key={index}>
                          <img src={item.fileUrl} />
                        </li>
                      )
                    }))
                  }


                </ul>
              </div>
            )
          }

          {
            wgList.length && (
              <div>
                <ul>
                  {
                    wgList.map(((item, index) => {
                      return (
                        <li className='ci_imgItem' key={index}>
                          <img src={item.fileUrl} />
                        </li>
                      )
                    }))
                  }

                </ul>
              </div>
            )
          }
          {
            zkList.length && (
              <div>
                <ul>
                  {
                    zkList.map(((item, index) => {
                      return (
                        <li className='ci_imgItem' key={index}>
                          <img src={item.fileUrl} />
                        </li>
                      )
                    }))
                  }

                </ul>
              </div>
            )
          }
          {
            zyList.length && (
              <div>
                <ul>
                  {
                    zyList.map(((item, index) => {
                      return (
                        <li className='ci_imgItem' key={index}>
                          <img src={item.fileUrl} />
                        </li>
                      )
                    }))
                  }

                </ul>
              </div>
            )
          }
          {
            xjList.length && (
              <div>
                {this.renderDetailImages(xjList)}
              </div>
            )
          }
          {
            spList.length && (
              <div>
                {this.renderVideoTemp(spList)}
              </div>
            )
          }
        </Tabs>


        <div className='ci_footer'>
          <div className='flex-1 ci_price'>
            <p>经销商参考报价：</p>
            <p>￥{data.sellerSellPrice && Util.changeMoney(data.sellerSellPrice)}万起</p>
          </div>
          <div className='ci_btnBox'>
            <div onClick={this.toUrl.bind(this, '/testdrive?itemId='+this.itemId)}>预约试驾</div>
            <div onClick={this.toUrl.bind(this, '/askprice?itemId='+this.itemId)}>前往询价</div>
          </div>
        </div>

      </div>
    );
  }
}

module.exports = ModelList;
