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
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'getLocation', 'openLocation','getNetworkType']
            })
        }).fail(function(err) {
            console.error('Request Fail->', err)
        })

        wx.ready(fn)
    }

    initConfig(function() {
        console.log('WXSDK is Ready!');
    }, true);

})