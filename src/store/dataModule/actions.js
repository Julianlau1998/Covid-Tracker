import axios from 'axios'

export function getAll ({ commit }) {
  commit('GET_ALL')
  axios
    .get(`https://api.covid19api.com/summary`, {
    })
    .then(response => {
      commit('RECEIVE_ALL', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getByDate ({ commit }, payload) {
  commit('GET_BY_DATE')
  axios
    .get(`https://api.covid19api.com/country/${payload.country}/status/confirmed?from=${payload.oldDate}&to=${payload.newDate}`, {
    })
    .then(response => {
      commit('RECEIVE_BY_DATE', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getPopulation ({ commit }, payload) {
  commit('GET_POPULATION')
  axios
    .get(`https://world-population.p.rapidapi.com/population?country_name=${payload.country}`, {
      headers: {
        'X-RapidAPI-Key': '47828615demsh25b6d1f745b5386p16aa51jsnd03d35639a0a'
      }
    })
    .then(response => {
      commit('RECEIVE_POPULATION', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export function getCountries ({ commit }) {
  commit('GET_COUNTRIES')
  axios
    .get(`https://api.covid19api.com/countries`, {
    })
    .then(response => {
      commit('RECEIVE_COUNTRIES', response.data)
    })
    .catch(err => {
      console.log(err)
    })
}
