export default {
  state: {
    notification: {
      isNotification: false,
      type: 'success',
      message: 'Success'
    },
  },
  mutations: {
    setNotification(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    fetchNotification({
      commit
    }, payload) {
      commit('setNotification', payload);
      const closeNotification = {
        isNotification: false
      }
      setTimeout(() => {
        commit('setNotification', closeNotification)
      }, 3000)
    },
  },
  getters: {
    getNotification(state) {
      return state.notification;
    },
  }
};
