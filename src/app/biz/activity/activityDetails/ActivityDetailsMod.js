/**
 * Created by zhang.weihua on 2018/3/23.
 */
import {observable,action,runInAction,useStrict,autorun} from 'mobx';
import Serv from './ActivityDetailsServ';

useStrict(true)

class ActivityDetails {

    @observable state = {
        show: false,             //展示modal
        checked: true,           //勾选同意协议框
    };

    @action
    openModal = () => {
        this.state.show = true;
    }

    @action
    onClose = () => {
        this.state.show = false;
    }

    @action
    checkboxChange = () => {
        this.state.checked = !this.state.checked
    }


}

const activityDetails = new ActivityDetails();
export default activityDetails;