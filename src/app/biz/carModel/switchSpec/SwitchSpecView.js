/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import {groupBy,get, extend, each} from 'lodash'
import { inject, observer } from 'mobx-react';
import Util from 'util';
import './SwitchSpecLess.less';


@inject("productDetailIndex")
@observer
class SwitchSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.data = [
      {name: '活力橙', id: 1},
      {name: '红色', id: 2},
      {name: '蓝色', id: 3},
      {name: '黑色', id: 4},
      {name: '活力绿', id: 5},
      {name: '活力紫', id: 6}
    ]
    this.state = {
      activeId: this.props.location.query.skusId
    }
  }
  componentDidMount() {
    let skusId = this.props.location.query.skusId
    let { baseInfo, itemId } = this.stores.state
    if(!itemId){
      let itemIds = this.props.location.query.itemId
      this.stores.setItemId(itemIds)
    }
    if (!('itemId' in baseInfo)) {
      // 参数
      this.stores.getBaseInfo({
        itemId: itemId
      })
    }
  }
  changeProps(item){
    console.log(item)

  }
  handleData(arr) {
    let newArr = [], allData = [];
    arr.map(item=>{
      allData.push(...item.props)
    })
    let tmp = groupBy(allData,  item => item.nameId)
    each(tmp, (item,key) => {
      newArr.push({
        nameId: key,
        values: item
      })
    })
    console.log(newArr)

    // for (let i = 0; i < allData.length; i++) {
    //   // newArr[allData[i].nameId].push(allData[i])
    //   let ai =
    //   if(!o[allData[i].nameId]){
    //     console.log(Boolean(!o[allData[i].nameId]))
    //     newArr.push({
    //       name: allData[i].name,
    //       values: [allData[i]]
    //     })
    //   }else{
    //     for(var j = 0; j < newArr.length; j++){  
    //       if(newArr[j].name == allData[i].name){  
    //         newArr[j].values.push(allData[i]);  
    //         break;  
    //       }  
    //     } 
    //   }


      // if (i == 0) {
      //   newArr[num] = {
      //     name: allData[i].name,
      //     values: [allData[i]]
      //   }
      // } else {
      //   if (allData[i].nameId == allData[i - 1].nameId) {
      //     newArr[num].values.push(allData[i])
      //   } else {
      //     num++
      //     newArr[num] = {
      //       name: allData[i].name,
      //       values: [allData[i]]
      //     }
      //   }

      // }

    // }
    console.log(newArr)

    return newArr

  }
  render() {
    const { switchSpec, baseInfo } = this.stores.state
    return (

      <div className='switchSpec'>
        {

          baseInfo.skus&&baseInfo.skus.length>0&&this.handleData(baseInfo.skus).map((item, index) => {
              return (
                <div className='ac_item box_shadow' key={index}>
                  <div className='ac_title'>{item.values[0].name}</div>
                  <ul>
                    {
                      item.values.map((item2, index2) => {
                        return (
                          <li key={index+index2} 
                            className={item.id == this.state.activeId?'active pdConfig_item':'pdConfig_item'} 
                            onClick={this.changeProps.bind(this, item)} >
                            <div className='iconBox'>
                              <div className='iconfont icon-duoxuanxiangweixuan'></div>
                              <div className='iconfont icon-duoxuanxiangxuanzhong'></div>
                            </div>
                            <div>{item2.value}</div>
                          </li>
                        )

                      })
                    }


                  </ul>
                </div>
              )
            })
          }

        <div className='ac_footer'>
          <div>确定</div>
        </div>

      </div>
    )
  }
}

module.exports = SwitchSpec;
