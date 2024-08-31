import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: ['Seneca', 'Marcus Aurelius', 'Epictetus'],
    currentUser: null,
    messages: JSON.parse(localStorage.getItem('messages')) || {},
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
      localStorage.setItem('currentUser', user);
    },
    addMessage(state, { from, to, content }) {
      if (!state.messages[to]) {
        Vue.set(state.messages, to, []);
      }
      state.messages[to].push({ from, content, date: Date.now() });
      localStorage.setItem('messages', JSON.stringify(state.messages));
    },
    loadMessages(state) {
      const savedMessages = JSON.parse(localStorage.getItem('messages'));
      if (savedMessages) {
        state.messages = savedMessages;
      }
    },
  },
  actions: {
    selectUser({ commit }, user) {
      commit('setUser', user);
    },
    sendMessage({ commit }, message) {
      commit('addMessage', message);
    },
    syncMessages({ commit }) {
      commit('loadMessages');
    },
  },
  getters: {
    getMessages: (state) => (user) => {
      let res
      if (state.messages[user]) { 
        res = [...state.messages[user].filter(el => el.from === state.currentUser)];
      }
      if (state.messages[state.currentUser]) { 
        res = [...state.messages[state.currentUser].filter(el => el.from === user)]
      }
      if (state.messages[user] && state.messages[state.currentUser]) { 
        res = [...state.messages[user].filter(el => el.from === state.currentUser), ...state.messages[state.currentUser].filter(el => el.from === user)].sort((a, b) => a.date - b.date);
      }
      return res || [];
    },
    getUsers: (state) => {
      return state.users.filter(user => user !== state.currentUser);
    },
  },
});
