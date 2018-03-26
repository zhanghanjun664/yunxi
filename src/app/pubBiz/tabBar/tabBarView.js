import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router'
import tabStyle from './tabBarLess.less';
import { TabBar } from 'antd-mobile';

//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化

class tabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'indexTab',
            hidden: false,
            fullScreen: true,
        };
    }

    hideTabBar(){
        // e.preventDefault();
        this.setState({
            hidden: !this.state.hidden,
        });
    }

    componentDidMount(){
        // 当前选中的选项卡
        if(!!this.props.selectedTab){
          this.setState({
            selectedTab: this.props.selectedTab
          })
        }
    }

    // 选项卡点击
    onTabBarClick(currKey, gotoUrl) {
        this.setState({
            selectedTab: currKey,
        });
        if('indexTab' === '' + currKey){
            this.title='';
        }
        window.app.routerGoTo(gotoUrl)
        
    }

    render() {
      let selectedTab = this.state.selectedTab;
        return (
            <div className="tab-bar-page"  style={this.state.fullScreen ? { position: 'fixed', height: '162px', width: '100%', bottom: 0 } : { height: '100%' }}>
                <TabBar
                    unselectedTintColor="#FD5C0E"
                    tintColor="white"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="Index"
                        icon={<div style={{
                            width: '0.8rem',
                            height: '0.5rem',
                            background: 'url(assets/images/mainContent/tabbar_index.png) center center /  0.8rem 0.5rem no-repeat' }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '0.8rem',
                            height: '0.5rem',
                            background: 'url(assets/images/mainContent/tabbar_index.png) center center /  0.8rem 0.5rem no-repeat' }}
                        />
                        }
                        selected={selectedTab === 'indexTab'}
                        onPress={() => this.onTabBarClick('indexTab', '/home')}
                        data-seed="logId"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="商品"
                        key="car"
                        icon={<div className="tab_page_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/tabbar_car.png)' }}
                        />
                        }
                        selectedIcon={<div className="tab_selected_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/selected_car.png) ' }}
                        />
                        }
                        selected={selectedTab === 'carTab'}
                        onPress={() => this.onTabBarClick('carTab', '/carModelList')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className="tab_page_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/tabbar_activity.png)' }}
                        />
                        }
                        selectedIcon={<div className="tab_selected_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/selected_activity.png) ' }}
                        />
                        }
                        title="活动"
                        key="activity"
                        selected={selectedTab === 'activityTab'}
                        onPress={() => this.onTabBarClick('activityTab', '/activity')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className="tab_page_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/tabbar_search.png)' }}
                        />
                        }
                        selectedIcon={<div className="tab_selected_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/selected_search.png) ' }}
                        />
                        }
                        title="查找门店"
                        key="search"
                        selected={selectedTab === 'searchTab'}
                        onPress={() => this.onTabBarClick('searchTab', '/cloubStore/index')}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="mine"
                        icon={<div className="tab_page_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/tabbar_mine.png)' }}
                        />
                        }
                        selectedIcon={<div className="tab_selected_icon" style={{
                            backgroundImage: 'url(assets/images/mainContent/selected_mine.png)' }}
                        />
                        }
                        selected={this.state.selectedTab === 'mineTab'}
                        onPress={() => this.onTabBarClick('mineTab', '/personalCenter')}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

module.exports = tabBar;
