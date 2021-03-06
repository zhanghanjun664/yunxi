import React, { PropTypes, Component } from 'react';
import Request from "util/Request";

//export async function resourceTree(params) {
//    return request({
//        url: '/sys/resource/tree',
//        method: 'GET',
//        data: params
//    });
//};
//async cc(){
//    try{
//        let data = await Request({
//            url:"http://192.168.33.11:8004/mocking/nuskin/api/v1/yundt/mgmt/item/list-by-page",
//            type:"POST",
//            data:{xx:1,bb:2}
//        })
//    }catch (e){
//        console.log(e)
//    }
//}

export default class {
    static MockServ() {
        return Request({
            url: "http://192.168.33.11:8004/mocking/caf/api/v1/caf/jdcloud/dealer/offers",
            // url: "caf-jdcloud-dealer-offers.json",
            type: "GET",
            data:{
                carName:'car',
                longitude:'0001',
                latitude:'001',
                cityId:'0001',
                pageNum:1,
                pageSize:2,
                type:0
            }
        })
    }
    static testServ2() {
        return Request({
            url: "yundt/mgmt/item/list-by-page",
            type: "GET",
            data: {xx: 1, bb: 2}
        })
    }
};