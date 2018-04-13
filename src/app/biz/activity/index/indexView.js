/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Carousel, WingBlank, Tabs, Badge } from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './IndexLess.less';
import TabBar from 'pubBiz/tabBar/TabBarView';

import ActivityList from 'biz/activity/activityList/ActivityList';

@inject("activity")
@observer
class IndexView extends Component {

  constructor(props, context) {
    super(props, context);
    this.stores = this.props.activity;
    this.tabs = [ ];
  }


  componentDidMount() {
    this.stores.setStyle({
      height: Util.getScrollHeight(['banner', 'am-tabs-default-bar-content', 'am-tabs-tab-bar-wrap']) - 60
    })

    this.stores.getActivityLabel(resp => {
      this.tabs = resp.map(ok => {
        return {title: <div className='changAnt_tabs' >{ok.name}</div>};
      })
    })
    this.getData();
  }

  //获取数据
  getData = () => {
    let { getAdList } = this.stores
    console.log(localStorage.getItem('myCity'))
    let cityId = Util.getCityID()
    console.log(cityId)
    getAdList({
      type: '3',
      areaCode: cityId.cityId
    })
  }

  toUrl(url) {

    if(url){
      let urls = Util.getUrl(url)
      location.href = url;
    }
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

  // 跳转到详情
  goToDetail(e) {
    window.app.routerGoTo('/carModelDetail')
  }

  render() {
    const { adList, style,activityList } = this.stores.state
    return (
      <div className="activity-page">
        <div className="banner">
          {
            adList && adList.length>0 && (
              <Carousel
                className="banner-slide"
                autoplay={true}
                infinite
                selectedIndex={0}
                dots={true}
                swipeSpeed={35} >
                {
                  adList.map((item, index) => {
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

        <div className='tabsBox'>
          <Tabs tabs={this.tabs}
            initialPage={0}
            animated={false}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}>
            {activityList.map(x=>
                <ActivityList
                key={x.id}
                style={style}
                activityLabel={x.id}
                fetchData={this.stores.getActivityList}
            />)}
          </Tabs>
        </div>
        <TabBar selectedTab='activityTab' />
      </div>
    )
  }
}

module.exports = IndexView;