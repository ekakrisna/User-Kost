import Login from '@views/auth/Login';
import store from '@/store';
import Cookies from 'js-cookie';

const auth = [
  {
    /*
     * Default login
     */
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('auth/checkAuth');
      const authInfo = store.state.auth.info;
      let homeRoute = 'mypage';
      if (authInfo.status) {
        next({ name: homeRoute });
      } else {
        next();
      }
    },
  },
  {
    /*
     *Verification route
     */
    path: '/verify',
    name: 'verify',
    component: Login,
    props: route => ({ tfaToken1: route.query.key }),
    beforeEnter: async (to, from, next) => {
      const tfaToken2 = Cookies.get('tfaToken2');
      let credentials = {
        company_code: '',
        password: '',
        tfa_token_1: to.query.key,
        tfa_token_2: tfaToken2,
        isFrontend: true,
        requester_base_url: window.location.origin,
        // remember: this.remember,
        // rememberMe: this.rememberMe,
      };
      //Values returned from the request are passed into this instance from store/modules/auth.js via mapState
      store.dispatch('auth/login', {
        credentials,
      });
      const authInfo = store.state.auth.info;
      let homeRoute = 'mypage';
      //skips login if already authenticated
      if (authInfo.status) {
        next({ name: homeRoute });
      } else {
        next();
      }
    },
  },
];

export default auth;
