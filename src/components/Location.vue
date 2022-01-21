<template>
  <div>
    <h2 class="ma-3">"{{ location.name }}"</h2>
    <h3 class="ma-3">Characters in this location:</h3>
    <v-row>
      <v-col v-for="character in JSON.parse(JSON.stringify(chars))" :key="character.id" cols="12" sm="12" md="4">
        <router-link :to="{ name: 'character', params: { id: character.id } }">
          <v-card class="mx-3 mt-3" max-width="300px" color="green lighten-3">
            <v-card-title class="text-lg-h5"> {{ character.name }}</v-card-title>
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
      location: {},
      chars: [],
    };
  },
  methods: {
    async getLocation() {
      try {
        let response = await fetch('https://rickandmortyapi.com/api/location/' + this.$route.params.id);
        this.location = await response.json();

        let requests = this.location.residents.map((url) => fetch(url));

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
    this.getLocation();
  },
};
</script>
