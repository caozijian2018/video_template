export default {
  increment(state) {
    state.counter++;
  },
  setLang(state, lang) {
    // alert(lang)
    state.locale = lang;
  }
};
