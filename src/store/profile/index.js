import profile from '@/models/profile.json';

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
      setTimeout(() => {
        commit('setProfile', profile);
      }, 1500);
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
