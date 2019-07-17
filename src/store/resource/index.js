import resource from '@/models/resource.json';

export default {
  namespaced: true,
  state: {
    resource: {},
    resourceChilds: [],
  },
  mutations: {
    setResource(state, payload) {
      state.resource = payload;
    },
    setResourceChilds(state, payload) {
      state.resourceChilds = payload;
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

    /**
     * @function fetchResourceChilds
     * @async
     * @param {Object} payload {resource.id, skip, limit}
     * Фу
     */
    async fetchResourceChilds({
      commit
    }, payload) {
      commit('setResourceChilds', [{
        id: "2",
        slug: "Resource_1",
        title: "Resource 2",
        description: "New test resource 1",
        content: "New test resource 1",
        published: false,
        createdAt: "2019-07-16",
        layout: {
          id: "1",
          title: "Базовый шаблон",
          slug: "base"
        },
        managerId: "1",
        fields: [],
        children: [],
        parentId: ""
      }]);
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
    },
    getResourceChilds(state) {
      return state.resourceChilds;
    }
  }
};
