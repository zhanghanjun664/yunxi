/**
 * Created by zhang.weihua on 2018/3/19.
 */
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Carousel, WingBlank, Tabs, Badge } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';
import TabBar from 'pubBiz/tabBar/tabBarView';

import ActivityList from 'biz/activity/activityList/activityList';

@inject("activity")
@observer
class HomeView extends Component {

  constructor(props, context) {
    super(props, context);
    this.stores = this.props.activity;
    this.tabs = [
			{ title: '推荐' },
			{ title: '行业' },
			{ title: '评测' },
			{ title: '活动' },
		];
  }


  componentDidMount() {
    this.getData();
  }

  //获取数据
  getData = () => {
    let { getAdList } = this.stores
    getAdList({
      type: '1',
      areaCode: '123'
    })
  }

  toUrl(url) {
    window.app.routerGoTo(url);
  }

  // 跳转到详情
  goToDetail(e) {
    window.app.routerGoTo('/carModelDetail')
  }
  componentWillMount() {
  }

  render() {
    const { adList } = this.stores.state
    return (
      <div className="activity-page">
        <div className="banner">
          <Carousel
            className="banner-slide"
            autoplay={true}
            infinite={true}
            selectedIndex={1}
            autoplayInterval={2000}
            dots={true}
            swipeSpeed={10} >

            {
              adList.map((item, index) => {
                return (
                  <div className="banner-item-wrap" key={index} onClick={this.toUrl.bind(this, item.redirectUrl)}>
                    <img className="banner-item" src={item.imgUrl} />
                  </div>
                )
              })
            }

          </Carousel>
        </div>

        <div className='tabsBox'>
          <Tabs tabs={this.tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}

          >
              <ActivityList />
              <ActivityList />
              <ActivityList />
              <ActivityList />

          </Tabs>
        </div>
        

          <TabBar selectedTab='activityTab' />
        </div>
        )
      }
    }
    
module.exports = HomeView;