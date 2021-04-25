export function GET_ALL (state) {
  state.countries.loading = true
  state.err = null
}

export function RECEIVE_ALL(state, all) {
  state.countries.data = all
  state.countries.loading = false
}

export function GET_BY_DATE (state) {
  state.country.loading = true
  state.err = null
}

export function RECEIVE_BY_DATE(state, all) {
  state.country.data = all
  state.country.loading = false
}

export function GET_POPULATION (state) {
  state.population.loading = true
  state.err = null
}

export function RECEIVE_POPULATION(state, all) {
  state.population.data = all
  state.population.loading = false
}

export function GET_COUNTRIES(state) {
  state.countries_list.loading = true
  state.err = null
}

export function RECEIVE_COUNTRIES(state, all) {
  state.countries_list.data = all
  state.countries_list.loading = false
}