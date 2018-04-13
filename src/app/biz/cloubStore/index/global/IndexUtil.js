import Util from 'util';
class IndexUtil {

    static toUrl =(url) =>{
        if(url!=null){
            
            //初步只判断是否有.号，有.号认为是一个完整的url跳转
            if(url.indexOf('.')!=-1){
                let urls = Util.getUrl(url)
                location.href = urls
            }else{
                window.app.routerGoTo(url)
            }
        }
    }
}

export default IndexUtil ;