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
    /**
     * @function fetchResource
     * @async
     * Функция для получения ресурса по id
     */
    async fetchResource({
      commit
    }) {
      setTimeout(() => {
        commit('setResource', resource);
      }, 1500);
    },

    /**
     * @function createResource
     * @async
     * @param {Object} payload resource
     * Функция для создания ресурса
     */
    async createResource({
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
     * @function updateResource
     * @async
     * @param {Object} payload resource
     * Функция для обновления ресурса
     */
    async updateResource({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setResource', payload);
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function deleteResource
     * @async
     * @param {String} payload resource.id
     * Функция для удаления ресурса
     */
    async removeResource({
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
