import store from "../store"
export default (country_) => {
  if (process.browser) {
    var country;
    if (country_) {
      localStorage.country = country_;
      country = country_;
    } else {
      country = localStorage.country;
    }
    store().commit('setLang', country);
    // alert(store().state.locale)
    // alert(store().getters.getLang+"getlangggg");

  }
}
