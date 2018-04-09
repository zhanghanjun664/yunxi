/**
 * Created by zhang.hanjun 
 */
import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import {groupBy,get, extend, each} from 'lodash'
import Config from 'config/Config';
import Util from 'util';
import './IndexLess.less';


@inject("productDetailIndex")
@observer
class AllConfig extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.data = []
  }
  componentDidMount() {
    let { carConfig, itemId } = this.stores.state
    console.log(carConfig)
    if (!('itemCode' in carConfig)) {
      // 参数
      this.stores.getCarConfig({
        itemId: itemId
      })
    }
  }
  handleData(arr) {
    let newArr = [];
    let tmp = groupBy(arr,  item => item.groupId)
    each(tmp, (item,key) => {
      newArr.push({
        name: key,
        props: item
      })
    })

    // for (let i = 0; i < arr.length; i++) {
    //   if (i == 0) {
    //     newArr[num] = {
    //       name: arr[i].groupName,
    //       props: [arr[i]]
    //     }
    //   } else {
    //     if (arr[i].groupId == arr[i - 1].groupId) {
    //       newArr[num].props.push(arr[i])
    //     } else {
    //       num++
    //       newArr[num] = {
    //         name: arr[i].groupName,
    //         props: [arr[i]]
    //       }
    //     }

    //   }

    // }
    return newArr

  }
  render() {
    const data = this.stores.state.carConfig
    console.log(data)
    return (

      <div className='allConfig'>
        {

          data.props ?
            this.handleData(data.props).map((item, index) => {
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


      </div>
    )
  }
}

module.exports = AllConfig;
