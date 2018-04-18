import React, {PropTypes, Component} from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import {PullToRefreshListView} from 'widget';
import Util from 'util';
import './ResultColumnCarLess.less';

class ResultColumnCar extends Component {
    constructor(props, context) {
        super(props, context);
        // 排序配置
        this.tabs = [
            {
                title: <div className="sort-item">价格最低</div>
            }, {
                title: <div className="sort-item">价格最高</div>
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
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '12.85'
            }, {
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '16.88'
            }, {
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '16.88'
            }, {
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '16.88'
            }, {
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '16.88'
            }, {
                img: 'assets/images/modelList/carblue.png',
                title: '福特福克斯',
                price: '16.88'
            }
        ], 1, 1);
    };
    renderRow(rowData, sectionID, rowID) {
        return (
            <li className="car-item">
                <img className="car-img" src={rowData.img}/>
                <div className="car-info">
                    <p className="car-info-title">{rowData.title}</p>
                    <p className="car-info-price">{'￥'}{rowData.price}{'万起'}</p>
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
module.exports = ResultColumnCar;