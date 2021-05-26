<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header style="font-size: 20px" @click="getDetailEvolutionPokemon">
        Evolution Section
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-stepper
          class="mt-2"
          v-model="e6"
          vertical
        >
        <div v-for="(pokemon, idx) in evolutions" :key ="idx">
          <v-stepper-step
            :complete="e6 > idx + 1"
            :step="idx+1"
            class="text-capitalize" 
          >
            {{pokemon.name}}
          </v-stepper-step>

          <v-stepper-content
            :step="idx+1" 
          >
            <v-card>
              <v-img
                :src="pokemon.sprites.other['official-artwork']['front_default']"
                class="mb-4"
                height="100%"
              ></v-img>
            </v-card>
            <v-btn
              color="primary"
              @click="next"
            >
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
            <v-btn 
              color="secondary"
              v-if="e6 > 1"
              @click="back"
            >
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
            <v-btn
              v-if="pokemon.id !== Number($route.params.id)"
              class="float-right"
              color="accent"
              @click="goToDetail(pokemon.id)"
            >
              Detail
            </v-btn>
          </v-stepper-content>
        </div>
        </v-stepper>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import _ from 'lodash'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      e6: null,
      evolutions: [],
    }
  },
  computed: {
    ...mapState(['allPokemons'])
  },
  props: ['pokemon', 'evolutionPokemons'],
  methods: {
    next () {
      if(this.e6 < this.evolutions.length){
        this.e6++
      } else {
        this.e6 = 1
      }
    },
    back () {
      if(this.e6 <= this.evolutions.length){
        this.e6--
      } else {
        this.e6 = 1
      }
    },
    goToDetail (id) {
      this.$router.push(`/pokemon/${id}`)
    },
    getDetailEvolutionPokemon() {
      const {evolutionPokemons} = this.evolutionPokemons
      const {pokemon} = this.pokemon
      if(evolutionPokemons.length !== 0){
        this.evolutions = _.intersectionBy(this.allPokemons, evolutionPokemons, 'name')
        this.e6 = Number(this.evolutions.findIndex(evolution => evolution.name === pokemon.name)) + 1
      }
    }
  }
}
</script>