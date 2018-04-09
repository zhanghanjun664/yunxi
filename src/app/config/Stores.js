import modelList from 'biz/carModel/carModelList/ModelListMod';
import productDetailIndex from 'biz/carModel/carModelDetail/index/IndexMod';
import home from 'biz/home/index/IndexMod';
import complateInfo from 'biz/my/myComplate/MyComplateMod'
import mySubsribe from 'biz/my/mySubscribe/MySubscribeMod';
import cloubStoreIndex from 'biz/cloubStore/index/IndexMod' ;
import cloubStoreCarModelDetail from 'biz/cloubStore/carModelDetail/index/indexMod' ;
import askPrice from 'biz/askPrice/AskPriceMod' ;
import testDrive from 'biz/testDrive/TestDriveMod' ;
import activity from 'biz/activity/index/IndexMod' ;
import activityDetails from 'biz/activity/activityDetails/ActivityDetailsMod';
import myOrder from 'biz/my/myOrder/MyOrderMod';
import quickLink from 'biz/home/quickLink/QuickLinkMod';
import personalCenter from 'biz/my/personalCenter/PersonalCenterMod';
import dealerQuotation from 'biz/carModel/dealerQuotation/DealerQuotationMod';
import inquireDealer from 'biz/store/inquireDealer/InquireDealerMod';
import staffs from 'biz/staffs/StaffsMod';
import myCoupon from 'biz/my/myCoupon/MyCouponMod';

// 在这里为所有的组件进行导出，将其注册到根组件
export default{
    modelList,
    productDetailIndex,
    home,
    complateInfo,
    mySubsribe,
    cloubStoreIndex,
    cloubStoreCarModelDetail,
    askPrice,
    activity,
    activityDetails,
    myOrder,
    quickLink,
    personalCenter,
    dealerQuotation,
    inquireDealer,
    testDrive,
    staffs,
    myCoupon
}