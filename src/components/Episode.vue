<template>
  <div>
    <h3>Episode {{ episode.episode }} "{{ episode.name }}"</h3>
    <v-row>
      <v-col v-for="character in JSON.parse(JSON.stringify(chars))" :key="character.id" cols="12" sm="12" md="12">
        <router-link :to="{ name: 'character', params: { id: character.id } }">
          <v-card class="mx-3 mt-3">
            <v-card-title class="text-lg-h3"> {{ character.name }}</v-card-title>
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
      episode: {},
      chars: [],
    };
  },
  methods: {
    async getEpisode() {
      try {
        let response = await fetch('https://rickandmortyapi.com/api/episode/' + this.$route.params.id);
        this.episode = await response.json();

        let requests = this.episode.characters.map((url) => fetch(url));

        Promise.all(requests)
          .then((responses) => {
            return responses;
          })
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((characters) => {
            characters.forEach((character) => this.chars.push(character));
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getEpisode();
  },
};
</script>
