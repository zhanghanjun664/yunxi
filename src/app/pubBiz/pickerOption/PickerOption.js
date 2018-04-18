/*
 * @author 七天
 * @date 2018.4.11
 * @用来选择购车预算区间和购车时间
 * @params props 
 *  .visable 可见性
 *  .onChagne  onChange
 *  .name  字段名
 *  .type  选择器类型
 */
import React,{Component} from 'react'
import {Modal,PickerView } from 'antd-mobile'
import Style from './PickerOption.less';
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
}

class PickerOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles : {
                'budget' : '预算区间',
                'buytime' : '期望购车时间'
            },
            mapsArr:[],
            value:[1],
            datas: {
                'budget': [
                    [
                        {
                            label: '10万元以内',
                            value: 1,
                        },
                        {
                            label: '10~15万',
                            value: 2,
                        },
                        {
                            label: '15~20万',
                            value: 3,
                        },
                        {
                            label: '20万以上',
                            value: 4,
                        },
                    ]
                ],
                'buytime' : [
                    [
                        {
                            label: '一个月内',
                            value: 1,
                        },
                        {
                            label: '三个月内',
                            value: 2,
                        },
                        {
                            label: '半年内',
                            value: 3,
                        },
                        {
                            label: '一年内',
                            value: 4,
                        },
                        {
                            label: '未定',
                            value: 5,
                        }
                    ]
                ]
            }
        };

    }
    
    componentDidMount() {
        let {datas} = this.state;
        this.setState({
            mapsArr: {
                budget: datas.budget[0].map(x=>x.label),
                buytime: datas.buytime[0].map(x=>x.label)
            }
        })
    }

    onWrapTouchStart(e) {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    onClose(flag) {

        let {onChange, name, onPickClose} = this.props;

        onPickClose&&onPickClose()

        if(flag) {
            this.onChange(this.state.value, name)
        }

    }

    onChange(val, name) {
        let { onChange, type } = this.props;
        let arr = this.state.mapsArr[type];
        
        val[1] = arr[val[0]-1];

        this.setState({ value : val})


        onChange(val, name)
    }

    render () {
        let {type, name} = this.props;
        let title = this.state.titles[type]
        let data = this.state.datas[type];
         return (<Modal
            className="ask-price-modal-page"
            visible={this.props.visible}
            transparent
            maskClosable={false}
            onClose={x => this.onClose(x)}
            title={title}
            footer={[{ text: '取消', onPress: x => this.onClose(false) },{ text: '确定', onPress: x => this.onClose(true)}]}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        > <PickerView
                onChange={x => this.onChange(x, name)}
                data={data}
                value={this.state.value}
                cascade={false} />
        </Modal>);
    }
}

export default PickerOption;