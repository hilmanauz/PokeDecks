import axios from 'axios'
import _ from 'lodash'
export const state = () => ({
  allPokemons: [],
  pokemonsPagination: [],
  pokemonsName: [],
  isLoading: false,
  search: '',
  evolutionPokemons: []
})

export const mutations = {
  insertAllPokemons(state, payload) {
    state.allPokemons = payload
  },
  insertPokemonsPagination(state, payload) {
    state.pokemonsPagination = payload
  },
  changeIsLoading(state, payload) {
    state.isLoading = payload
  },
  insertPokemonsName(state, payload) {
    state.pokemonsName = payload
  },
  searchInput(state, payload) {
    state.search = payload
  },
  insertEvolutionPokemons(state, payload) {
    state.evolutionPokemons = payload
  }
}

export const actions = {
  fetchPokemons(context, payload) {
    context.commit('changeIsLoading', true)
    axios('https://pokeapi.co/api/v2/pokemon?limit=132')
      .then(({data}) => {
        const pokemons = data.results.map(pokemon => axios(`${pokemon.url}`))
        const pokemonsName = data.results.map(pokemon => pokemon.name)
        context.commit('insertPokemonsName', pokemonsName)
        return Promise.all(pokemons)
      })
      .then(responds => {
        let detailPokemons = responds.map(respond => respond.data)
        let pagination = _.chunk(detailPokemons, 12)
        context.commit('insertPokemonsPagination', pagination)
        context.commit('insertAllPokemons', detailPokemons)
        context.commit('changeIsLoading', false)
      })
  },
  fetchDetailPokemon(context, payload) {
    axios(`${payload}`)
      .then(({data}) => {
        return axios(`${data['evolution_chain'].url}`)
      })
      .then(({data}) => {
        let evolveSection = data.chain
        let allEvolutions = []
        while(evolveSection['evolves_to'].length !== 0) {
          allEvolutions.push(evolveSection.species)
          evolveSection = evolveSection['evolves_to'][0]
        }
        allEvolutions.push(evolveSection.species)
        context.commit('insertEvolutionPokemons', allEvolutions)
      })
  }
}