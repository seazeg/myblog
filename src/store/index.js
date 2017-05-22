import Vue from 'vue'

const state = {
  data: {},
  pageInfo: {},
  id: {}
}

const mutations = {
  "setData": function (state, data) {
    if (!data.id) {
      data.data.map(function (v) {
        return v.date = Vue.prototype.$utils.formatDate(v.date)
      });
      state.data = data.data;
      state.pageInfo = data.pageInfo
    } else {
      state.id = data.data
    }
  }
}

const actions = {
  "setData": function (store, param) {
    return new Promise(function (resolve, reject) {
      store.commit('setData', param)
    })
  },
}

const getters = {
  getListData: function (state) {
    return state.data
  },
  getPageInfo: function (state) {
    return state.pageInfo
  },
  getId: function (state) {
    return state.id
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}