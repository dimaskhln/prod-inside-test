<template>
  <div>
    <v-row>
      <v-col class="mx-5" cols="12" sm="12" md="4"><v-select outlined v-model="sortType" :items="sortTypes" label="Sort by name" v-on:change="sortEpisodes()"></v-select></v-col>
    </v-row>
    <v-row align="center">
      <v-col v-for="episode in episodes" :key="episode.id" cols="12" sm="12" md="4">
        <router-link :to="{ name: 'episode', params: { id: episode.id } }"
          ><v-card class="mx-3 mt-3" color="lime lighten-5">
            <v-card-title>Episode {{ parseInt(episode.episode.substr(episode.episode.indexOf('E') + 1, 2), 10) }} "{{ episode.name }}"</v-card-title>
            <v-card-text>Season {{ parseInt(episode.episode.substr(episode.episode.indexOf('S') + 1, 2).trimLeft('0'), 10) }}</v-card-text>
            <v-card-text>Air date {{ episode.air_date }}</v-card-text>
          </v-card></router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      episodes: [],
      sortTypes: ['Ascending', 'Descending'],
      sortType: '',
    };
  },
  methods: {
    sortEpisodes() {
      let st = this.sortType;
      this.episodes.sort(function (a, b) {
        if (st == 'Ascending') {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        if (st == 'Descending') {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        }
      });
    },
  },
  mounted() {
    let vueInstance = this;
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then((response) => {
        vueInstance.episodes = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
