<template>
  <v-app>
    <navbar/>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navbar from '../components/Navbar'
export default {
  data () {
    return {

    }
  },
  components: {
    navbar
  }
}
</script>
