import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './BjexhiServ';
import Config from 'config/Config';

useStrict(true)
class Bjexhi {
    @observable state = {
        isLoading: false, // 是否在请求中
        modelDetail: {
            name:'选择车型'
        },
        submitResid:'' // 提交后的单号
    };

    @action 
    setLoading(flag) {
        this.state.isLoading = flag
    }

    @action 
    async submitApp(params) {
        this.state.isLoading = true;
        let {resultCode, data} = await Serv.submitApp(params);
        runInAction(()=> {
            this.state.submitResid = data;
            this.state.isLoading = false;
        })
    }

    @action
    async getDetail(params) {
        let {resultCode, data} = await Serv.getDetail(params);
        runInAction(()=> {
            this.state.modelDetail = data;
        })

    }
}

export default new Bjexhi();