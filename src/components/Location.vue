<template>
  <div>
    <h3>"{{ location.name }}"</h3>
    <v-row>
      <v-col v-for="character in JSON.parse(JSON.stringify(chars))" :key="character.id" cols="12" sm="12" md="12">
        <v-card class="mx-3 mt-3" to="/character">
          <v-card-title class="text-lg-h3"> {{ character.name }}</v-card-title>
        </v-card>
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
        let response = await fetch('https://rickandmortyapi.com/api/location/1');
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
