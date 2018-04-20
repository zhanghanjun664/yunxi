import React, {PropTypes, Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {inject, observer} from 'mobx-react';
import {Tabs, Flex, WhiteSpace, SearchBar} from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './ResultLess.less';

import ResultColumnCar from '../components/resultColumnCar/ResultColumnCar';

/*
* qinglang - lyf
* 搜索结果页
*/

@inject('search')
@observer
class SearchResultView extends Component {
    constructor(props, context) {
        // 子类并无this对象，需继承父类的this，所以子类不调用super就得不到this对象
        super(props, context);
        // tab组件的配置
        this.tabs = [
            {
                title: <div data-url={'car'} className='changAnt_tabs'>车型</div>
            }, {
                title: <div data-url={'news'} className='changAnt_tabs'>新闻</div>
            }, {
                title: <div data-url={'activity'} className='changAnt_tabs'>活动</div>
            }
        ];
        // page是tabs和路由绑定的参数
        const url = window.location.hash;
        this.page = url.match('car')?0:url.match('news')?1:2;
    };
    componentDidMount() {
    };
    toUrl(url) {
        window.app.routerGoTo(url);
    };
    selectItem = (tab, index) => {
        let url = tab.title.props['data-url'];
        this.toUrl('/searchResult/' + url);
    };
    handleSubmit(){
        console.log(11111111)
    }
    render() {
        // const { adList, style } = this.stores.state
        return (
            <div className="search-result">
                <div className="title">
                    <div className="search-box">
                        <SearchBar 
                            onSubmit={this.handleSubmit.bind(this)}
                        />
                    </div>
                    <div className="search-result-tabs">
                        <Tabs
                            tabs={this.tabs}
                            initialPage={this.page}
                            animated={false}
                            onChange={this.selectItem}></Tabs>
                        {this.props.children}
                    </div>

                </div>
            </div>
        )
    }
}
module.exports = SearchResultView;