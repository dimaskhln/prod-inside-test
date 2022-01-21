<template>
  <div>
    <v-row>
      <v-col class="mx-5" cols="12" sm="12" md="4"><v-select outlined v-model="sortType" :items="sortTypes" label="Sort by name" v-on:change="sortEpisodes()"></v-select></v-col>
      <v-col class="mx-5" cols="12" sm="12" md="4"><v-text-field outlined v-model="searchQuery" label="Search by name"></v-text-field></v-col>
    </v-row>

    <v-row align="center">
      <v-col v-for="episode in resultQuery" :key="episode.id" cols="12" sm="12" md="4">
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
      searchQuery: null,
    };
  },
  methods: {
    sortEpisodes() {
      this.searchQuery = null;
      let st = this.sortType;
      this.resultQuery.sort(function (a, b) {
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
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.episodes.filter((episode) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => episode.name.toLowerCase().includes(v));
        });
      } else {
        return this.episodes;
      }
    },
  },
};
</script>
