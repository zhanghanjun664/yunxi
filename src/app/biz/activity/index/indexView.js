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
			{ title: <div className='changAnt_tabs'>推荐</div> },
			{ title: <div className='changAnt_tabs'>行业</div> },
			{ title: <div className='changAnt_tabs'>评测</div> },
			{ title: <div className='changAnt_tabs'>活动</div> },
		];
  }


  componentDidMount() {
    this.stores.setStyle({
      height: Util.getScrollHeight(['banner', 'am-tabs-default-bar-content', 'am-tabs-tab-bar-wrap'])-60
    })
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
    // window.app.routerGoTo(url);
    location.href = url;
  }

  // 跳转到详情
  goToDetail(e) {
    window.app.routerGoTo('/carModelDetail')
  }
  componentWillMount() {
  }
  renderTabs = tab => (
      <div className='changAnt_tabs'>{tab.title}</div>
  )

  render() {
    const { adList, style } = this.stores.state
    console.log(adList)
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
            animated={false}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}

          >
              {/* 推荐 */}
              <ActivityList 
                style={style}
                activityLabel={1} 
                fetchData={this.stores.getActivityList}
              />
              {/* 行业 */}
              <ActivityList 
                style={style}
                activityLabel={2} 
                fetchData={this.stores.getActivityList}
              />
              {/* 测评 */}
              <ActivityList 
                style={style}
                activityLabel={3} 
                fetchData={this.stores.getActivityList}
              />
              {/* 活动 */}
              <ActivityList 
                style={style}
                activityLabel={4} 
                fetchData={this.stores.getActivityList}
              />

          </Tabs>
        </div>
        

          <TabBar selectedTab='activityTab' />
        </div>
        )
      }
    }
    
module.exports = HomeView;