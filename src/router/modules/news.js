import Datatable from '@views/main/news/Datatable';
import Detail from '@views/main/news/Detail';
import store from '@/store';
import Vue from 'vue';

const newsRoutes = [
  {
    path: 'news',
    name: 'news',
    component: Datatable,
  },
  {
    path: 'news/detail/:newsID',
    name: 'news.detail',
    component: Detail,
    beforeEnter(to, from, next) {
      const authInfo = store.state.auth.info;
      let url = `front/news/${authInfo.role.id}/detail/${to.params.newsID}`;
      const res = Vue.axios
        .get(url)
        .then(data => {
          if (data.data.data) {
            next();
          } else {
            next({ name: 'errorNotFound' });
          }
        })
        .catch(err => console.log(err));
    },
  },
];

export default newsRoutes;
