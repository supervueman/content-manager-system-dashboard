import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import profile from './profile';
import authenticate from './authenticate';

export const store = new Vuex.Store({
  modules: {
    authenticate,
    profile
  }
});
