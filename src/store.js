import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      reposList: [],
    },
    mutations: {
      setReposList(state, data) {
        state.reposList = data;
      },
    },
    actions: {
      getReposList({ commit }) {
        return axios.get('https://api.github.com/users/brandonxiang/repos')
          .then((res) => {
            commit('setReposList', res.data);
            return res.data;
          });
      },
    },
  });
}
