import Request from "util/Request";

export default class {
    static getVerifyCode(params) {
        return Request({
            url : 'verify/code/get',
            data:params,
            type:'GET'
        })
    }

    static getMemberinfo(params) {
        return Request({
            url : 'members/info',
            data: params,
            type:'GET'
        })
    }
    

    static submitBind(params) {
        return Request({
            url : 'caf/jdcloud/member',
            data: params,
            type:'POST'
        })
    }
};