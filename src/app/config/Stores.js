import test from 'biz/demo/test/TestMod';
import test3 from 'biz/demo/test3/TestMod';
import modelList from 'biz/carModel/carModelList/modelListMod';
import productDetailIndex from 'biz/carModel/carModelDetail/index/indexMod';
import productDetailBaseInfo from 'biz/carModel/carModelDetail/baseInfo/baseInfoMod';
import orderList from 'pubBiz/orderList/orderListMod';
import home from 'biz/home/index/IndexMod';
import complateInfo from 'biz/my/myComplate/myComplateMod'
import mySubsribe from 'biz/my/mySubscribe/mySubscribeMod';
import cloubStoreIndex from './../biz/cloubStore/index/IndexMod' ;
import cloubStoreCarModelDetail from './../biz/cloubStore/carModelDetail/index/indexMod' ;
import askPrice from './../biz/askPrice/askPriceMod' ;
import dealerPrice from './../biz/carModel/dealerPrice/dealerPriceMod' ;
import activity from './../biz/activity/index/indexMod' ;
import activityDetails from 'biz/activity/activityDetails/ActivityDetailsMod';
import myOrder from 'biz/my/myOrder/myOrderMod';

//在这里为所有的组件进行导出，将其注册到根组件
export default{
    test,
    test3,
    modelList,
    productDetailIndex,
    productDetailBaseInfo,
    orderList,
    home,
    complateInfo,
    mySubsribe,
    cloubStoreIndex,
    cloubStoreCarModelDetail,
    askPrice,
    dealerPrice,
    activity,
    activityDetails,
    myOrder,
}