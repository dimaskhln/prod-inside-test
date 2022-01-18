import Vue from 'vue';
import VueRouter from 'vue-router';
import EpisodeList from '../components/EpisodeList.vue';
import Episode from '../components/Episode.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    components: {
      mainView: EpisodeList,
    },
  },
  {
    path: '/episode_list',
    components: {
      mainView: EpisodeList,
    },
  },
  {
    path: '/episode',
    components: {
      mainView: Episode,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
