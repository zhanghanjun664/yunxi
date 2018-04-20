import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './IndexServ';


useStrict(true)
class Search {
    @observable state = {
      style: {}
    };

    @action
    setStyle(style){
        this.state.style = style
    }

    /**
     * 车型搜索 
     * @param {*} params {
     *  type  :搜索类型，1：价格最低，2：价格最高，3：热度最高
     *  content:搜索内容
     *  pageNum:页码，default:1
     *  pageSize:每页的数量，deault:10
     * }
     */
    @action
    async getDealerInfo(params) {
        let {data, resultCode, resultMsg} = await Serv.getDealerInfo(params);
        runInAction(() => {
            this.state.dealerInfo = data ;
        })
    }

    
}
const search = new Search();


export default search;