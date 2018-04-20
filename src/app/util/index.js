/**
 * 常用工具类
 */
import React, { Component } from 'react';

class util {
    // 打印mobx监视的对象(mobx只能看到get set的函数，无法看到完整的数据结构)
    static log(log){
        return JSON.parse(JSON.stringify(log))
    }

    // 判断是否iphoneX
    static isIphoneX() {
        if(/iphone/ig.test(navigator.userAgent)) {
            // (window.innerWidth == 375*3) && (window.innerHeight == 724*3)
           return window.devicePixelRatio === 3 && (screen.height == 812 && screen.width == 375)
        }
        return false;
    }
    //判断是安卓还是ios
    static androidOrios() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
            return "Android"

        }
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return "IOS" 
        }
    }
    //给local缓存值
    static setLocalCache(c_name, value) {
        localStorage.setItem(c_name, JSON.stringify(value))
    }

    //取回local
    static getLocalCache(c_name) {
        var tem = localStorage.getItem(c_name);
        return tem;
    }

    // checkInput 检查姓名，手机，验证码的格式
    static checkInput(value, type) {
        let maps = {
            'mobile' : /^1[3758]\d{9}$/g,
            'verifyCode' : /^\d{6}$/g,
            'realName' : /^[a-z\u4e00-\u9fa5]{3,20}$/g
        }
        return maps[type].test(value);
    }


    // stringfy
    static qs(obj) {
        let arr = [];
        for(let i in obj) {
            arr.push(`${i}=${obj[i]}`)
        }
        return arr.join('&');
    }


    //从url取值
    static getQueryString(name = '') {
        var after = window.location.hash.split("?")[1] || '';
        if (after && name) {
            var reg = new RegExp("(^|&)" + name.trim() + "=([^&]*)(&|$)");
            var r = after.trim().match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            else {
                return null;
            }
        }
    }
    //时间转换
    static formatDate(str, type = 1) {
        let [y, m, d, h, min, s] = str.replace(/[-|:]/g, " ").split(" ");
        let ns = "";
        switch (type) {
            case 1:
                ns = y + "." + m + "." + d
                break
            case 2:
                ns = y + "." + m + "." + d + " " + h + ":" + min + ":" + s
                break
        }
        return ns
    }
    //获取时间戳
    static getTimestamp(str) {
        let dates = str.replace(/[-]/g, "/");
        let ts = new Date(dates).getTime()
        return ts
    }
    // 获取滚动条高度
    static getScrollTop() {
        var scrollTop = 0;
        // pc
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            // 移动
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    // 获取滚动容器高度
    static getScrollHeight(arr) {
        var scrollHeight = document.body.clientHeight;
        for (let i = 0; i < arr.length; i++) {
            scrollHeight -= document.getElementsByClassName(arr[i])[0].clientHeight
        }
        return scrollHeight;
    }
    // 元->万
    static changeMoney(str) {
        return (Number(str)/10000).toFixed(2);
    }
    // 米->千米
    static changeDistance(str) {
        return (Number(str)/1000).toFixed(2);
    }
    // 处理url
    static getUrl(url) {
        console.log(url)
        let urls = ""
        if(url.indexOf('http') == -1){
            urls = 'http://' + url
        }else{
            urls = url
        }
        return urls
    }
    // 获取cityId
    static getCityID() {
        let tmp = localStorage.getItem('myCity');
        if(tmp !==  null) {
            let {postCode} = JSON.parse(tmp);
            return JSON.parse(tmp)
        } else {
            return {}
        }
    }
    // 打开并调起地图
    static go2Map(address){
        let callbacks={
            complete:function(results){
                let name = results.detail.address
                let { lat, lng } =  results.detail.location
                wx.openLocation({
                    latitude: lat, // 纬度，浮点数，范围为90 ~ -90
                    longitude: lng, // 经度，浮点数，范围为180 ~ -180。
                    name: name, // 位置名
                    address: name, // 地址详情说明
                    scale: 19, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            }
        }
        let geocoder = new qq.maps.Geocoder(callbacks);
        geocoder.getLocation(address);
    }
    // 获取经纬度
    static getCoordinate() {
        let tmp = localStorage.getItem('myPosition');
        if(tmp !==  null) {
            let {longitude, latitude} = JSON.parse(tmp);
            return {
                longitude,
                latitude
            };
        } else {
            return {
                longitude:23.10674,
                latitude:113.440332,
            }
        }
    }

}


export default util;