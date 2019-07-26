import user from '@/fakers/profile';
import defaultUser from '@/models/profile';

export default {
  namespaced: true,
  state: {
    user: defaultUser,
    users: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    /**
     * @function fetchUser
     * @async
     * @param {String} payload layout.id
     * Функция для получения менеджера по id
     */
    async fetchUser({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setUser', user);
      }, 1500);
    },

    /**
     * @function createUser
     * @async
     * @param {Object} payload layout
     * Функция для создания менеджера
     */
    async createUser({
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
    async updateUser({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setUser', payload);
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function removeUser
     * @async
     * @param {String} payload user.id
     * Функция для удаления менеджера
     */
    async removeUser({
      commit
    }, payload) {
      setTimeout(() => {
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно удалено.`,
          isNotification: true
        });
      }, 1500);
    },

    async fetchUsers({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setUsers', [user]);
      }, 1500);
    },

    setUser({
      commit
    }, payload) {
      commit('setUser', user);
    },

    clearUser({
      commit
    }) {
      commit('setUser', {})
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getUsers(state) {
      return state.users;
    }
  }
};
