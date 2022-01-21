<template>
  <div>
    <v-card class="mx-3 mt-3" color="brown lighten-5" max-width="300px">
      <v-card-title> {{ character.name }}</v-card-title>
      <router-link v-if="character.origin.url != ''" :to="{ name: 'location', params: { id: character.origin.url.split('/').at(-1) } }">
        <v-card-text>Origin: {{ character.origin.name }}</v-card-text></router-link
      >
      <v-card-text v-if="character.origin.url == ''">Origin: {{ character.origin.name }}</v-card-text>
      <router-link v-if="character.location.url != ''" :to="{ name: 'location', params: { id: character.location.url.split('/').at(-1) } }"
        ><v-card-text>Location: {{ character.location.name }}</v-card-text></router-link
      >
      <v-card-text v-if="character.location.url == ''">Location: {{ character.location.name }}</v-card-text>
    </v-card>

    <h4 class="ma-3">Episodes:</h4>
    <v-row>
      <v-col v-for="episode in episodes" :key="episode.id" cols="12" sm="12" md="4">
        <router-link :to="{ name: 'episode', params: { id: episode.id } }">
          <v-card class="ma-3" color="blue-grey lighten-5">
            <v-card-title class="text-h5"> {{ episode.name }}</v-card-title>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: {},
      location: {},
      locationOrigin: {},
      episodes: [],
    };
  },
  methods: {
    async getCharacter() {
      try {
        let response = await fetch('https://rickandmortyapi.com/api/character/' + this.$route.params.id);
        this.character = await response.json();
        let requests = this.character.episode.map((url) => fetch(url));

        Promise.all(requests)
          .then((responses) => {
            return responses;
          })
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((episodes) => {
            episodes.forEach((episode) => this.episodes.push(episode));
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCharacter();
  },
};
</script>
