import field from '@/models/additional-field.json';

export default {
  namespaced: true,
  state: {
    field: {},
    fields: []
  },
  mutations: {
    setField(state, payload) {
      state.field = payload;
    },
    setFields(state, payload) {
      state.fields = payload;
    }
  },
  actions: {
    /**
     * @function fetchField
     * @async
     * @param {String} payload field.id
     * Функция для получения доп поля по id
     */
    async fetchField({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setField', field);
      }, 1500);
    },

    /**
     * @function createField
     * @async
     * @param {Object} payload field
     * Функция для создания доп поля
     */
    async createField({
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
     * @function updateField
     * @async
     * @param {Object} payload field
     * Функция для обновления доп поля
     */
    async updateField({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setField', payload);
        this.dispatch("fetchNotification", {
          type: "success",
          message: `Успешно сохранено.`,
          isNotification: true
        });
      }, 1500);
    },

    /**
     * @function deleteField
     * @async
     * @param {String} payload field.id
     * Функция для удаления доп поля
     */
    async removeField({
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
     * @function fetchFields
     * @async
     * Функция на получение все полей
     */
    async fetchFields({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setFields', [{
          id: '1',
          slug: 'field',
          title: 'Поле',
          fieldType: 'text',
          layouts: [{
              id: '1',
              slug: 'base',
              title: 'Базовый шаблон'
            },
            {
              id: '2',
              slug: 'custom',
              title: 'Кастомный шаблон'
            }
          ]
        }])
      }, 1500);
    },

    setField({
      commit
    }, payload) {
      commit('setField', field);
    },

    clearField({
      commit
    }) {
      commit('setField', {})
    }
  },
  getters: {
    getField(state) {
      return state.field;
    },
    getFields(state) {
      return state.fields;
    }
  }
};
