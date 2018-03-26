import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */
//inject从props中获取相应的数据
@inject("productDetailIndex")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class AllConfig extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
  }
  componentDidMount() {
    let data = this.stores.state.carConfig
    console.log(data)
    if( !('itemCode' in data)){
      this.stores.getCarConfig({
        itemCode: "车型编码"
      })
    }
  }
  render() {
    const data = this.stores.state.carConfig
    return (

      <div className='allConfig'>
        {
          data.propGroups ?
            data.propGroups.map((item, index) => {
              return (
                <div className='ac_item box_shadow' key={index}>
                  <div className='ac_title'>{item.name}</div>
                  <ul>
                    {
                      item.props.map((item2, index2) => {
                        return (
                          <li className='pdConfig_item' key={index + index2}>
                            <div>{item2.name}</div>
                            <div>{item2.value}</div>
                          </li>
                        )

                      })
                    }


                  </ul>
                </div>
              )
            })
            : ""
        }
        {/* <div className='ac_item box_shadow'>
          <div className='ac_title'>基本参数</div>
          <ul>
            <li className='pdConfig_item'>
              <div>厂家s指导价</div>
              <div>￥15.58万</div>
            </li>
            <li className='pdConfig_item'>
              <div>乘员人数（区间）（个）</div>
              <div>6</div>
            </li>
            <li className='pdConfig_item'>
              <div>变速箱</div>
              <div>6挡手自一体</div>
            </li>

          </ul>
        </div> */}


      </div>
    )
  }
}

module.exports = AllConfig;
