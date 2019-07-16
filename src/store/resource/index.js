import resource from '@/models/resource.json';

export default {
  namespaced: true,
  state: {
    resource: {}
  },
  mutations: {
    setResource(state, payload) {
      state.resource = payload;
    }
  },
  actions: {
    async fetchResource({
      commit
    }) {
      setTimeout(() => {
        commit('setResource', resource);
      }, 1500);
    },

    setResource({
      commit
    }, payload) {
      commit('setResource', resource);
    },

    clearResource({
      commit
    }) {
      commit('setResource', {})
    }
  },
  getters: {
    getResource(state) {
      return state.resource;
    }
  }
};
