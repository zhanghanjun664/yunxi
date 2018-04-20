/**
 * Created by zhang.weihua on 2018/3/26.
 */

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {


    static getMemberInfo() {
        return Request({
            url: "personal/members/info",
            type: "GET"
        })
    }
}