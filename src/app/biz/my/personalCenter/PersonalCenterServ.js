/**
 * Created by zhang.weihua on 2018/3/26.
 */

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {


    static getMemberInfo() {

        let headers = {
            "Content-type": "application/json",
            "auth":Util.getLocalCache(Config.authName)
        }

        return Request({
            url: "members/info",
            type: "GET",
            headers: headers
        })
    }
}