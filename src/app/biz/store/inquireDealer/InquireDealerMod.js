/**
 * Created by zhang.weihua on 2018/3/30.
 */
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './InquireDealerServ';

useStrict(true)
class InquireDealerMod {

    @observable state = {
        distanceList: [],
        priceList: [],
        isPullToRefresh: true
    };

    getDealerList(params) {
        return Serv.getDealerList(params);
    }
    @action
    changeDirection = () => {
        console.log(111111111)
        this.state.isPullToRefresh = !this.state.isPullToRefresh;
    }
}

const inquireDealer = new InquireDealerMod();
export default inquireDealer;