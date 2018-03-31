import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './indexLess.less';


@inject("productDetailIndex")
@observer
class AllConfig extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.data = []
  }
  componentDidMount() {
    let data = this.stores.state.carConfig
    if (!('itemCode' in data)) {
      this.stores.getCarConfig({
        itemCode: "车型编码"
      })
    }
  }
  handleData(arr) {
    let newArr = [], num = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i == 0) {
        newArr[num] = {
          name: arr[i].groupName,
          props: [arr[i]]
        }
      } else {
        if (arr[i].groupId == arr[i - 1].groupId) {
          newArr[num].props.push(arr[i])
        } else {
          num++
          newArr[num] = {
            name: arr[i].groupName,
            props: [arr[i]]
          }
        }

      }

    }
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
