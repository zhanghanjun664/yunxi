/**
 * Created by zhang.weihua on 2018/3/23.
 */

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {

    static getDealerList(params) {

        return Request({
            url: "caf/jdcloud/dealer/offers",
            type: "GET",
            data: params,
        })
    }

}