<template>
  <div>
    <h3>{{ character.name }}</h3>
    <v-row>
      <v-col v-for="location in JSON.parse(JSON.stringify(locations))" :key="location.id" cols="12" sm="12" md="12">
        <v-card class="mx-3 mt-3">
          <v-card-title class="text-lg-h3"> {{ location.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      character: {},
      locations: [],
    };
  },
  methods: {
    async getCharacter() {
      try {
        let response = await fetch('https://rickandmortyapi.com/api/character/1');
        this.character = await response.json();

        let requests = this.character.locations.map((url) => fetch(url));

        Promise.all(requests)
          .then((responses) => {
            return responses;
          })
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((locations) => {
            locations.forEach((location) => this.chars.push(location));
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
