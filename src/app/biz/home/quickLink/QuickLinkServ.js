/**
 * Created by zhang.weihua on 2018/3/28.
 */

import Request from "util/Request";

export default class {

    static getQuickLinkList() {
        return Request({
            url: "caf/jdcloud/index/quickLink",
            type: "GET",
        })
    }
}