/**
 * Created by zhang.weihua on 2018/3/30.
 */
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './InquireDealerServ';

useStrict(true)
class InquireDealerMod {

    @observable state = {
        distanceList: [],
        priceList: []
    };

    getDealerList(params) {
        return Serv.getDealerList(params);
    }
}

const inquireDealer = new InquireDealerMod();
export default inquireDealer;