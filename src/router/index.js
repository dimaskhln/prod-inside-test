import Vue from 'vue';
import VueRouter from 'vue-router';
import EpisodeList from '../components/EpisodeList.vue';
import Episode from '../components/Episode.vue';
import Location from '../components/Location.vue';
import Character from '../components/Character.vue';

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

  {
    path: '/location',
    components: {
      mainView: Location,
    },
  },

  {
    path: '/character',
    components: {
      mainView: Character,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
