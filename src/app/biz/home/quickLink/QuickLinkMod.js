/**
 * Created by zhang.weihua on 2018/3/28.
 */
import {observable,action,runInAction,useStrict,autorun, computed} from 'mobx';
import Serv from './QuickLinkServ';

useStrict(true)
class QuickLink {

    @observable state = {
        quickLinkList: []
    }


    @computed get data() {
        let my = [],
            service = [];
        for(let item of this.state.quickLinkList) {
            if (+item.type === 1) {
                service.push(item);
            }else {
                my.push(item);
            }
        }
        return {
            my,
            service
        }
    }

    @action
    async getQuickLinkList() {
        let { data, resultCode, resultMsg } = await Serv.getQuickLinkList();
        runInAction(() => {
            this.state.quickLinkList = data;
        })

    }


}

const quickLink = new QuickLink();
export default quickLink;