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
import { Flex, Toast, Modal, Icon, PickerView, Button } from 'antd-mobile';
import Request from "util/Request";
import './AddressPickerLess.less';
import district from './district';
import { cloneDeep, findIndex, get } from 'lodash';
import Util from 'util';

const defaultItem = {label: '请选择'};

const pickItemStyle = {
    'top': '0',
    'textAlign': 'left',
    'fontSize': '0.28rem',
    'color': '#333333',
    'letterSpacing': '-0.0035rem',
    'lineHeight': '1',
    'height': '36px',
    'marginBottom': '50px'
}

const otherStyles = {
    'background': 'red',
    'color': 'blue',
    'fontSize': '50px'
}

// 指示器样式
const indicatorStyle = {
    // 'display': 'red',
}

class AddressPickerView extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            loading: false,
            areaData: district,    //总数据
            areaList: district,    //显示数据
            selectedArea: [ defaultItem ],
            index: 0,    //表示进行到那个tab

            // 省份列表
            provinceList: [],
            // 选中省份
            selectedProvince: [],

            // 城市列表
            cityList: [],
            // 选中城市
            selectedCity: []
        }

        this.cascade = props.cascade || 1;
    }

    componentDidMount() {
        this.getPickDistrict(()=>{
            this.initProvinceAndCity()
        })
        // this.setState({selectedProvince: ['360000000000'],selectedCity: ['360200000000']})
    }


    openModal = () => {
        this.setState({
            show: true
        })
    }

    _onClose = (cbf) => {
        this.setState({
            show: false
        }, () => {
            if(cbf){
                cbf()
            }
            this.props.onClose&&this.props.onClose()
        })
    }

    //切换loading状态
    _toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
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

    // 获取省、市两级的地区数据
    getPickDistrict(cb){
        console.log('did')
        let copyDistrict = cloneDeep(district), provinceList = []

        // 过滤掉区一级的数据
        copyDistrict.map((dis, i) => {
            if(!!dis.children){
                // 删除市/县下面的区
                dis.children.map((tdis, j) => {
                    delete tdis.children
                })
            }
            provinceList.push({label: dis.label, value: dis.value })
        })
        this.setState({
            provinceList,
            areaList: copyDistrict
        },()=>{
            cb()
        })
    }

    initProvinceAndCity(){
        let cityInfo = Util.getCityID()
        // this.provinceChange()
        let provinceCode = cityInfo.provinceCode, areaList = this.state.areaList, cityList = []
        // 空值判断
        if(!provinceCode){
            return false
        }
        // 筛选出省份下的城市
        areaList.map((a, i) => {
            if('' + a.value === '' + provinceCode){
                // 存在城市数据
                if(!!a.children){
                    cityList = a.children
                }
            }
        })
        console.log(cityList, provinceCode, cityInfo.postCode)
        // 设置到状态机
        this.setState({ cityList, selectedProvince:  [provinceCode], selectedCity: [cityInfo.postCode] })
    }

    // 选择省份触发
    provinceChange(val){
        let provinceCode = val[0], areaList = this.state.areaList, cityList = []
        // 空值判断
        if(!provinceCode){
            return false
        }
        // 筛选出省份下的城市
        areaList.map((a, i) => {
            if('' + a.value === '' + provinceCode){
                // 存在城市数据
                if(!!a.children){
                    cityList = a.children
                }
            }
        })
        console.log('provinceCode:', val)
        // 设置到状态机
        this.setState({ cityList, selectedProvince:  val, selectedCity: [cityList[0].value] })
        // console.log(cityList, this.state.selectedCity)
    }

    // 选择城市触发
    cityChange(val){
        let cityCode = val[0]
        console.log('cityCode:', val)
        // 设置到状态机
        this.setState({ selectedCity:  val })
    }

    // 点击确定触发
    onOk(e){
        // 城市列表
        let len = this.state.cityList.length
        // 返回的选中项的对象
        let selectedItem = {
            provinceCode: this.state.selectedProvince[0]
        }
        // 选中的城市代码
        let selectedCityCode = this.state.selectedCity[0]

        // 遍历城市列表，找出选中的城市对象{ label: '', value: ''}
        if(len > 0){
            this.state.cityList.map((city, i) => {
                if('' + selectedCityCode === '' + city.value){
                    // selectedItem = city
                    Object.assign(selectedItem, city)
                    return
                }
            })
        }
        // 通过ok回调函数带回选中的值
        if(this.props.ok){
            this._onClose(() => {
                this.props.ok(selectedItem)
            })
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

                {/* 请选择栏 */}
                <Flex className="area-tabs">
                    { 
                        this.state.selectedArea.map((item, index) => (
                            <div className="tab" key={'tab'+index} onClick={this._tabClick.bind(this, index)}>
                                <div className={index === this.state.index ? 'tab-text active' : 'tab-text'}>{item.label}</div>
                            </div>
                        ))
                    }
                </Flex>
                <div className="area-content">
                    <Flex>
                        {/* 选择省份 */}
                        <Flex.Item>
                            <PickerView
                                data={this.state.provinceList}
                                onChange={this.provinceChange.bind(this)}
                                itemStyle={pickItemStyle}
                                value={this.state.selectedProvince}
                                cascade={true}
                                cols={1}
                                indicatorStyle={indicatorStyle}
                            />
                        </Flex.Item>

                        {/* 选择城市 */}
                        <Flex.Item>
                            <PickerView
                                data={this.state.cityList}
                                onChange={this.cityChange.bind(this)}
                                itemStyle={pickItemStyle}
                                value={this.state.selectedCity}
                                cols={1}
                            />
                        </Flex.Item>
                    </Flex>
                </div>
                <div className='area-footer'>
                    <div className='rightBtn' onClick={this.onOk.bind(this)}>确定</div>
                </div>
            </div>


            {/*
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
            */}
            </Modal>
        )
    }
}

module.exports = AddressPickerView;