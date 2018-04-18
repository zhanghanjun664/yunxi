import Request from "util/Request";

export default class{

    /**
     * 获取活动轮播图列表
     * storeCode  云店编码
     */
    static getActivityList(storeCode){

        try {
            let data = Request({
                url: "caf/jdcloud/index/carouselFigure",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            console.log(e)
        }
    }
}