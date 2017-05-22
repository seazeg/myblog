import Vue from 'vue'

const state = {
  data: {},
  pageInfo: {}
}

const mutations = {
  "setListData": function (state, data) {
    data.data.map(function (v) {
      return v.date = Vue.prototype.$utils.formatDate(v.date)
    });
    state.data = data.data;
    state.pageInfo = data.pageInfo
  }
}

const actions = {
  "setListData": function (store, param) {
    return new Promise(function (resolve, reject) {
      store.commit('setListData', param)
    })
  },
}

const getters = {
  getListData: function (state) {
    return state.data
  },
  getPageInfo: function (state) {
    return state.pageInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}