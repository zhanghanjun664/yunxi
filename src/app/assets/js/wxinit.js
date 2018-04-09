$(function() {
    
    const API_URL = 'https://wxdev.dtyunxi.cn/ford/dev/caf-trade-application/';

    const api_config = 'api/v1/weixin/config';


    function initConfig(fn, debug=false) {
        let url = document.location.href.split('#')[0]
        return $.ajax({
            url : API_URL + api_config,
            type:'GET',
            data: { 
                url: url
            },
            cache:false,
            timeout:15000
        }).done(function(data, statusText, xhr) {
            wx.config({
                debug: debug,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ['onMenuShareTimeline', 'chooseImage','uploadImage','previewImage','onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getLocation', 'openLocation','getNetworkType']
            })
        }).fail(function(err) {
            console.error('Request Fail->', err)
        })

        wx.ready(fn)
    }

    initConfig(function() {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res) => {
                let {latitude, longitude, accuracy} = res;
                // 纬度，浮点数，范围为90 ~ -90
                // 经度，浮点数，范围为180 ~ -180。
                alert('Latitude, Longit ->' + latitude + '--' + longitude)
                localStorage.setItem('myPosition', JSON.stringify(res));
            }
        });
    }, false);

})