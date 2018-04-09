import React, {PropTypes, Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {inject, observer} from 'mobx-react';
import {Tabs, Flex, WhiteSpace, SearchBar} from 'antd-mobile';
import Config from 'config/Config';
import Util from 'util';
import './IndexLess.less';

// const SearchItem = () => (   <div className={search - item}>Block</div> );

/*
* qinglang - lyf
* 搜索页
*/

//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class HomeView extends Component {
    constructor(props, context) {
        // 子类并无this对象，需继承父类的this，所以子类不调用super就得不到this对象
        super(props, context);
        this.searchHistory = [
            '123',
            '456',
            '789',
            '213',
            '12132',
            'dgsfsfsdfsdf'
        ];
    };
    state = {
        keyword: ''
    };
    onChange = (value) => {
        this.setState({value});
    };
    clear = () => {
        this.setState({keyword: ''});
    };
    handleSearch() {
        console.log('SEARCH')
    };
    render() {
        return (
            <div className="search-page">
                <div className="title">
                    <div className="search-box">
                        <SearchBar placeholder="搜索经销商、新闻或您关注的车型" showCancelButton/>
                    </div>
                </div>
                <div className="content">
                    <h3 className="search-history-head">搜索历史</h3>
                    <div className="search-history-list">
                        {this
                            .searchHistory
                            .map((item, index) => {
                                return (
                                    <span className="search-history-item" key={index}>{item}</span>
                                )
                            })
}
                    </div>
                    <h3 className="search-history-head">热门搜索</h3>
                    <div className="search-history-list">
                        {this
                            .searchHistory
                            .map((item, index) => {
                                return (
                                    <span className="search-history-item" key={index}>{item}</span>
                                )
                            })
}
                    </div>
                </div>
            </div>
        )
    }

}
module.exports = HomeView;