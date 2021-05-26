<template>
   <v-container>
      <v-row justify="center" align="center" v-if = "!search">
          <v-col
            v-for="(pokemon, idx) in pokemonsPagination[page-1]"
            :key="idx"
            cols="12" sm="8" md="4"
          >
            <v-hover
            v-slot="{ hover }"
            >
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
              >
                <v-img
                  :lazy-src="pokemon.sprites.other['official-artwork']['front_default']"
                  :src="pokemon.sprites.other['official-artwork']['front_default']"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  max-height="100%"
                >
                  <v-card-title v-text="pokemon.name.toUpperCase()"></v-card-title>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-icon
                    large
                    @click="goToDetails(pokemon.id)"
                  >
                    mdi-chevron-right
                  </v-icon>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
          <div class="text-center mt-10">
            <v-pagination
              @click.native="scrollToTop"
              v-model="page"
              :length="11"
              :total-visible="6"
            ></v-pagination>
          </div>
      </v-row>
      <v-row justify="center" align="center" v-else-if = "filterPokemon">
        <v-col
          cols="12" sm="8" md="4"
        >
          <v-hover
          v-slot="{ hover }"
          >
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="filterPokemon.sprites.other['official-artwork']['front_default']"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                max-height="350px"
              >
                <v-card-title v-text="filterPokemon.species.name.toUpperCase()"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-icon
                  large
                  @click="goToDetails(filterPokemon.id)"
                >
                  mdi-chevron-right
                </v-icon>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-overlay :value="isLoading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import {mapState} from 'vuex'

export default {
   data () {
      return {
        page: 1,
        countPage: null,
        filterPokemon: null
      }
    },
  components: {
    Logo,
    VuetifyLogo
  },
  computed: {
    ...mapState(['pokemonsPagination', 'nextUrl', 'previousUrl', 'isLoading', 'search', 'allPokemons']),
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
    fetchPokemons () {
      this.$store.dispatch('fetchPokemons')
    },
    goToDetails (id) {
      this.$router.push(`/pokemon/${id}`)
    }
  },
  created () {
    this.countPage = this.page;
    if(this.allPokemons.length === 0){
      this.fetchPokemons()
    }
  },
  updated () {
    if(this.search){
      this.filterPokemon = this.allPokemons.filter(pokemon => pokemon.name === this.search)[0]
    } else {
      this.filterPokemon = null
    }
  }
}
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>