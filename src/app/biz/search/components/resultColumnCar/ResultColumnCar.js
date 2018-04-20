import React, {PropTypes, Component} from 'react';
import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import { RefreshListView } from 'widget';
import Util from 'util';
import { inject ,observer} from 'mobx-react';
import './ResultColumnCarLess.less';

@inject('search')
@observer
class ResultColumnCar extends Component {
    constructor(props, context) {
        super(props, context);
        this.stores = this.props.search
        this.tabs = [
            {
                title: <div className="sort-item">价格最低</div>,
                type: 1
            }, {
                title: <div className="sort-item">价格最高</div>,
                type: 2
            }, {
                title: <div className="sort-item">热度最高</div>,
                type: 3
            }
        ];
    };
    // 在此生命周期里调用了fetchData（数据初始化），具体代码在PullToRefreshListView组件
    componentDidMount() {
        this.stores.setStyle({
            height: Util.getScrollHeight(['search-box', 'am-tabs-top', 'sort-box'])-30
        })
        this.refs.list.start();
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
                    <p className="car-info-price">￥{rowData.price}万起</p>
                </div>
            </li>
        )
    }
    handleChange(tabs){
        console.log(tabs.type)
    }
    render() {
        const { style } = this.stores.state
        return (
            <div className="resultColumn-wrap">
                <div className="sort-box">
                    <Tabs 
                        tabs={this.tabs}
                        onChange={(tab, index)=>this.handleChange(tab)}
                    ></Tabs>
                </div>
                <div className="content-box">
                    <ul>
                        <RefreshListView
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