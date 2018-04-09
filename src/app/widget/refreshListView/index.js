/**
 * Created by zhang.weihua on 2018/2/8.
 * 用法
 * <RefreshListView
 *      style={{background: red}}
 *      className="xxx"
 *      first={true}  //首次加载数据要不要显示    加载中...
 *      fetchData={func}  //必传  func(pageNum, success, error)  回传3个参数 当前页数， 成功之后的数据， 失败的操作
 *      useBodyScroll={true}  //是否用body的滚动
 *      pullToRefresh={true}  //是否启用下拉刷新
 * />
 */


import React, { Component } from 'react';
import { ListView, Icon, Flex, PullToRefresh, } from 'antd-mobile';
import './index.less';

class RefreshListView extends Component {
    constructor(props, context) {
        super(props, context);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
            pageNum: 1,    //分页的话，当前页数是多少
            hasMore: true,   //是否还有更多数据
            data: [],
            refreshing: false,
        };

        this.first = this.props.first;
    }

    static defaultProps = {
        first: true
    }


    componentDidMount() {



    }

    componentWillUnmount() {

    }

    //加载数据
    start = () => {
        setTimeout(() => {
            this._fetchData();
        }, 0);
    }

    //不清空旧数据刷新
    refreshList = () => {
        this.setState({ data: [] });
        this._fetchData(1);
    }

    //清空旧数据刷新
    refreshList2 = () => {
        this.setState({ data: [], dataSource: this.state.dataSource.cloneWithRows({}), isLoading: true });
        this._fetchData(1);
    }

    //下拉刷新函数
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.refreshList();
    };

    //加载数据函数
    _fetchData = (pageNum = 1) => {

        this.props.fetchData && this.props.fetchData(pageNum, (list, pageNum, pages) => {
            console.log("pages:"+pages+" pageNum:"+ pageNum)
            //请求成功
            this.first = false;
            this.setState({
                pageNum: pageNum,
                hasMore: pages > pageNum,
                isLoading: false,
                refreshing: false,
            });
            console.log(list)
            list && list.length && this._addRows(list);
        }, (err) => {
            // reject也要取消loading状态
            this.setState({
                isLoading: false,
                refreshing: false,
            });
        });
    }


    _setRows = (data) => {
        this.setState({
            data: data,
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

    _addRows = (data) => {
        let newData = this.state.data.concat(data);
        this._setRows(newData);
    }


    deleteRows = (index) => {
        let newData = [].concat(this.state.data);
        newData.splice(index, 1);
        this._setRows(newData);
    }


    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        setTimeout(() => {
            if (this.state.isLoading || !this.state.hasMore) {
                return;
            }else {

                this.setState({ isLoading: true });
                this._fetchData(this.state.pageNum + 1);
            }

        }, 0);

    }



    _renderFooter = () => {
        return this.state.isLoading && !this.first ? (
            <Flex className="list-footer" justify="center">
                <Icon type={'loading'} size="xs" />
                <span>加载中...</span>
            </Flex>
        ) : null
    }



    render() {
        let {useBodyScroll = true, renderSeparator = null, renderBodyComponent = null, style = {}, className='', pullToRefresh = false } = this.props;
        let extraProps = {};
        if (pullToRefresh) {
            extraProps = {
                pullToRefresh: (
                    <PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        distanceToRefresh={100}
                    />
                )
            }
        }

        return (
            <ListView ref="product-list" style={style}
                dataSource={this.state.dataSource}
                renderFooter={this._renderFooter}
                renderRow={this.props.renderRow}
                className={`refresh-list-widget ${className}`}
                pageSize={10}
                useBodyScroll={useBodyScroll}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                renderSeparator={renderSeparator}
                {...extraProps}

            />
        )
    }
}

module.exports = RefreshListView;
