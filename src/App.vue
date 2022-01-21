<template>
  <v-app>
    <v-main>
      <router-link to="/" color="green accent-3"><v-btn class="ma-3" text color="primary">Home</v-btn></router-link>
      <router-view />
    </v-main>
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

<style>
a {
  text-decoration: none;
}
</style>
