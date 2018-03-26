/**
 * Created by zhang.weihua on 2018/2/8.
 */


import React, { Component } from 'react';
import { ListView, Icon, Flex } from 'antd-mobile';
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

    start = () => {
        setTimeout(() => {
            this._fetchData();
        }, 0);
    }

    //刷新列表
    refreshList = () => {
        this.setState({ data: [] });
        this._fetchData(1);
    }

    //刷新列表2
    refreshList2 = () => {
        this.setState({ data: [], dataSource: this.state.dataSource.cloneWithRows({}), isLoading: true });
        this._fetchData(1);
    }


    _fetchData = (pageNum = 1) => {

        this.props.fetchData && this.props.fetchData(pageNum, (list, pageNum, pages) => {
            //请求成功
            this.first = false;
            this.setState({
                pageNum: pageNum,
                hasMore: pages > pageNum,
                isLoading: false,
            });
            this._addRows(list);
        }, (err) => {
            console.log(err);
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
        let {useBodyScroll = true, renderSeparator = null, renderBodyComponent = null, } = this.props;
        return (
            <ListView ref="product-list"
                dataSource={this.state.dataSource}
                renderFooter={this._renderFooter}
                renderRow={this.props.renderRow}
                className="refresh-list-widget"
                pageSize={10}
                useBodyScroll={useBodyScroll}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                renderSeparator={renderSeparator}
            />
        )
    }
}

module.exports = RefreshListView;
