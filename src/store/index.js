import Vue from 'vue'
import Vuex from 'vuex'
import filters from '@/store/modules/filters'
import session from '@/store/modules/session'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    filters,
    session
  }
})
