import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './ModelListLess.less';
import { SearchBar,Drawer, List, Flex } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'
import {get,keys,pickBy,omitBy, isNull,uniq, filter} from 'lodash'
import Util from 'util';
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
        queryParam: {
            pageSize:20,
            pageNum:1
        },
        hasSelect: {
            text:'',
            currIndex: 0
        },
        SelectArr:[],   // 当前显示的数组
        selectedArr:[], // 已经选择的属性id
        isSelectEnd: false,
    };

    componentDidMount() {
        this.stores.getList(this.state.queryParam);
    }

    // 打开SPU选择面板
    onOpenChange (e, item) {
        
        const {hasSelect} = this.state;

        let {query} = window.app.router.location;

        if(item) {

            hasSelect.text = item.name
            this.setState({hasSelect});

            const params = {
                catalogId: item.id // item.id
            };

            if('dealerId' in query) {
                params.dealerId = query.dealerId;
            }

            this.stores.getPropsItem(params).then(x=> {
                let { propsList, carItemList} = this.stores.state;

                if(propsList && propsList.length > 0) {
                    this.setState({
                        SelectArr: this.getSelProplist(hasSelect.currIndex)
                    })
                }
            })

        } else {
            // 收起左侧面板
            hasSelect.currIndex = 0;
            hasSelect.text = '';
            this.setState({hasSelect, SelectArr:[], selectedArr:[], isSelectEnd:false})
        }

        this.setState({ open: !this.state.open });
    }

    // 取出有车型的 属性列表
    getSelProplist(index) {
        let { propsList, carItemList} = this.stores.state;

        let items = omitBy(carItemList, isNull);
        let keysOm = keys(items)
        let readByrow = (val, col) => {
            return uniq(val.map(it=>{
                return it.split('-')[col];
            }));
        }

        let tmp = propsList[index].values

        return filter(tmp, x =>  readByrow(keysOm, index).includes(x.propValueId) )

        
    }



    // 点击一个属性
    setSelectProps(item) {
        
        const {hasSelect, SelectArr, selectedArr} = this.state;

        let { propsList, carItemList } = this.stores.state;

        hasSelect.currIndex++;

        selectedArr.push(item.propValueId);

        if(hasSelect.currIndex == propsList.length) {
            this.setState({isSelectEnd:true});
            let itemList = [];
            let str = selectedArr.join('-');

            if(str in carItemList && carItemList[str] !== null) {
                itemList = carItemList[str];
            }

            this.setState({
                SelectArr: itemList
            });
        }

    
        if(hasSelect.currIndex < propsList.length) {
            hasSelect.text += ' '+ item.propValue;

            this.setState({
                SelectArr: this.getSelProplist(hasSelect.currIndex),
                hasSelect,
                selectedArr
            })

        } 


    }

    // 跳转到车型详情页
    gotoDetail(item) {

        let target = '/carModelDetail';
        let location = window.app.router.location;

        let queryParams =  '?itemId=' + item.itemId;

        if(location.search !== '') {
            if('dealerId' in location.query) {
                target = '/cloubStore/carModelDetail'
            }
            if('goback' in location.query) {
                target = '/' + location.query.goback;
            }

            // 防止带两个itemId;
            delete location.query.itemId;

            queryParams += '&' + Util.qs(location.query);
            
        }
        window.app.routerGoTo(target + queryParams);
    }

    render() {

        let { SelectArr } = this.state;

        let Grayicon = 'https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png';
        
        let sidebar = (<List>
            <List.Item thumb={Grayicon}
                    >已选：{this.state.hasSelect.text}</List.Item>
            {SelectArr.map((item, index) => {
                return (<List.Item key={'prop_' + item.propValueId} onClick={e=>this.setSelectProps(item)}
                                   thumb={Grayicon}
                >{item.propValue}</List.Item>);
            })}
        </List>);

        if(this.state.isSelectEnd) {
            sidebar = (<List>
                <List.Item thumb={Grayicon}
                        >已选：{this.state.hasSelect.text}</List.Item>
                {SelectArr.length > 0 ? SelectArr.map((item, index) => {
                    return (<List.Item key={item.itemId} onClick={e=>this.gotoDetail(item)}
                                       thumb={Grayicon}
                    >{item.name}</List.Item>);
                }) : <List.Item thumb={Grayicon} className="color-gray">暂无匹配车型</List.Item>}
            </List>);
        }

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
                        onOpenChange={e => this.onOpenChange(e)}
                    >
                        <div className="search-box">
                            <SearchBar placeholder="搜索您关注的车型" onFocus={()=>{window.app.routerGoTo('/search')}}  showCancelButton />
                        </div>
                        <div className="model-list">
                            {
                                this.stores.state.list.map((list)=>{
                                return  <li key={list.id} className="type-option">
                                            <div className="type-title">
                                                <i className="iconfont icon-jiaoche"></i>
                                                {list.name}
                                            </div>
                                            {
                                                list.children.map((item)=>{
                                                    return <Flex key={item.id}>
                                                        <div className="leftImg">
                                                            <img src={item.imgUrl} alt=""/>
                                                        </div>
                                                        <Flex.Item>
                                                            <div className="car-list">
                                                                <p className="name ellipsis">{item.name}</p>
                                                                <p className="price ellipsis" onClick={e => this.onOpenChange(e,item) }>{item.remark||'选择配置'}</p>
                                                            </div>
                                                        </Flex.Item>
                                                    </Flex>
                                                })
                                            }

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
