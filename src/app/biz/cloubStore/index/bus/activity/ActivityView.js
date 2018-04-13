import { Carousel } from 'antd-mobile';
import React from 'react';
import './ActivityLess.less';
import PopularModelsView from './../popularModels/PopularModelsView' ;

import IndexUtil from './../../global/IndexUtil' ;
import { inject,observer } from 'mobx-react';

/*
 * 云店首页banner
 * @author lvlin
 * @time 2017-3
 * */

@inject("cloubStoreIndex")
@observer
class ActivityView extends React.Component {
  
  constructor(props){
    super(props) ;
    this.state = {
      //data: ['banner01', 'banner02', 'banner03','banner04'],
      //slideIndex: 0,
    }
    
    this.stores = this.props.cloubStoreIndex ;
    //console.log(this.store) ;
    
  }

  componentDidMount() {
    //console.log(this.stores.getActivityBannerList());
    this.stores.getActivityBannerList();
  }
  render() {
    
    return (
      <div id="bnk">
        <Carousel
          autoplay={true}
          infinite={true}
          selectedIndex={0}
          dots={false}
          //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          //afterChange={index => console.log('slide to', index)}
        >
          {this.stores.state.activityBannerList.map(val => (
            <a
              key={val}
              onClick={e=>{IndexUtil.toUrl(val.redirectUrl)}}
              style={{ display: 'inline-block'}}
            >
              <img
                src={val.imgUrl}
                alt=""
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        
      </div>
    );
  }
}
module.exports =  ActivityView;