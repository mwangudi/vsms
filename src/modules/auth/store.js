import Api from '@/api';
import Vue from 'vue';

const state = {
  token: !!localStorage.getItem('token'), //localStorage.getItem('token') || '',
  status: '',
  user: []
};

const getters = {
  isLoggedIn: state => state.token,
  authStatus: state => state.status,
  getUserDetails: state => state.user
}

const mutations = {
  AUTH_SUCCESS(state, {
    token,
    user
  }) {
    localStorage.setItem('token', token)
    state.status = 'success'
    state.token = token
    state.user = user
    Vue.router.push('/checkin')
  },
  AUTH_ERROR(state) {
    state.status = 'error'
  },
  LOGOUT(state) {
    localStorage.removeItem('token')
    state.status = ''
    state.token = ''
    Vue.router.push('/login')
  },
};

const actions = {
  login({
    commit
  }, {
    email,
    password
  }) {
    Api.postLogin({
        email,
        password
      })
      .then(resp => {
        const {
          token,
          user
        } = resp.data;
        commit('AUTH_SUCCESS', {
          token,
          user
        })
      })
  },
  logout({
    commit
  }) {
    commit('LOGOUT')
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};