import Request from "util/Request";

export default class {

    // 留下资料
    static submitApp(params) {
        return Request({
            url: "mall/activity/beijing/attend",
            type: "POST",
            data:params
        })
    }

    // 取一个车型的名字
    static getDetail(params) {
        return Request({
            url : 'caf/jdcloud/item/car/info',
            data: params,
            type:'GET'
        })
    }
}