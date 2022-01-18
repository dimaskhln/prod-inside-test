<template>
  <div>
    <h3>Episode {{ episode.episode }} "{{ episode.name }}"</h3>
    <v-row>
      <!-- <v-col :v-for="character in this.characters" cols="12" sm="12" md="12">
        <v-card class="mx-3 mt-3">
          <v-card-title class="text-lg-h3"> {{ character.name }}</v-card-title>
        </v-card>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
let a;

import axios from 'axios';
export default {
  data() {
    return {
      episode: {},
      chars: {},
    };
  },
  methods: {
    loadCharacters: async function () {
      let vueInstance = this;
      let charArray = [];
      this.episode.characters.forEach((character) => {
        axios.get(character).then((response) => {
          charArray.push(response.data);
        });
        vueInstance.chars = charArray;
      });
      console.log(this.chars);
    },
  },
  mounted() {
    let vueInstance = this;
    axios
      .get('https://rickandmortyapi.com/api/episode/1')
      .then((response) => {
        vueInstance.episode = response.data;
        vueInstance.loadCharacters();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
