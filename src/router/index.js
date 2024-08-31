import Vue from 'vue';
import Router from 'vue-router';
import UserSelection from '@/components/UserSelection.vue';
import Chat from '@/components/Chat.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSelection',
      component: UserSelection,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
    },
  ],
});
