<template>
  <div class="home">
    <h1 class="header">Covid Tracker</h1>
    <country 
      :country="country.Country"
     />
    <select
      name="country"
      id="country"
      v-model="country"
    >
       <option disabled selected value="Select Country">
         Select Country
       </option>
       <option 
          v-for="(country, index) in countries"
          :key="index"
          :value="country"
        >
        {{country.Country}}
        </option>
     </select>
  </div>
</template>

<script>
import { mapState } from 'vuex' 

import country from '../components/Country.vue'
export default {
  name: 'Home',
  components: {
    country
  },
  data () {
    return {
      country: {
        Country: 'Germany'
      }
    }
  },
  created () {
    this.$store.dispatch('dataModule/getCountries')
  },
  computed: {
    ...mapState(['dataModule']),
    countries () {
      return (!this.dataModule.countries_list.loading && this.dataModule.countries_list.data) || [{}]
    },
  },
  watch: {
    countries (val) {
      if (val == undefined) {
        alert('test')
      }
    }
  }
}
</script>

<style scoped>
  #country {
    width: 10rem;
    height: 2rem;
    background-color: rgb(43, 43, 43);
    border: none;
    border-radius: 5px;
    color: lightgray;
    font-size: 1.1rem;;
  }
</style>
