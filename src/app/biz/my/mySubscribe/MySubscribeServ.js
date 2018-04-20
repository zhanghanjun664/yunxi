

import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {


    //获取预约列表
    static getAppointment(params) {
        return Request({
            url: "personal/appointment/list",
            type: "GET",
            data: params,
        });
    }
}