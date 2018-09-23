import axios_creater from "../util/axios_creater"
import store from "../store"
export default (country_) => {
  if (process.browser) {
    var country;
    if (country_) {
      localStorage.country_text = country_;
      country = country_;
    } else {
      country = localStorage.country_text;
    }
    store().commit('setLang', country); //.state.locale = country;
    //country
    // axios.defaults.baseURL
    // axios_creater.defaults.baseURL+='?country='+country
    // console.log(axios_creater.baseURL);
    // store().commit('setLang',country);//.locale=country;
    //console.log(store().state.locale)
  }
}
