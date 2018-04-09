import React, {PropTypes, Component} from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import {PullToRefreshListView} from 'widget';
import Util from 'util';
import './ResultColumnNewsLess.less';

class ResultColumnNews extends Component {
    constructor(props, context) {
        super(props, context);
        // 排序配置
        this.tabs = [
            {
                title: <div className="sort-item">最新文章</div>
            }, {
                title: <div className="sort-item">热度最高</div>
            }
        ];
    };
    // 在此生命周期里调用了fetchData（数据初始化），具体代码在PullToRefreshListView组件
    componentDidMount() {
        this
            .refs
            .list
            .start();
    };
    fetchData(pageNum, success, error) {
        success([
            {
                img: 'assets/images/productDetail/baseInfo.png',
                title: '[广州]新福克斯两厢降价促销优惠2.2万元 现车充足',
                see: 1233,
                comment: 324,
                date: '2017.12.09'
            }, {
                img: 'assets/images/productDetail/baseInfo.png',
                title: '[广州]新福克斯两厢降价促销优惠2.2万元 现车充足',
                see: 1233,
                comment: 324,
                date: '2017.12.09'
            }, {
                img: 'assets/images/productDetail/baseInfo.png',
                title: '[广州]新福克斯两厢降价促销优惠2.2万元 现车充足',
                see: 1233,
                comment: 324,
                date: '2017.12.09'
            }, {
                img: 'assets/images/productDetail/baseInfo.png',
                title: '[广州]新福克斯两厢降价促销优惠2.2万元 现车充足',
                see: 3,
                comment: 324,
                date: '2017.12.09'
            }, {
                img: 'assets/images/productDetail/baseInfo.png',
                title: '[广州]新福克斯两厢降价促销优惠2.2万元 现车充足',
                see: 1233,
                comment: 324,
                date: '2017.12.09'
            }
        ], 1, 1);
    };
    renderRow(rowData, sectionID, rowID) {
        return (
            <li className="news-item">
                <img className="news-img" src={rowData.img}/>
                <div className="news-info">
                    <p className="news-info-title">{rowData.title}</p>
                    <div className="news-info-content">
                        <p>
                            <span className='iconfont icon-yuedu'></span>
                            <span>{rowData.see}</span>
                        </p>
                        <p>
                            <span className='iconfont icon-pinglun'></span>
                            <span>{rowData.comment}</span>
                        </p>
                        <p>
                            <span className='iconfont icon-shijian'></span>
                            <span>{rowData.date}</span>
                        </p>
                    </div>
                </div>
            </li>
        )
    };
    render() {
        let style = this.props.style || {
            height: 1300
        };
        return (
            <div className="resultColumn-wrap">
                <div className="sort-box">
                    <Tabs tabs={this.tabs}></Tabs>
                </div>
                <div className="content-box">
                    <ul>
                        <PullToRefreshListView
                            fetchData={this.fetchData}
                            renderRow={this.renderRow}
                            ref="list"
                            first={false}
                            useBodyScroll={false}
                            style={style}/>
                    </ul>
                </div>
            </div>

        )
    }
}
module.exports = ResultColumnNews;