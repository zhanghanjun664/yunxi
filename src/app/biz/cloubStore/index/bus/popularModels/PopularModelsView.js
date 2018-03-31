import { Carousel , Button} from 'antd-mobile';
import React from 'react';
import './PopularModelsLess.less';
import { inject , observer } from 'mobx-react';


/**
 * 热门车型
 */
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
        cellSpacing={0}
        slideWidth={0.33333334}
        autoplay={true}
        infinite={true}
        dots={false}
        //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => this.setState({ slideIndex: index })}
      >
        {hotItemList.map((val,i)=>(
          
          <div key={i} className='carItem'>
            <div 
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
              
            </div>
            <div className='popCar-price'>
              <p className="popCar-jiage">￥{val.officialPrice}万</p>
              <div className='popCar-next'>
                <i className="iconfont icon-next"></i>
              </div>
            </div>
            {
              i%3===0?
              <div className='popCar-fil'>
                <span>热门好车</span>
                <span>精 · 选</span>
              </div>:''
            }
          </div>
        ))}
      </Carousel>
      <div className="popCar-allCar" >
        <Button 
          onClick={this.handleClickAllCars}
          className='popCar-allCar-btn'
          style={{border:"1px solid #FD5C0E"}}
          >
          全部车型 >
          </Button>
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