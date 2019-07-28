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
    /**
     * @function fetch
     * @async
     * @param {String} payload layout.id
     * Функция для получения менеджера по id
     */
    async fetch({
      commit
    }, payload) {
      setTimeout(() => {
        commit('set', user);
      }, 1500);
    },

    /**
     * @function createUser
     * @async
     * @param {Object} payload layout
     * Функция для создания менеджера
     */
    async create({
      commit
    }, payload) {
      setTimeout(() => {
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function updateUser
     * @async
     * @param {Object} payload user
     * Функция для обновления менеджера
     */
    async update({
      commit
    }, payload) {
      setTimeout(() => {
        commit('set', payload);
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено.`,
          isActive: true
        });
      }, 1500);
    },

    /**
     * @function removeUser
     * @async
     * @param {String} payload user.id
     * Функция для удаления менеджера
     */
    async remove({
      commit
    }, payload) {
      setTimeout(() => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно удалено.`,
          isActive: true
        });
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
      commit('set', {})
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
