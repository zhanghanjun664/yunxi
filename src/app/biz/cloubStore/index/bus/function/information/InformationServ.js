import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

export default class{
    
    static getNews(){
        try {
            let data = Request({
                url: "caf/jdcloud/index/news",
                type: "GET",
            }) ;

            return data
        } catch (error) {
            console.log(error) ;
        }
    }
}