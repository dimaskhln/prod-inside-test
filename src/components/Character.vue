<template>
  <div>
    <v-row>
      <v-card class="mx-3 mt-3">
        <v-card-title class="text-lg-h3">
          <h3>{{ character.name }}</h3></v-card-title
        >
        <router-link :to="{ name: 'location', params: { id: character.origin.url.split('/').at(-1) } }">
          <v-card-text>Origin: {{ character.origin.name }}</v-card-text></router-link
        >
        <router-link :to="{ name: 'location', params: { id: character.location.url.split('/').at(-1) } }"
          ><v-card-text>Location: {{ character.location.name }}</v-card-text></router-link
        >
      </v-card>
    </v-row>
    <h4>Episodes:</h4>
    <v-row v-for="episode in episodes" :key="episode.id">
      <router-link :to="{ name: 'episode', params: { id: episode.id } }">
        <v-card class="mx-3 mt-3">
          <v-card-title class="text-lg-h3"> {{ episode.name }}</v-card-title>
        </v-card>
      </router-link>
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
