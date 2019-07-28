import user from '@/fakers/manager';
import defaultUser from '@/models/profile';

export default {
  namespaced: true,
  state: {
    user: defaultUser,
    users: []
  },
  mutations: {
    set(state, payload) {
      state.user = payload;
    },
    setAll(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }, payload) {
      setTimeout(() => {
        commit('set', user);
      }, 1500);
    },

    async fetchAll({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setAll', [user]);
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', user);
    },

    clear({
      commit
    }) {
      commit('set', defaultUser)
    }
  },
  getters: {
    get(state) {
      return state.user;
    },
    getAll(state) {
      return state.users;
    }
  }
};
