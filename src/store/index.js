import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import common from './common';
import profile from './profile';
import authenticate from './authenticate';
import resource from './resource';
import filesystem from './filesystem';
import layout from './layout';
import field from './field';
import user from './user';

export const store = new Vuex.Store({
  modules: {
    common,
    authenticate,
    profile,
    resource,
    filesystem,
    layout,
    field,
    user
  }
});
