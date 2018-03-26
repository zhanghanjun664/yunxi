/**
 * Created by zhang.weihua on 2018/3/23.
 */

import React, { PropTypes, Component } from 'react';
import './index.less';

function starRange({ number = 0, max = 5, className=''}) {

    let starArr = [];
    let num = Math.floor(number);
    for(let i = 0; i < num; i++) {
        starArr.push(<div className="star-icon" key={'star'+i}></div>);
    }
    if (number % 1 > 0) {
        starArr.push(<div className="half-star-icon" key={'star'+num}></div>);
    }
    let length = starArr.length;
    for(let i = 0; i < max - length; i++) {
        starArr.push(<div className="grey-star-icon" key={'star'+ (length + i)}></div>);
    }

    return (
        <div className={`star-range-widget ${className}`}>
            {starArr}
        </div>
    )
}

module.exports = starRange;