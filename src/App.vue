<template>
  <v-app>
    <v-main> <router-view name="mainView"></router-view> </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      message: 'Hello World',
    };
  },
  mounted() {
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then((response) => {
        this.message = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
