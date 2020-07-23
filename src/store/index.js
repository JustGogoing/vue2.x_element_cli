import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import common from "./common";
Vue.use(Vuex);

// 本地持久化vuex中的数据
const vuexLocal = new VuexPersistence({
  key: "admin",
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    common
  },
  plugins: [vuexLocal.plugin]
});
