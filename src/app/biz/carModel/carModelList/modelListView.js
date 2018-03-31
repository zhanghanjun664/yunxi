import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './modelListLess.less';
import { SearchBar,Drawer, List } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/tabBarView'
import cx from 'classnames'

@inject("modelList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ModelList extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.modelList;
    }

    state = {
        value: '美食',
        open: false,
        sortname:'',
    };

    componentDidMount() {
        this.stores.mockModelText();
    }

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    onChange= (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    }

    render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                                       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                                       multipleLine
                    >已选：</List.Item>);
                }
                return (<List.Item key={index}
                                   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                >Category{index}</List.Item>);
            })}
        </List>);



        return (
            <div>
                <div className="model-list-page">
                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.body.clientHeight }}
                        enableDragHandle
                        position='right'
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 0 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        drawerWidth={{ width:'' }}
                        onOpenChange={this.onOpenChange}
                    >
                        <div className="search-box">
                            <SearchBar placeholder="搜索您关注的车型"
                                       showCancelButton
                            />
                        </div>
                        <div className="model-list">
                            {
                                this.stores.state.list.map((list)=>{
                                    return  <li key={list.id} className="type-option">
                                                <div className="type-title">
                                                    <i className="iconfont icon-jiaoche"></i>
                                                    {list.name}
                                                </div>
                                                <ul>
                                                    {
                                                        list.children.map((item)=>{
                                                            return <li key={item.id}>
                                                                        <img src={item.imgUrl} alt=""/>
                                                                        <div className="car-list">
                                                                            <p className="name">{item.name}</p>
                                                                            <p className="price" onClick={  this.onOpenChange }>{item.remark}</p>
                                                                        </div>
                                                                    </li>
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                })
                            }

                        </div>
                    </Drawer>
                </div>
                <TabBar selectedTab = 'carTab'/>
            </div>
        );
    }
}

module.exports = ModelList;
