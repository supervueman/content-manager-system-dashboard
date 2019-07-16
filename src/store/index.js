import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import common from './common';
import profile from './profile';
import authenticate from './authenticate';
import resource from './resource';

export const store = new Vuex.Store({
  modules: {
    common,
    authenticate,
    profile,
    resource
  }
});
