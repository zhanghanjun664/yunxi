import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Tabs } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/tabBarView'
import './carImagesLess.less';
import Util from 'util';


class ImagesTemp extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <img src="https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png" />
          </li>
        </ul>
      </div>
    )
  }
}

@inject('productDetailIndex')
@observer
class DetailImages extends Component {
  constructor(props) {
    super(props)
    this.stores = this.props.productDetailIndex
    console.log(this.stores)
  }
  render() {
    console.log(this.stores.imgDetail)
    return (
      <div className='detaildImg'>
        <div className='di_title'><img src="assets/images/carModel/ci_detail.jpg" /></div>
        <div className='di_box'>
          <div>2/56</div>
          <div>
            <ul className='di_listBox'>
              {
                [0, 0, 0, 0].map((item, index) => {
                  return (
                    <li className={this.stores.state.imgDetail.activeIndex == index ? "di_item active" : "di_item"} key={index} onClick={() => this.stores.changeImg({
                      index,
                      urls: 11
                    })}>
                      <img src="assets/images/carModel/ci_detail.jpg" />
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
}

class VideoTemp extends Component {
  constructor(props) {
    super(props)
    this.stores = this.props.productDetailIndex
    console.log(this.stores)
  }
  render() {
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
          <li className='vt_item box_shadow'>
            <div className='vt_videoBox'>
              <img src="assets/images/carModel/ci_video1.jpg" />
            </div>
            <div className='vt_title'>
              长安福特官方品牌视频
            </div>
          </li>
          {/* <li className='vt_item box_shadow'>
            <div className='vt_videoBox'>
              <img src="assets/images/cloubStore/banner01.png" />
              <div className='vt_mask'>
                <div className='iconfont icon-play'></div>
                <div className='vt_time'>03:54</div>
              </div>
            </div>
            <div className='vt_title'>
              长安福特官方品牌视频
            </div>
          </li> */}


        </ul>

      </div>
    )
  }
}


@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ModelList extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.modelList;
  }
  type = Util.getQueryString('ci_type')
  tabsBox = [
    { title: "全景" },
    { title: "外观" },
    { title: "中控" },
    { title: "座椅" },
    { title: "细节" },
    { title: "视频" },
  ]
  renderTabs = tab => (
    <div className='changAnt_tabs'>{tab.title}</div>
  )
  changeTab(tab, index) {
    console.log(tab, index)
  }
  toUrl(url) {
    window.app.routerGoTo(url)
  }


  render() {
    console.log(this.type)
    return (
      <div className='carImages'>
        <Tabs tabs={this.tabsBox}
          renderTab={this.renderTabs}
          initialPage={this.type == 'video' ? 5 : 0}
          pageSize={4}
          onTabClick={(tab, index) => this.changeTab(tab, index)}
        >
          <div>
            <ul>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>

            </ul>
          </div>

          <div>
            <ul>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>

            </ul>
          </div>
          <div>
            <ul>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>

            </ul>
          </div>
          <div>
            <ul>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all1.jpg" />
              </li>
              <li className='ci_imgItem'>
                <img src="assets/images/carModel/ci_all2.jpg" />
              </li>

            </ul>
          </div>
          <div>
            <DetailImages />
          </div>
          <div>
            <VideoTemp />
          </div>
        </Tabs>

        <div className='ci_footer'>
          <div className='flex-1 ci_price'>
            <p>经销商参考报价：</p>
            <p>￥15.08万起</p>
          </div>
          <div className='ci_btnBox'>
            <div onClick={this.toUrl.bind(this, '/testdrive')}>预约试驾</div>
            <div onClick={this.toUrl.bind(this, '/askprice')}>前往询价</div>
          </div>
        </div>

      </div>
    );
  }
}

module.exports = ModelList;
