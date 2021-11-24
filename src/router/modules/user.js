import Form from '@views/main/user/Form';
import store from '@/store';

const usersRoutes = [
  {
    path: 'user/edit',
    name: 'user.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default usersRoutes;
