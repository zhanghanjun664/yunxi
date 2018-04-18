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
    this.itemId = this.props.location.query.itemId
  }
  componentDidMount() {
    let { carConfig, itemId } = this.stores.state
    if (!('itemCode' in carConfig)) {
      // 参数
      this.stores.getCarConfig({
        itemId: this.itemId
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
    console.log(newArr)
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
                  <div className='ac_title'>{item.props[0].groupName}</div>
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
