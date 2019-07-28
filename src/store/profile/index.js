import profile from '@/fakers/admin';
import defaultProfile from '@/models/profile'

export default {
  namespaced: true,
  state: {
    profile: defaultProfile
  },
  mutations: {
    set(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }) {
      await setTimeout(() => {
        commit('set', profile);
      }, 1500);
    },

    async create({
      commit
    }, payload) {
      await setTimeout(() => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async update({
      commit
    }, payload) {
      await setTimeout(() => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async remove({
      commit
    }, payload) {
      await setTimeout(() => {
        if (this.getters['profile/get'].id === payload) {
          this.dispatch('profile/clear');
        }
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', profile);
    },

    clear({
      commit
    }) {
      commit('set', defaultProfile)
    }
  },
  getters: {
    get(state) {
      return state.profile;
    }
  }
};
