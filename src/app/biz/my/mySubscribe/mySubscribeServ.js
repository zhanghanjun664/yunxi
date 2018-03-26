

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {


    //获取预约列表
    static getAppointment(params) {

        let headers = {
            "Content-type": "application/json",
            "auth":Util.getLocalCache(Config.authName)
        }

        return Request({
            url: "caf/api/v1/appointment/list",
            type: "GET",
            data: JSON.stringify(params),
            headers: headers
        });
    }
}