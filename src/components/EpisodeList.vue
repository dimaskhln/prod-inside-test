<template>
  <v-row align="center"
    ><v-col v-for="episode in episodes" :key="episode.id" cols="12" sm="12" md="4">
      <v-card class="mx-3 mt-3" to="/episode">
        <v-card-title>Episode {{ parseInt(episode.episode.substr(episode.episode.indexOf('E') + 1, 2), 10) }} "{{ episode.name }}"</v-card-title>
        <v-card-text>Season {{ parseInt(episode.episode.substr(episode.episode.indexOf('S') + 1, 2).trimLeft('0'), 10) }}</v-card-text>
        <v-card-text>Air date {{ episode.air_date }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      episodes: [],
    };
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
