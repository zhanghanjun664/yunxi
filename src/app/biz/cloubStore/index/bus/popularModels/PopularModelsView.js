import { Carousel } from 'antd-mobile';
import React from 'react';
import './PopularModelsLess.less';
import { inject , observer } from 'mobx-react';

 @inject("cloubStoreIndex")
 @observer
class PopularModelsView extends React.Component {
    
  constructor(props){
    super(props);
    this.stores=this.props.cloubStoreIndex;
    
    
  }
  componentDidMount() {
    
    this.stores.getHotItemList();
  }

  handleClick = (e) => {
    window.app.routerGoTo('/cloubStore/carModelDetail')
  }

  /**
   * 点击查看全部车型
   */
  handleClickAllCars = (e) => {

    window.app.routerGoTo('/carModelList') ;
  }

  render() {
    let {hotItemList} = this.stores.state ;
    return (
      <div id="wk">
        <Carousel className="space-carousel"
        frameOverflow="visible"
        cellSpacing={13}
        slideWidth={0.33333334}
        autoplay={true}
        infinite={true}
        dots={false}
        //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {hotItemList.map((val,i)=>(
          <a
            id="tp_a"
            key={i}
            href="javascript:;"
            onClick={this.handleClick}
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
            <p id="jiage">￥{val.officialPrice}万</p>
            <i className="iconfont icon-next"></i>
          </a>
        ))}
      </Carousel>
      <div id="an" onClick={this.handleClickAllCars}>全部车型 ></div>
    </div>
    );
  }
}
  
  module.exports = PopularModelsView;