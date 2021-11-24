import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import AppBase from '@views/main/_layouts/AppBase';
import usersRoutes from './modules/user';
import errors from './errors';
import auth from './auth';
// ---------------------------------------------------
// PASSWORD FORGET
// ---------------------------------------------------
import PasswordForget from '@views/main/password-forget/Form';
// ---------------------------------------------------
// TRANSMISION COMPLATE
// ---------------------------------------------------
import TransmisionComplete from '@views/main/password-forget/Transmision';
// ---------------------------------------------------
// PASSWORD RESET
// ---------------------------------------------------
import PasswordReset from '@views/main/password-reset/Form';
// ---------------------------------------------------
// WITHDRAWAL
// ---------------------------------------------------
import Withdrawal from '@views/main/withdrawal/Form';
// ---------------------------------------------------
// WITHDRAWAL COMPLETE
// ---------------------------------------------------
import WithdrawalComplete from '@views/main/withdrawal/Complete';
// ---------------------------------------------------
// CONTACT
// ---------------------------------------------------
import Contact from '@views/main/contact/Contact';
// ---------------------------------------------------
// MY PAGE
// ---------------------------------------------------
import myPageRoutes from './modules/mypage';
// ---------------------------------------------------
// POINT
// ---------------------------------------------------
import pointRoutes from './modules/point';
// ---------------------------------------------------
// NEWS
// ---------------------------------------------------
import newsRoutes from './modules/news';

// The default route to go after user login
export const defaultRoute = 'mypage';

import { guards as availableGuards } from '@/store/modules/auth';

Vue.use(VueRouter);

/**
 * Define index routes.
 * This contain child routes. Please refer other modules.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: AppBase,
    redirect: { name: defaultRoute },
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
    children: [...myPageRoutes, ...usersRoutes, ...pointRoutes, ...newsRoutes],
  },
  // ---------------------------------------------------
  // PASSWORD FORGET
  // ---------------------------------------------------
  {
    path: '/password/forget',
    name: 'password.forget',
    component: PasswordForget,
  },
  // ---------------------------------------------------
  // TRANSMISION COMPLETE
  // ---------------------------------------------------
  {
    path: '/transmission_complete',
    name: 'transmission.complete',
    component: TransmisionComplete,
  },
  // ---------------------------------------------------
  // PASSWORD RESET
  // ---------------------------------------------------
  {
    path: '/password/reset',
    name: 'password.reset',
    component: PasswordReset,
  },
  // ---------------------------------------------------
  // WITHDRAWAL
  // ---------------------------------------------------
  {
    path: '/withdrawal/application',
    name: 'withdrawal.application',
    component: Withdrawal,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
  },
  // ---------------------------------------------------
  // WITHDRAWAL COMPLETE
  // ---------------------------------------------------
  {
    path: '/withdrawal/complete',
    name: 'withdrawal.complete',
    component: WithdrawalComplete,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
    beforeEnter(to, from, next) {
      const authInfo = store.state.auth.info;
      let url = `front/withdrawal/complete/${authInfo.role.id}`;
      if (from.name == 'withdrawal.application') {
        next();
      } else {
        Vue.axios
          .get(url)
          .then(data => {
            if (data.data.data.withdrawalComplete) {
              next({ name: 'withdrawal.complete' });
            } else {
              next({ name: 'withdrawal.application' });
            }
          })
          .catch(err => console.log(err));
      }
    },
  },
  // ---------------------------------------------------
  // CONTACT
  // ---------------------------------------------------
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  // ---------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------
  {
    path: '/logout',
    name: 'logout',
    component: {
      beforeRouteEnter(to, from, next) {
        store.dispatch('auth/logout');
      },
    },
  },
  ...auth,
  ...errors,
  {
    name: 'catch_all',
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

/**
 * Pre process to start routing (route guard)
 * [about args]
 * to: requested URL.
 * from: previous router.(only when requested from Vue)
 * next: callback function.
 * see https://router.vuejs.org
 */
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // arr.reduce((accumulater, currentValue) => {...}, initialValue );
    // [args] "accumulater" is accumulated value. "currenValue" is arr[index] .
    // Ex: [1,2,3].reduce( (acc, elem) => acc+elem ) is 1+2+3 -> result is 6.
    let reducer = (acc, cur) => {
      // Check if cur.meta.guard exists
      if (Object.prototype.hasOwnProperty.call(cur.meta, 'guard')) {
        // If there is cur.meta.guard( = to.matched[i].meta.guard ) , append it to acc.
        return [...acc, cur.meta.guard];
      } else {
        return acc;
      }
    };
    // collect to.matched[i].meta.guard to simple array.
    let guards = to.matched.reduce(reducer, []);
    // Check current guards in availableGuards and get loginRoute.
    let loginRoute = guards[0] === '' ? availableGuards.default.loginRoute : availableGuards[guards[0]].loginRoute;

    // Check auth.
    await store.dispatch('auth/checkAuth');
    const authInfo = store.state.auth.info;
    if (!authInfo.status) {
      // if not authenticated, redirect to correct login page
      next({ name: loginRoute, redirect: to.path });
    } else {
      // if isAuthenticated and route.guard matched with authInfo.guard
      if (guards.some(guard => guard === authInfo.guard)) {
        next();
      } else {
        next({ name: 'errorNotFound' });
      }
    }
  } else {
    // for route that does not require auth
    next();
  }
});

export default router;
