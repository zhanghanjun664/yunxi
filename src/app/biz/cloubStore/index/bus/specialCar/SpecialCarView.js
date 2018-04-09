import React,{Component} from 'react' ; 

import MaskTitle from '../../global/title/TitleView' ;

import './SpecialCarLess.less' ;
import { inject, observer } from 'mobx-react';
/**
 * yie.lvlin
 * 2018年3月20日 14点29分
 * 特惠车专区
 */
@inject("cloubStoreIndex")
@observer
class SpecialCar extends Component{

    constructor(props,context){
        super(props,context) ;

        this.stores = this.props.cloubStoreIndex ; 
    }

    componentDidMount(){
        this.stores.getSpecialCar() ;
    }
    //跳转车型详情
    goToDetail = (e) => {
        
        let itemCode = e.currentTarget.getAttribute('carid') ;
        let itemId = '1171328588805309440' ;
        
        //使用此方法可以传递任意数据到下一个页面
        //通过this.prop.location.state 获取
        let path = {
            pathname:`/cloubStore/carModelDetail`,
            query:{
                "itemCode":itemCode,
                itemId
            }
        }

        window.app.routerGoTo(path) ;
    }

    render(){

        let {specialCarList} = this.stores.state ; 
        
        return(

            <MaskTitle className='specialCar' iconClass='icon icon-discount'  titleName='特惠车专区'>
                <div className="product-list">
                
                {
                    specialCarList.map((val,i) => {
                                                
                        return(
                            <div className="product-item" key={`special${i}`} carid={val.id} onClick={this.goToDetail}>
                                <div className="img-wrap">
                                    <img src={val.imgUrl} />
                                </div>
                                <div className="product-name ellipsis-two">
                                    {val.name}
                                    <span className='product-name-bule'>(库存车型，数量有限)</span>
                                </div>
                                <div className="product-price">
                                    <span>￥{val.discountPrice}</span>
                                    <del>￥{val.originalPrice}</del>
                                </div>
                                <div className='product-item-label'>
                                    <i className='iconfont icon-remenhaoche' />
                                    <span>热门好车</span>
                                </div>
                            </div>
                        ) 
                    })
                }
                </div>
            </MaskTitle>
        )

    }

}
//iconUrl='assets/images/cloubStore/tehuiche.png'
module.exports = SpecialCar ;

/**
 * 
 * <div className="product-item">
                        <div className="img-wrap">
                            <img src="assets/images/home/car02.png" />
                        </div>
                        <div className="product-name ellipsis-two">
                            福克斯 2015款 1.5T自动精英型(库存车型，数量有限)
                        </div>
                        <div className="product-price">
                            <span>￥95,800</span>
                            <del>￥100,000</del>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="img-wrap">
                            <img src="assets/images/home/car02.png" />
                        </div>
                        <div className="product-name ellipsis-two">
                            福克斯 2015款 1.5T自动精英型(库存车型，数量有限)
                        </div>
                        <div className="product-price">
                            <span>￥95,800</span>
                            <del>￥100,000</del>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="img-wrap">
                            <img src="assets/images/home/car02.png" />
                        </div>
                        <div className="product-name ellipsis-two">
                            福克斯 2015款 1.5T自动精英型(库存车型，数量有限)
                        </div>
                        <div className="product-price">
                            <span>￥95,800</span>
                            <del>￥100,000</del>
                        </div>
                    </div>
                    <div className="product-item">
                        <div className="img-wrap">
                            <img src="assets/images/home/car02.png" />
                        </div>
                        <div className="product-name ellipsis-two">
                            福克斯 2015款 1.5T自动精英型(库存车型，数量有限)
                        </div>
                        <div className="product-price">
                            <span>￥95,800</span>
                            <del>￥100,000</del>
                        </div>
                    </div>
 */