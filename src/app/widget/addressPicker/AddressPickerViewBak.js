/**
 * Created by zhang.weihua on 2018/3/20.
 */
/**
 * 别删！！！
 * props参数
 * cascade 默认是1  //2级就传1，3级就传2
 * ok  //func(item)  选择之后的回调函数, item是选中的市
 */
import React, {PropTypes, Component} from 'react';
import { Flex, Toast, Modal, Icon, } from 'antd-mobile';
import Request from "util/Request";
import './AddressPickerLess.less';


const defaultItem = {label: '请选择'};

class AddressPickerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            loading: false,
            areaData: null,
            areaList: [],
            selectedArea: [defaultItem],
            index: 0,    //表示进行到那个tab
        }

        this.cascade = props.cascade || 1;
    }

    componentDidMount() {
        this._getAreaData({level: 1});   //拿省份
    }


    openModal = () => {
        this.setState({
            show: true
        })
    }

    _onClose = () => {
        this.setState({
            show: false
        })
    }

    //切换loading状态
    _toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }


    //数据   {level: 1, areaCode: 12332}
    _getAreaData = (params) => {
        this._toggleLoading();
        Request({
            url: 'caf/jdcloud/index/areas',
            type: "GET",
            data: params
        }).then((result) => {
            this._toggleLoading();
            this.setState({
                areaData: result.data.list,
                areaList: result.data.list,
            })
        }, (err) => {
            this._toggleLoading();
        })
    }


    //区域选择
    _areaClick = (item, idx) => {

        let {selectedArea, index} = this.state;
        selectedArea[index] = item;
        if (index == this.cascade) {
            this.setState({
                selectedArea: selectedArea,
            })
            this._onClose();
            this.props.ok && this.props.ok(item);
        }else {
            index++;
            selectedArea[index] = defaultItem;
            this.setState({
                selectedArea: selectedArea,
                index: index,
                areaList: item.children
            })
        }

    }

    //切换tab
    _tabClick = (index) => {
        if (this.state.index != index) {
            if (index === 0) {   //获取省份
                this.setState({
                    index: index,
                    areaList: this.state.areaData
                })
            }else {
                this.setState({
                    index: index,
                    areaList: this.state.selectedArea[index-1].children
                })
            }

        }

    }

    render() {

        return (
            <Modal
                popup
                visible={this.state.show}
                animationType="slide-up"
                onClose={this._onClose}
            >
                <div className="address-picker-widget">
                    <div className="address-header">
                        <span>选择您的城市</span>
                        <Icon type="cross" size="lg" color="#ccc" className="icon-close" onClick={this._onClose}></Icon>
                    </div>
                    <Flex className="area-tabs">
                        { this.state.selectedArea.map((item, index) => (
                            <div className="tab" key={'tab'+index} onClick={this._tabClick.bind(this, index)}>
                                <div className={index === this.state.index ? 'tab-text active' : 'tab-text'}>{item.label}</div>
                            </div>
                        ))}

                    </Flex>
                    <div className="area-content">

                        { this.state.areaList.map((item, index) => {
                            let selected = this.state.selectedArea[this.state.index].value == item.value;
                            return (
                                <div className={`area-item ${selected ? 'active' : ''}`} key={'area'+index} onClick={this._areaClick.bind(this, item, index)}>
                                    {item.label}
                                </div>
                            )
                        })}
                    </div>
                    {
                        this.state.loading ? (
                            <Flex className="loading" justify="center">
                                <Icon type="loading" />
                            </Flex>
                        ) : null
                    }

                </div>
            </Modal>
        )
    }
}

module.exports = AddressPickerView;