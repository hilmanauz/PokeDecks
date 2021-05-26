<template>
  <v-app-bar
      app
    >
      <NuxtLink to="/">
        <img 
        src="/pokemon.png" 
        alt=""
        class="logo-navbar"
        >
      </NuxtLink>
      <v-spacer/>
      <v-col cols="7" sm="5" md="4" class="mt-6" v-if="path === '/'">
        <v-autocomplete
          v-model="value"
          @input="searchInput"
          :items="pokemonsName"
          placeholder="Search"
          dense
          filled
          clearable
          rounded
        ></v-autocomplete>
      </v-col>
    </v-app-bar>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data: () => ({
    value: null,
  }),
  computed: {
    ...mapState(['pokemonsName']),
    path() {
      return this.$route.path;
    },
  },
  methods: {
    searchInput() {
      this.$store.commit('searchInput', this.value)
    }
  }
}
</script>
<style scoped>
  .logo-navbar {
    width: 20vh;
    height: 18vh;
  }
</style>