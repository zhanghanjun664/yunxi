/**
 * Created by zhang.weihua on 2018/3/23.
 */

import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './DealerQuotationServ';

useStrict(true)
class DealerQuotationMod {

    @observable state = {

    }

    @action
    getDealerList(params) {
        console.log(params)
        return Serv.getDealerList(params);
    }
}

const dealerQuotation = new DealerQuotationMod();
export default dealerQuotation;