import React, { PropTypes, Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { inject, observer } from 'mobx-react';
import Config from 'config/Config';
import Util from 'util';
import './orderListLess.less';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
/**
 * 视图层，功能逻辑，html代码将存放于此
 */



//inject从props中获取相应的数据
@inject("orderList")
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
class OrderList extends Component {
  constructor(props, context) {
    super(props, context)
    this.stores = this.props.productDetailIndex;
    this.state = {
      type: this.props.type
    }
  }

  componentWillMount() {
    // 1：我的订单  2：我的预约
    const tabsBox = {
      1: [
        { title: '所有订单', statusCode:"" },
        { title: '待支付', statusCode:0 },
        { title: '待到店', statusCode:1 },
        { title: '已完成', statusCode:2 },
        { title: '已取消', statusCode:3 },
      ],
      2: [
        { title: '所有预约' },
        { title: '待到店' },
        { title: '已完成' },
        { title: '已取消' },
      ]
    }
    this.state.tabs = tabsBox[this.state.type]
  }
  renderTabs = tab => (
    <div>
      <div className='changAnt_tabs'>{tab.title}</div>
    </div>
  )

  render() {
    return (

      <div className="myOrder">
        <div className='mo_searchBox'>
          <div className='mo_searchBox'>
            <input placeholder='商品名称/预约号' />
            <span className='iconfont icon-sousuo'></span>
          </div>
        </div>
        {
          this.state.type == 1 ?
            <div className='mo_orderBox'>
              <div>
                <Tabs tabs={this.state.tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                  renderTab={this.renderTabs}
                  
                >
                  <ul className='mo_listBox'>
                    <li className='mo_listItem'>
                      <div className='mo_listTitle'>
                        <div>订单号:00001</div>
                        <div>状态：待支付</div>
                      </div>

                      <div className='mo_listInfo'>
                        <div>
                          <div>订单商品:</div>
                          <div className='mo_carTags'>
                            <span>福特福克斯</span>
                            <span>三厢</span>
                            <span>EcoBoost</span>
                            <span>1.5T</span>
                            <span>自动旗舰型</span>
                          </div>
                        </div>

                        <div>
                          <div>经销商:</div>
                          <div className='flex-1'>广州恒福福特</div>
                          <div className='mo_listInfo_tel'>
                            <span className='iconfont icon-dianhua'></span>
                            <span>021-12345612</span>
                          </div>
                        </div>

                        <div>
                          <div></div>
                          <div className='mo_listInfo_area'>
                            <span className='iconfont icon-dingwei'></span>
                            <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                          </div>
                          <div className='mo_listInfo_map'>
                            <span className='iconfont icon-ditu'></span>
                            <span>地图</span>
                          </div>

                        </div>

                        <div className='mo_list_userInfo'>
                          <div>用户信息:</div>
                          <div>张先生</div>
                          <div>13012123123</div>
                        </div>

                        <div>
                          <div>订单金额:</div>
                          <div>￥5000</div>
                        </div>

                        <div>
                          <div>下单时间:</div>
                          <div>2018.01.10</div>
                        </div>

                      </div>

                      <div className='mo_btnBox'>
                        <div>查看详情</div>
                        <div className='mo_goPay'>去支付</div>
                      </div>

                    </li>


                  </ul>

                  <div>
                    <ul className='mo_listBox'>
                      <li className='mo_listItem'>
                        <div className='mo_listTitle'>
                          <div>订单号:00002</div>
                          <div>状态：待支付</div>
                        </div>

                        <div className='mo_listInfo'>
                          <div>
                            <div>订单商品:</div>
                            <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                          </div>

                          <div>
                            <div>经销商:</div>
                            <div className='flex-1'>广州恒福福特</div>
                            <div className='mo_listInfo_tel'>
                              <span className='iconfont icon-dianhua'></span>
                              <span>021-12345612</span>
                            </div>
                          </div>

                          <div>
                            <div></div>
                            <div className='mo_listInfo_area'>
                              <span className='iconfont icon-dingwei'></span>
                              <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                            </div>
                            <div className='mo_listInfo_map'>
                              <span className='iconfont icon-ditu'></span>
                              <span>地图</span>
                            </div>

                          </div>

                          <div className='mo_list_userInfo'>
                            <div>用户信息:</div>
                            <div>张先生</div>
                            <div>13012123123</div>
                          </div>

                          <div>
                            <div>订单金额:</div>
                            <div>￥5000</div>
                          </div>

                          <div>
                            <div>下单时间:</div>
                            <div>2018.01.10</div>
                          </div>

                        </div>

                        <div className='mo_btnBox'>
                          <div>查看详情</div>
                          <div className='mo_goPay'>去支付</div>
                        </div>

                      </li>


                    </ul>
                  </div>
                  <div>
                    <ul className='mo_listBox'>
                      <li className='mo_listItem'>
                        <div className='mo_listTitle'>
                          <div>订单号:00003</div>
                          <div>状态：待支付</div>
                        </div>

                        <div className='mo_listInfo'>
                          <div>
                            <div>订单商品:</div>
                            <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                          </div>

                          <div>
                            <div>经销商:</div>
                            <div className='flex-1'>广州恒福福特</div>
                            <div className='mo_listInfo_tel'>
                              <span className='iconfont icon-dianhua'></span>
                              <span>021-12345612</span>
                            </div>
                          </div>

                          <div>
                            <div></div>
                            <div className='mo_listInfo_area'>
                              <span className='iconfont icon-dingwei'></span>
                              <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                            </div>
                            <div className='mo_listInfo_map'>
                              <span className='iconfont icon-ditu'></span>
                              <span>地图</span>
                            </div>

                          </div>

                          <div className='mo_list_userInfo'>
                            <div>用户信息:</div>
                            <div>张先生</div>
                            <div>13012123123</div>
                          </div>

                          <div>
                            <div>订单金额:</div>
                            <div>￥5000</div>
                          </div>

                          <div>
                            <div>下单时间:</div>
                            <div>2018.01.10</div>
                          </div>

                        </div>

                        <div className='mo_btnBox'>
                          <div>查看详情</div>
                          <div className='mo_goPay'>去支付</div>
                        </div>

                      </li>


                    </ul>
                  </div>
                  <div>
                    <ul className='mo_listBox'>
                      <li className='mo_listItem'>
                        <div className='mo_listTitle'>
                          <div>订单号:00004</div>
                          <div>状态：待支付</div>
                        </div>

                        <div className='mo_listInfo'>
                          <div>
                            <div>订单商品:</div>
                            <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                          </div>

                          <div>
                            <div>经销商:</div>
                            <div className='flex-1'>广州恒福福特</div>
                            <div className='mo_listInfo_tel'>
                              <span className='iconfont icon-dianhua'></span>
                              <span>021-12345612</span>
                            </div>
                          </div>

                          <div>
                            <div></div>
                            <div className='mo_listInfo_area'>
                              <span className='iconfont icon-dingwei'></span>
                              <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                            </div>
                            <div className='mo_listInfo_map'>
                              <span className='iconfont icon-ditu'></span>
                              <span>地图</span>
                            </div>

                          </div>

                          <div className='mo_list_userInfo'>
                            <div>用户信息:</div>
                            <div>张先生</div>
                            <div>13012123123</div>
                          </div>

                          <div>
                            <div>订单金额:</div>
                            <div>￥5000</div>
                          </div>

                          <div>
                            <div>下单时间:</div>
                            <div>2018.01.10</div>
                          </div>

                        </div>

                        <div className='mo_btnBox'>
                          <div>查看详情</div>
                          <div className='mo_goPay'>去支付</div>
                        </div>

                      </li>


                    </ul>
                  </div>
                  <div>
                    <ul className='mo_listBox'>
                      <li className='mo_listItem'>
                        <div className='mo_listTitle'>
                          <div>订单号:00005</div>
                          <div>状态：待支付</div>
                        </div>

                        <div className='mo_listInfo'>
                          <div>
                            <div>订单商品:</div>
                            <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                          </div>

                          <div>
                            <div>经销商:</div>
                            <div className='flex-1'>广州恒福福特</div>
                            <div className='mo_listInfo_tel'>
                              <span className='iconfont icon-dianhua'></span>
                              <span>021-12345612</span>
                            </div>
                          </div>

                          <div>
                            <div></div>
                            <div className='mo_listInfo_area'>
                              <span className='iconfont icon-dingwei'></span>
                              <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                            </div>
                            <div className='mo_listInfo_map'>
                              <span className='iconfont icon-ditu'></span>
                              <span>地图</span>
                            </div>

                          </div>

                          <div className='mo_list_userInfo'>
                            <div>用户信息:</div>
                            <div>张先生</div>
                            <div>13012123123</div>
                          </div>

                          <div>
                            <div>订单金额:</div>
                            <div>￥5000</div>
                          </div>

                          <div>
                            <div>下单时间:</div>
                            <div>2018.01.10</div>
                          </div>

                        </div>

                        <div className='mo_btnBox'>
                          <div>查看详情</div>
                          <div className='mo_goPay'>去支付</div>
                        </div>

                      </li>


                    </ul>
                  </div>
                </Tabs>

              </div>
            </div>
            :
            <div className='mo_orderBox'>
              <div>
                <Tabs tabs={this.state.tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                  <ul className='mo_listBox'>
                    <li className='mo_listItem'>
                      <div className='mo_listTitle'>
                        <div><span className='mo_yysj'>预约试驾</span>预约号:01</div>
                        <div>状态：待支付</div>
                      </div>

                      <div className='mo_listInfo'>
                        <div>
                          <div>意向车型:</div>
                          <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                        </div>

                        <div>
                          <div>经销商:</div>
                          <div className='flex-1'>广州恒福福特</div>
                          <div className='mo_listInfo_tel'>
                            <span className='iconfont icon-dianhua'></span>
                            <span>021-12345612</span>
                          </div>
                        </div>

                        <div>
                          <div></div>
                          <div className='mo_listInfo_area'>
                            <span className='iconfont icon-dingwei'></span>
                            <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                          </div>
                          <div className='mo_listInfo_map'>
                            <span className='iconfont icon-ditu'></span>
                            <span>地图</span>
                          </div>

                        </div>

                        <div className='mo_list_userInfo'>
                          <div>预约信息:</div>
                          <div>张先生</div>
                          <div>13012123123</div>
                        </div>

                        <div>
                          <div>预约时间:</div>
                          <div>2018.10.10</div>
                        </div>

                        <div>
                          <div>到店时间:</div>
                          <div>2018.01.10</div>
                        </div>

                      </div>

                      <div className='mo_btnBox'>
                        <div>查看详情</div>
                        <div className='mo_goPay'>去支付</div>
                      </div>

                    </li>


                  </ul>
                  <ul className='mo_listBox'>
                    <li className='mo_listItem'>
                      <div className='mo_listTitle'>
                        <div><span className='mo_yysj'>预约试驾</span>预约号:002</div>
                        <div>状态：待支付</div>
                      </div>

                      <div className='mo_listInfo'>
                        <div>
                          <div>意向车型:</div>
                          <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                        </div>

                        <div>
                          <div>经销商:</div>
                          <div className='flex-1'>广州恒福福特</div>
                          <div className='mo_listInfo_tel'>
                            <span className='iconfont icon-dianhua'></span>
                            <span>021-12345612</span>
                          </div>
                        </div>

                        <div>
                          <div></div>
                          <div className='mo_listInfo_area'>
                            <span className='iconfont icon-dingwei'></span>
                            <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                          </div>
                          <div className='mo_listInfo_map'>
                            <span className='iconfont icon-ditu'></span>
                            <span>地图</span>
                          </div>

                        </div>

                        <div className='mo_list_userInfo'>
                          <div>预约信息:</div>
                          <div>张先生</div>
                          <div>13012123123</div>
                        </div>

                        <div>
                          <div>预约时间:</div>
                          <div>2018.10.10</div>
                        </div>

                        <div>
                          <div>到店时间:</div>
                          <div>2018.01.10</div>
                        </div>

                      </div>

                      <div className='mo_btnBox'>
                        <div>查看详情</div>
                        <div className='mo_goPay'>去支付</div>
                      </div>

                    </li>


                  </ul>
                  <ul className='mo_listBox'>
                    <li className='mo_listItem'>
                      <div className='mo_listTitle'>
                        <div><span className='mo_yysj'>预约试驾</span>预约号:0003</div>
                        <div>状态：待支付</div>
                      </div>

                      <div className='mo_listInfo'>
                        <div>
                          <div>意向车型:</div>
                          <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                        </div>

                        <div>
                          <div>经销商:</div>
                          <div className='flex-1'>广州恒福福特</div>
                          <div className='mo_listInfo_tel'>
                            <span className='iconfont icon-dianhua'></span>
                            <span>021-12345612</span>
                          </div>
                        </div>

                        <div>
                          <div></div>
                          <div className='mo_listInfo_area'>
                            <span className='iconfont icon-dingwei'></span>
                            <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                          </div>
                          <div className='mo_listInfo_map'>
                            <span className='iconfont icon-ditu'></span>
                            <span>地图</span>
                          </div>

                        </div>

                        <div className='mo_list_userInfo'>
                          <div>预约信息:</div>
                          <div>张先生</div>
                          <div>13012123123</div>
                        </div>

                        <div>
                          <div>预约时间:</div>
                          <div>2018.10.10</div>
                        </div>

                        <div>
                          <div>到店时间:</div>
                          <div>2018.01.10</div>
                        </div>

                      </div>

                      <div className='mo_btnBox'>
                        <div>查看详情</div>
                        <div className='mo_goPay'>去支付</div>
                      </div>

                    </li>


                  </ul>
                  <ul className='mo_listBox'>
                    <li className='mo_listItem'>
                      <div className='mo_listTitle'>
                        <div><span className='mo_yysj'>预约试驾</span>预约号:0004</div>
                        <div>状态：待支付</div>
                      </div>

                      <div className='mo_listInfo'>
                        <div>
                          <div>意向车型:</div>
                          <div className='mo_carTags'>
                              <span>福特福克斯</span>
                              <span>三厢</span>
                              <span>EcoBoost</span>
                              <span>1.5T</span>
                              <span>自动旗舰型</span>
                            </div>
                        </div>

                        <div>
                          <div>经销商:</div>
                          <div className='flex-1'>广州恒福福特</div>
                          <div className='mo_listInfo_tel'>
                            <span className='iconfont icon-dianhua'></span>
                            <span>021-12345612</span>
                          </div>
                        </div>

                        <div>
                          <div></div>
                          <div className='mo_listInfo_area'>
                            <span className='iconfont icon-dingwei'></span>
                            <span>重庆市萝岗区科丰路31号花卉阿萨德</span>
                          </div>
                          <div className='mo_listInfo_map'>
                            <span className='iconfont icon-ditu'></span>
                            <span>地图</span>
                          </div>

                        </div>

                        <div className='mo_list_userInfo'>
                          <div>预约信息:</div>
                          <div>张先生</div>
                          <div>13012123123</div>
                        </div>

                        <div>
                          <div>预约时间:</div>
                          <div>2018.10.10</div>
                        </div>

                        <div>
                          <div>到店时间:</div>
                          <div>2018.01.10</div>
                        </div>

                      </div>

                      <div className='mo_btnBox'>
                        <div>查看详情</div>
                        <div className='mo_goPay'>去支付</div>
                      </div>

                    </li>


                  </ul>

                  
                </Tabs>

              </div>
            </div>
        }



      </div>
    );
  }
}

module.exports = OrderList;
