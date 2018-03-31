/**
 * Created by zhang.weihua on 2018/3/30.
 */

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {

    static getDealerList(params) {

        let headers = {
            "Content-type": "application/json",
            "auth":Util.getLocalCache(Config.authName)
        }

        return Request({
            url: "caf/jdcloud/dealer/offers",
            type: "GET",
            data: params,
            headers: headers
        })
    }

}