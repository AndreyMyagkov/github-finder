import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import repos from './repos';
import error from './error';

export default new Vuex.Store({
    modules: {
      repos,
      error
    }
})