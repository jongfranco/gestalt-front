import Vue from 'vue'
import Vuex from 'vuex'
import filters from '@/store/modules/filters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    filters
  }
})
