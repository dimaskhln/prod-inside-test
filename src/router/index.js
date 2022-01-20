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
    component: EpisodeList,
  },
  {
    path: '/episode_list',
    name: 'episodeList',
    component: EpisodeList,
  },
  {
    path: '/episode/:id',
    name: 'episode',
    component: Episode,
  },

  {
    path: '/location/:id',
    name: 'location',
    component: Location,
  },

  {
    path: '/character/:id',
    name: 'character',
    component: Character,
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default router;
