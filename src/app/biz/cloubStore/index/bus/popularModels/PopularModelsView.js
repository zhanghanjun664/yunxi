import { Flex, Carousel, Button } from 'antd-mobile';
import React from 'react';
import './PopularModelsLess.less';
import { inject, observer } from 'mobx-react';
/**
 * 热门车型
 */
@inject("cloubStoreIndex")
@observer
class PopularModelsView extends React.Component {

  constructor(props) {
    super(props);
    this.stores = this.props.cloubStoreIndex;


  }
  componentDidMount() {

    //TODO 待修改为默认
    this.stores.getHotItemList();
  }

  handleClick = (itemId) => {
    // let path = {
    //   "pathname":'cloubStore/carModelDetail' ,
    //    "state":{
    //      "itemId":itemId
    //    }
    // }
    window.app.routerGoTo(`cloubStore/carModelDetail?itemId=${itemId}&dealerId=${this.stores.state.dealerId}`);
  }

  /**
   * 点击查看全部车型
   */
  handleClickAllCars = (e) => {

    window.app.routerGoTo('/carModelList?tabBarType=1&dealerId=' + this.stores.state.dealerId);
  }

  render() {
    let { hotItemList } = this.stores.state;

    if (hotItemList.length > 3) {
      //只取前三位
      hotItemList = hotItemList.slice(0, 3);
    }
    console.log(hotItemList)
    return (
      <div id="wk">
        {/* <Carousel className="space-carousel"
        frameOverflow="visible"
        cellSpacing={0}
        slideWidth={0.33333334}
        autoplay={true}
        infinite={true}
        dots={false}
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {hotItemList.map((val,i)=>(
          
          <div key={i} className='carItem'>
            <div 
              itemID={val.itemId}
              onClick={this.handleClick.bind(this,val.itemId)}
            >
              <img
                id="tp"
                src={val.imgUrl}
                alt=""
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                }}
              />
              
            </div>
          </div>
        ))}
      </Carousel> */}
        <Flex className='hot-cars'>
          {
            hotItemList.map((val, index) => {
              return (
                <Flex.Item className={val.imgUrl ? "car-item" : 'invisible'} key={`hot-car-${index}`}>
                  <img src={val.imgUrl} onClick={this.handleClick.bind(this, val.itemId)} />
                </Flex.Item>
              )
            })
          }
        </Flex>
        <div className="popCar-allCar" >
          <div
            onClick={this.handleClickAllCars}
            className='popCar-allCar-btn'
          >
            全部车型
        </div>
        </div>
      </div>
    );
  }
}

/**
 * <div>
              <p id="jiage">￥{val.officialPrice}万</p>
              <i className="iconfont icon-next"></i>
              {
                i%3===0?
                <div className='popCar-fil'>
                  <span>热门好车</span>
                  <span>精 · 选</span>
                </div>:''
              }
              </div>
 */

module.exports = PopularModelsView;