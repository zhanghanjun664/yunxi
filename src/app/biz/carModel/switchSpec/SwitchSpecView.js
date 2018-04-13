/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import {groupBy,get, extend, each, intersectionBy, uniqWith, uniqBy} from 'lodash'
import { inject, observer } from 'mobx-react';
import Util from 'util';
import './SwitchSpecLess.less';
import { List,  Radio, Button } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem

@inject("productDetailIndex")
@observer
class SwitchSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.skusId = this.props.location.query.skusId;
    this.state = {
      activeId: '',
    }
    this.itemId = this.props.location.query.itemId
  }
  componentDidMount() {
    let self = this
    let { baseInfo, itemId } = this.stores.state
    let itemIds = this.props.location.query.itemId
    // 参数
    this.stores.getCarConfig({
      itemId: itemIds
    }).then(()=>{
      // 第一次数据处理
      self.stores.getGroupSkuData()
      let sItem = this.stores.state.imgDetail.data
      self.stores.initSelectedSkuId(sItem)

    })
  }
  changeProps(item){
    this.stores.getCheckAndDisableList(item)
  }


  render() {
    const { switchSpec, baseInfo, dataSource, canSubmitSku } = this.stores.state
    return (

      <div className='switchSpec'>
        {

          dataSource&&dataSource.map((item, index) => {
              return (
                <div className='ac_item box_shadow' key={index}>
                  <div className='ac_title'>{item.values[0].name}</div>
                  <List>
                    {
                      item.values.map((item2, index2) => {
                        console.log('item2:', item2.checked)
                        return (
                          <RadioItem   key={index+index2}
                            disabled = {item2.disabled}
                            className={item2.checked?'active pdConfig_item':'pdConfig_item'} 
                            onClick={this.changeProps.bind(this, item2)}>
                            <div className='iconBox'>
                              <div className='iconfont icon-duoxuanxiangweixuan'></div>
                              <div className='iconfont icon-duoxuanxiangxuanzhong'></div>
                            </div>
                            <div>{item2.value}</div>
                          </RadioItem  >
                        )

                      })
                    }


                  </List>
                </div>
              )
            })
          }

        <div className='ac_footer'>
          <Button
           className='ac_footerBtn'
           disabled={!canSubmitSku}
           onClick={e=> this.stores.submit(e, (skusId) => {
            window.app.routerGoTo(`/carModelDetail?itemId=${this.itemId}&skusId=${skusId}`)
            
          })}>确定</Button>
        </div>

      </div>
    )
  }
}

module.exports = SwitchSpec;
