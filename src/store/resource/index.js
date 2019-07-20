import resource from '@/models/resource.json';

export default {
  namespaced: true,
  state: {
    resource: {},
    layout: {},
    fields: {
      text: {
        value: 'Text field',
        interface: {
          id: '1',
            slug: 'text',
            title: 'Текстовое поле',
            fieldType: 'text',
            shcema: '',
            defaultValue: 'Текстовое поле'
        }
      },
      textarea: {
        value: 'Textarea field',
        interface: {
          id: '2',
            slug: 'textarea',
            title: 'Текстовая область',
            fieldType: 'textarea',
            shcema: '',
            defaultValue: 'Текстовая область'
        }
      },
      editor: {
        value: 'Texteditor field',
        interface: {
          id: '3',
            slug: 'editor',
            title: 'Текстовый редактор',
            fieldType: 'editor',
            shcema: '',
            defaultValue: 'Текстовый редактор'
        },
      },
      image: {
        value: 'Image',
        interface: {
          id: '4',
            slug: 'image',
            title: 'Изображение',
            fieldType: 'image',
            shcema: '',
            defaultValue: 'Изображение'
        }
      },
      select: {
        value: 'Item 1',
        interface: {
          id: '5',
            slug: 'select',
            title: 'Селект',
            fieldType: 'select',
            shcema: '',
            defaultValue: ['Item 1', 'Item 2', 'Item 3']
        },
      },
      migx: {
        value: [{
          title: 'Title',
          image: '/avatar.jpg'
        }],
        interface: {
          id: '6',
            slug: 'migx',
            title: 'Migx',
            fieldType: 'migx',
            shcema: '{"title": "{"type": "text"}", "image": "{"type": "image"}"}',
            defaultValue: 'Migx'
        },
      },
      date: {
        value: '2019-07-20',
        interface: {
          id: '7',
            slug: 'date',
            title: 'Дата',
            fieldType: 'date',
            shcema: '',
            defaultValue: 'Дата'
        }
      },
      time: {
        value: '2019-07-20',
        interface: {
          id: '8',
            slug: 'time',
            title: 'Время',
            fieldType: 'time',
            shcema: '',
            defaultValue: 'Время'
        }
      },
      colorpicker: {
        value: '#dfv45f',
        interface: {
          id: '9',
            slug: 'colorpicker',
            title: 'Колорпикер',
            fieldType: 'colorpicker',
            shcema: '',
            defaultValue: 'Колорпикер'
        }
      },
      checkbox: {
        value: false,
        interface: {
          id: '10',
            slug: 'checkbox',
            title: 'Чекбокс',
            fieldType: 'checkbox',
            shcema: '',
            defaultValue: 'Чекбокс'
        }
      }
    },
    resourceChilds: [],
  },
  mutations: {
    setResource(state, payload) {
      state.resource = payload;
    },
    setResourceChilds(state, payload) {
      state.resourceChilds = payload;
    },
    setLayout(state, payload) {
      state.layout = payload;
    },
    setFields(state, payload) {
      state.fields = payload;
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
    },
    getLayout(state) {
      return state.layout;
    },
    getFields(state) {
      return state.fields;
    }
  }
};
