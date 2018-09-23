import { Base64 } from 'js-base64';
var getIosTime =()=>{
    // var d = new Date();
    var date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/\.[\d]{3}/, '');
    return date
}
var getSubId = ()=>{
    // var subid = location.href.toLowerCase().split("?refid=")[1];
    var text =  new Date().getTime();
    return text;
}
var getBase64=() =>{
    return '&dcbAuth=' + Base64.encode('dreamfiiptapi' + "#" + getIosTime() + "#"+getSubId());
}
export default ()=>{
    var dcbReturnUrl;
    switch(localStorage.platform){
        case "pt":dcbReturnUrl="https://static.presexvideo.com/pt/welcome.html";break;
        case "es":dcbReturnUrl="https://static.presexvideo.com/es/subscribed.html";break;
    }
    var base_url = "http://wf.mobibox.pt/api/wbV2WebFlow/";
    base_url += "?dcbReturnUrl="+encodeURIComponent(dcbReturnUrl);
    base_url += "&dcbService=PRD_DREAMFII_PT_PRESEXVIDEO_GENERIC ";
    base_url += getBase64();
    return base_url;
}