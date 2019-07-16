import additionalField from '@/models/additional-field.json';

export default {
  namespaced: true,
  state: {
    additionalField: {}
  },
  mutations: {
    setAdditionalField(state, payload) {
      state.additionalField = payload;
    }
  },
  actions: {
    /**
     * @function fetchAdditionalField
     * @async
     * @param {String} payload additionalField.id
     * Функция для получения доп поля по id
     */
    async fetchAdditionalField({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setAdditionalField', additionalField);
      }, 1500);
    },

    /**
     * @function createAdditionalField
     * @async
     * @param {Object} payload additionalField
     * Функция для создания доп поля
     */
    async createAdditionalField({
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
     * @function updateAdditionalField
     * @async
     * @param {Object} payload additionalField
     * Функция для обновления доп поля
     */
    async updateAdditionalField({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setAdditionalField', payload);
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function deleteAdditionalField
     * @async
     * @param {String} payload additionalField.id
     * Функция для удаления доп поля
     */
    async removeAdditionalField({
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

    setAdditionalField({
      commit
    }, payload) {
      commit('setAdditionalField', additionalField);
    },

    clearAdditionalField({
      commit
    }) {
      commit('setAdditionalField', {})
    }
  },
  getters: {
    getAdditionalField(state) {
      return state.additionalField;
    }
  }
};
