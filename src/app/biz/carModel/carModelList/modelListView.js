import React, {PropTypes, Component} from 'react'
import {Link, IndexLink} from 'react-router';
import { inject ,observer} from 'mobx-react';
import Style from './ModelListLess.less';
import { SearchBar,Drawer, List } from 'antd-mobile';
import TabBar from 'pubBiz/tabBar/TabBarView'
import cx from 'classnames'

@inject("modelList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class ModelList extends Component {
    constructor(props, context) {
        super(props, context)
        this.stores = this.props.modelList;
    }
    /*
    {//第一个筛选条件
        “catalogId”: 1,
        “groupId”: 2,
        “propNameId”: 3,
        “propValueId”: 4
    }
    */
    state = {
        catalogId:0,
        dealerId : '', // 指定经销商ID
        queryParam: {
            pageSize:20,
            pageNum:1
        },
        hasSelect: {
            text:'',
            currIndex: 0,
            catalogId:1,
        },
        SelectArr:[],
        isSelectEnd: false,
    };

    componentDidMount() {
        this.stores.getList(this.state.queryParam);

        let location = window.app.router.location;

        if('dealerId' in location.query) {
            this.setState({'dealerId': location.query.dealerId})
        }
    }

    onOpenChange (e, item) {
        
        const {hasSelect} = this.state;

        if(item) {
            hasSelect.text = item.name
            this.setState({hasSelect});
            const params = {
                catalogId: item.id // item.id
            };

            this.setState({catalogId: item.id})

            this.stores.listProps(params)

        } else {
            // 收起左侧面板
            hasSelect.currIndex = 0;
            hasSelect.text = '';
            this.setState({hasSelect, SelectArr:[], isSelectEnd:false})
        }

        this.setState({ open: !this.state.open });
    }

    onChange (value) {
        this.setState({ value });
    };

    handleClick() {
        this.manualFocusInst.focus();
    }

    setSelectProps(item) {
        
        const {hasSelect, SelectArr, catalogId} = this.state;

        let propsList = this.stores.state.propsList

        SelectArr[hasSelect.currIndex].propValueId = item.propValueId

        hasSelect.text += ' '+ item.propValue
         
        SelectArr.map(x=>x.catalogId = catalogId);
        
        if(propsList.length == hasSelect.currIndex+1) {
            this.setState({isSelectEnd: true})
            // 查具体的车型
            this.stores.listItems(SelectArr, this.state.dealerId)

        } else {

            hasSelect.currIndex++;
            
            this.setState({hasSelect})
        }

    }

    // 跳转到车型详情页
    gotoDetail(item) {

        let target = '/carModelDetail';
        let location = window.app.router.location;
        let queryParams =  '?itemId=' + item.itemId;

        if(location.search !== '') {
            if('goback' in location.query) {
                target = '/' + location.query.goback;
            }
            if('activityId' in location.query){
                queryParams += '&activityId=' + location.query.activityId
            }
        }

        window.app.routerGoTo(target + queryParams);
    }

    render() {
        let { SelectArr } = this.state;

        // 可选的属性列表
        let propsList = this.stores.state.propsList
        let curIndex = this.state.hasSelect.currIndex
        
        let currentList = [];

        if(propsList.length > 0) {
            if(propsList.length !== SelectArr.length) {
                let tmpGroup = propsList[curIndex];
                currentList = tmpGroup.values;
                SelectArr[curIndex] = {
                    groupId:tmpGroup.groupId,
                    propNameId:tmpGroup.propNameId
                }
            } else {
                currentList = this.stores.state.carItemList     
            }
        }

        let Grayicon = 'https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png';
        
        let sidebar = (<List>
            <List.Item thumb={Grayicon}
                    >已选：{this.state.hasSelect.text}</List.Item>
            {currentList.map((item, index) => {
                return (<List.Item key={'prop_' + item.propValueId} onClick={e=>this.setSelectProps(item)}
                                   thumb={Grayicon}
                >{item.propValue}</List.Item>);
            })}
        </List>);

        if(this.state.isSelectEnd) {
            sidebar = (<List>
                <List.Item thumb={Grayicon}
                        >已选：{this.state.hasSelect.text}</List.Item>
                {currentList.length > 0 ? currentList.map((item, index) => {
                    return (<List.Item key={`${item.itemId}_${index}`} onClick={e=>this.gotoDetail(item)}
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
                                            <ul>
                                                {
                                                list.children.map((item)=>{
                                                    return <li key={item.id}>
                                                        <img src={item.imgUrl} alt=""/>
                                                        <div className="car-list">
                                                            <p className="name">{item.name}</p>
                                                            <p className="price" onClick={e => this.onOpenChange(e,item) }>{item.remark||'选择配置'}</p>
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
