import Vue from 'vue'

const state = {
  data: {},
  pageInfo: {},
  id: {},
  date: {},
  logind: false
}

const mutations = {
  "setData": function (state, data) {
    if (data.article) {
      state.id = data.data
    } else if (data.archive) {
      state.date = data.data;
    } else {
      data.data.map(function (v) {
        return v.createDate = Vue.prototype.$utils.formatDate(v.createDate)
      });
      state.data = data.data;
      state.pageInfo = data.pageInfo
    }
  },
  "setLogind": function (state, data) {
    state.logind = data
    console.log(state.logind);
  }
}

const actions = {
  "setData": function (store, param) {
    return new Promise(function (resolve, reject) {
      store.commit('setData', param)
    })
  },
  "setLogind": function (store, param) {
    return new Promise(function (resolve, reject) {
      store.commit('setLogind', param)
    })
  }
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
  },
  getTimeLine: function (state) {
    return state.date
  },
  getLogind: function (state) {
    return state.logind
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}