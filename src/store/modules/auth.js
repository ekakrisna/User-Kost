import auth from '@services/auth';
import router from '@router';

const defaultAuthInfo = function() {
  return {
    status: false,
    guard: '',
    username: '',
    role: '',
  };
};

export const guards = {
  default: {
    loginRoute: 'login',
    homeRoute: 'home',
  },
  admin: {
    loginRoute: 'adminLogin',
    homeRoute: 'admin_home',
  },
};

const state = () => ({
  isLoading: false,
  showAlert: false,
  isCheckMail: false,
  tfaToken2: '',
  info: defaultAuthInfo(),
  errorLoginMessage: '',
});

const getters = {};

const actions = {
  async login({ commit }, { credentials, guard = '' }) {
    //let homeRoute = guard === '' ? guards.default.homeRoute : guards[guard].homeRoute;
    try {
      commit('setLoading', true);
      const authInfo = await auth.login(credentials, guard);
      if (authInfo.status) {
        //if mail has been sent
        if (authInfo.isCheckMail) {
          console.log('authInfo.isCheckMail = ', authInfo.isCheckMail);
          commit('setIsCheckMail', true);
          commit('setShowAlert', false);
          commit('setTfaToken2', authInfo.tfa_token_2);
        }
        //if login is successful
        else {
          commit('login', authInfo);
          let redirect = router.currentRoute.query.redirect;
          if (typeof redirect !== 'undefined') {
            router.push(redirect);
          } else {
            router.push({ name: 'mypage' });
          }
        }
      } else {
        commit('setShowAlert', true);
        commit('setIsCheckMail', false);
        commit('setErrorLoginMessage', authInfo.messages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      commit('setLoading', false);
    }
  },

  async logout({ commit, state }) {
    let guard = state.info.guard;
    let loginRoute = guard === '' ? guards.default.loginRoute : guards[guard].loginRoute;
    try {
      const res = await auth.logout(guard);
      if (res.status) {
        commit('setShowAlert', false);
        commit('logout');
        router.push({ name: loginRoute });
      } else {
        // show error
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async checkAuth({ state, commit }) {
    if (!state.info.status) {
      commit('global/setLoadingPage', true, { root: true });
      try {
        const authInfo = await auth.checkAuth();
        console.log(authInfo);
        if (authInfo.status) {
          commit('login', authInfo);
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit('global/setLoadingPage', false, { root: true });
      }
    }
  },

  async logoutWithdrawal({ commit, state }) {
    let guard = state.info.guard;
    try {
      const res = await auth.logout(guard);
      if (res.status) {
        commit('logout');
      } else {
        // show error
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};

const mutations = {
  login(state, { status, guard, username, role }) {
    state.info.status = status;
    state.info.username = username;
    state.info.guard = guard;
    state.info.role = role;
  },

  logout(state) {
    let guard = state.info.guard;
    state.info = defaultAuthInfo();
    state.info.guard = guard;
  },

  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  //accessable by mapstate method

  setIsCheckMail(state, isCheckMail) {
    state.isCheckMail = isCheckMail;
  },

  setTfaToken2(state, tfaToken2) {
    state.tfaToken2 = tfaToken2;
  },

  setErrorLoginMessage(state, message) {
    state.errorLoginMessage = message;
  },

  setShowAlert(state, showAlert) {
    state.showAlert = showAlert;
  },

  logoutWithdrawal(state) {
    let guard = state.info.guard;
    state.info = defaultAuthInfo();
    state.info.guard = guard;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
