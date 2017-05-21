import Vue from 'vue'

const state = {
  data: {}
}

const mutations = {
  "setListData": function (state, data) {
    data.map(function (v) {
      // console.log("list:",v.date);
      return v.date = Vue.prototype.$utils.formatDate(v.date)
    });
    state.data = data;
    console.log(state.data);
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}