import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import tabStyle from './TabBarLess.less';
import { TabBar } from 'antd-mobile';
import Util from 'util';
// import { url } from 'inspector';

class tabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'indexTab',
            hidden: false,
            fullScreen: true,
            type: Util.getQueryString('tabBarType')||0,
            style: [
                {
                    normalColor: '#FD5C0E',
                    activeColor: '#FD5C0E'
                },
                {
                    normalColor: '#4689bf',
                    activeColor: '#4689bf'
                }
            ],
            tabBardata: [
                [
                    {
                        name:'首页',
                        icon: ['tabbar_index.png', 'tabbar_index.png'],
                        target:'/home',
                        activityTab:'indexTab'
                    },
                    {
                        name:'商品',
                        icon: ['tabbar_car.png', 'selected_car.png'],
                        target:'/carModelList',
                        activityTab:'carTab'
                    },
                    {
                        name:'活动',
                        icon: ['tabbar_activity.png', 'selected_activity.png'],
                        target:'/activity',
                        activityTab:'activityTab'
                    },
                    {
                        name:'查找门店',
                        icon: ['tabbar_search.png', 'selected_search.png'],
                        target:'/inquireDealer',
                        activityTab:'searchTab'
                    },
                    {
                        name:'我的',
                        icon: ['tabbar_mine.png', 'selected_mine.png'],
                        target:'/personalCenter',
                        activityTab:'mineTab'
                    },
                ],
                [
                    {
                        name:'总店',
                        icon: ['clound_index.png', 'clound_index.png'],
                        target:'/home',
                        activityTab:'indexTab'
                    },
                    {
                        name:'车型',
                        icon: ['clound_car.png', 'cSelected_car.png'],
                        target:'/carModelList',
                        activityTab:'carTab'
                    },
                    {
                        name:'活动',
                        icon: ['clound_activity.png', 'cSelected_activity.png'],
                        target:'/activity',
                        activityTab:'activityTab'
                    },
                    {
                        name:'客服',
                        icon: ['clound_customer.png', 'cSelected_customer.png'],
                        target:'/kefu',
                        activityTab:'searchTab'
                    },
                    {
                        name:'我的',
                        icon: ['clound_mine.png', 'cSelected_mine.png'],
                        target:'/personalCenter',
                        activityTab:'mineTab'
                    },
                ]
            ]
        };
    }

    hideTabBar(){
        // e.preventDefault();
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    componentDidMount() {
        // 当前选中的选项卡
        if(!!this.props.selectedTab){
          this.setState({
            selectedTab: this.props.selectedTab
          })
        }
    }

    // 选项卡点击
    onTabBarClick(currKey, gotoUrl) {
        let urls = gotoUrl
        if('mineTab' != currKey && 'indexTab' != currKey ) {
            
            let tabBarType = Util.getQueryString('tabBarType');
            let dealerId = Util.getQueryString('dealerId');
            if(tabBarType) {
                urls = gotoUrl+'?tabBarType='+tabBarType
                if(dealerId) {
                    urls += '&dealerId=' +  dealerId;
                }
            }
        }
        this.setState({
            selectedTab: currKey,
        });
        if('indexTab' === '' + currKey){
            this.title='';
        }
        window.app.routerGoTo(urls)
        
    }

    // 是否iPhoneX
    isIphoneX() {
        if(/iphone/ig.test(navigator.userAgent)) {
            // (window.innerWidth == 375*3) && (window.innerHeight == 724*3)
           return window.devicePixelRatio === 3 && (screen.height == 812 && screen.width == 375)
        }
        return false;
    }

    // 获取tabBar样式
    getTabBarStyle(){
        let style = { position: 'fixed', height: '1.5rem', width: '100%', bottom: '-0.52rem' }
        if(this.isIphoneX()) {
            style.bottom = 0;
            style.height = '2rem'
        }
        return style
    }

    getIconStyle(item, index) {
        return {backgroundImage:`url(assets/images/mainContent/${item.icon[index]})`}
    }
    

    render() {
      let { selectedTab, type, tabBardata, style } = this.state;
        return (
            <div className="tab-bar-page"  style={this.state.fullScreen ? this.getTabBarStyle() : { height: '100%' }}>
                <TabBar
                    unselectedTintColor={style[type].normalColor}
                    tintColor={style[type].activeColor}
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                {tabBardata[type].map(item=> <TabBar.Item
                    title={item.name}
                    key={item.activityTab}
                    icon={<div className="tab_page_icon" style={this.getIconStyle(item,0)} ></div>}
                    selectedIcon={<div className="tab_page_icon"style={this.getIconStyle(item,1)} ></div>}
                    selected={selectedTab === item.activityTab}
                    onPress={() => this.onTabBarClick(item.activityTab, item.target)}/>)}
                </TabBar>
            </div>
        );
    }
}

module.exports = tabBar;