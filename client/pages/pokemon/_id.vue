<template>
  <v-row class="mt-3">
    <v-col 
    cols="12" sm="12" md="5"
    >
      <v-card
      class="mx-auto"
      max-width="600"
      >
        <v-img
          class="white--text align-end"
          height="100%"
          :src="pokemon.sprites.other['official-artwork']['front_default']"
        >
        </v-img>
      </v-card>
      <Stepper :pokemon = {pokemon} :evolutionPokemons = {evolutionPokemons} />
    </v-col>
    <v-col 
    cols="12" sm="12" md="7"
    >
      <h1 class="text-center">{{pokemon.name.toUpperCase()}}</h1>
      <br>
      <DetailPokemon :pokemon = pokemon :abilities = abilities :moves = moves :types = types :stats = stats />
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from 'vuex'
import Stepper from '../../components/stepper'
import DetailPokemon from '../../components/detail-pokemon'
export default {
  components: { Stepper, DetailPokemon },
  data () {
      return {
        pokemon: {},
        abilities: [],
        moves: [],
        types: [],
        stats: [],
      }
    },
  computed: {
    ...mapState(['allPokemons', 'evolutionPokemons'])
  },
  methods: {
    spesificPokemon() {
      this.pokemon = this.allPokemons.filter(pokemon => pokemon.id === Number(this.$route.params.id))[0]
      this.abilities = this.pokemon.abilities.map(pokemon => pokemon.ability.name)
      this.moves = this.pokemon.moves.map(pokemon => pokemon.move.name)
      this.types = this.pokemon.types.map(pokemon => pokemon.type.name)
      this.stats = this.pokemon.stats.map(pokemon => {
        let temp = []
        temp.push(pokemon.stat.name)
        temp.push(pokemon['base_stat'])
        return temp
      })
    },
    fetchDetailPokemon(link) {
      this.$store.dispatch('fetchDetailPokemon', link)
    }
  },
  created () {
    this.spesificPokemon()
    this.fetchDetailPokemon(this.pokemon.species.url)
  }
}
</script>