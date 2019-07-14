import {
  profile
} from '@/fakers/models';

export default {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    async fetchProfile({
      commit
    }) {
      commit('setProfile', profile);
    },

    setProfile({
      commit
    }, payload) {
      commit('setProfile', profile);
    },

    clearProfile({
      commit
    }) {
      commit('setProfile', {})
    }
  },
  getters: {
    getProfile(state) {
      return state.profile;
    }
  }
};
