
import Request from "util/Request";

/**
 * 云店车型详情请求服务
 */
export default class{

    /**
     * 
     * @param {*} params {
     *   itemCode  --车型编码
     *   storeCode  --云店编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2755
     */
    static getCarDetailBaseInfo(params){

        try {
            let data = Request({
                url: "caf/jdcloud/store/item/info/base",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ; 
            console.log(e)
        }
    }

    /**
     * 查询用户是否已关注车型
     * @param {*} params {
     *   itemCode  --车型编码
     *   account  --微信unionId
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2764
     */
    static getFollowFlag(params){
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/follow",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ; 
            console.log(e)
        }
    }

    /**
     * 查询车型评价列表
     * @param {*} params {
     *   itemCode  --车型编码
     *   pageNum  --当前页码数，不传后台默认是1
     *   pageSize  --每页的记录数，不传后台默认是10
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2764
     */
    static getCommentList(params){
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/comment",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ; 
            console.log(e)
        }
    }

    /**
     * 查询商品活动
     * @param {*} params {
     *   storeId  --云店id（官方商城活动不传此参数）
     *   pageNum  --当前页码数
     *   pageSize  --每页记录数
     *   type   --活动类型
     *   areaCode  --城市编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2709
     */
    static getCloubActivity(params){
        try {
            let data = Request({
                url: "shop/activity/list-by-page",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ; 
            console.log(e)
        }
    }

    /**
     * 云店车型详情
     * @param {*} params {
     *   itemCode  --车型编码
     * }
     * http://192.168.33.11:8004/document/detailPage?id=2762
     */
    static getCarDetailInfo(params){
        try {
            let data = Request({
                url: "caf/jdcloud/store/item/detail-info",
                type: "GET",
                data: params
            })
            return data;
        } catch (e) {
            Toast.fail(e) ; 
            console.log(e)
        }
    }
    
}