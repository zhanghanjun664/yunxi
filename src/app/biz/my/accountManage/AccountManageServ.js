import Request from "util/Request";
import Config from 'config/Config';
import Util from 'util';

export default class {


    static getMemberInfo() {
        return Request({
            url: "members/info",
            type: "GET"
        })
    }
}