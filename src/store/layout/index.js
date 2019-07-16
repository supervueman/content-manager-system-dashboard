import layout from '@/models/layout.json';

export default {
  namespaced: true,
  state: {
    layout: {}
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    }
  },
  actions: {
    /**
     * @function fetchLayout
     * @async
     * @param {String} payload layout.id
     * Функция для получения шаблона по id
     */
    async fetchLayout({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setLayout', layout);
      }, 1500);
    },

    /**
     * @function createLayout
     * @async
     * @param {Object} payload layout
     * Функция для создания шаблона
     */
    async createLayout({
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
     * @function updateLayout
     * @async
     * @param {Object} payload layout
     * Функция для обновления шаблона
     */
    async updateLayout({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setLayout', payload);
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function deleteLayout
     * @async
     * @param {String} payload layout.id
     * Функция для удаления шаблона
     */
    async removeLayout({
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

    setLayout({
      commit
    }, payload) {
      commit('setLayout', layout);
    },

    clearLayout({
      commit
    }) {
      commit('setLayout', {})
    }
  },
  getters: {
    getLayout(state) {
      return state.layout;
    }
  }
};
