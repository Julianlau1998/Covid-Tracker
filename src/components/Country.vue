<template>
  <div id="wrapper">
      <h1 id="subheader">
              {{currentCountry.Country}}
          </h1>
      <div class="parent">
        <div class="child">
            <h2>
                Total Cases: <span class="yellow">{{currentCountry.TotalConfirmed}}</span>
            </h2>
          </div>
          <div class="child">
            <h2>
                Total Deaths: <span class="red">{{currentCountry.TotalDeaths}}</span>
            </h2>
          </div>
          <div class="child">
            <h2>
                New Cases: <span class="yellow">{{currentCountry.NewConfirmed}}</span>
            </h2>
          </div>
          <div class="child">
            <h2>
                New Deaths: <span class="red">{{currentCountry.NewDeaths}}</span>
            </h2>
        </div>
      </div>
      <br>
      <h1>
          7-Day-Incidence: <span class="yellow">{{ (Math.round(incidence * 100)/100).toFixed(2) }}</span>
      </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
    props: ['country'],
    data () {
        return {
            countryData: {},
            oldDate: '',
            newDate: '',
            incidence: ''
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            this.$store.dispatch('dataModule/getAll')

            //Get Date from 7 days ago
            let date = new Date();
            let last = new Date(date.getTime() - (8 * 24 * 60 * 60 * 1000));
            let day=last.getDate();
            let month=last.getMonth()+1;
            let year=last.getFullYear();
            this.oldDate = `${year}-${month}-${day}`

            //get current date
            date = new Date();
            day=date.getDate();
            month=date.getMonth()+1;
            year=date.getFullYear();
            this.newDate = `${year}-${month}-${day}`

            // get data from last 7 days
            let payload = {
                country: this.country,
                oldDate: this.oldDate,
                newDate: this.newDate
            }
            this.$store.dispatch('dataModule/getByDate', payload)

            //Get population of country
            payload = {
                country: this.country
            }
            this.$store.dispatch('dataModule/getPopulation', payload)
            }
    },
    computed: {
    ...mapState(['dataModule']),
        allCountries () {
            return (!this.dataModule.countries.loading && this.dataModule.countries.data) || []
        },
        currentCountry () {
            let countryData = {}
            if (this.allCountries.Countries !== undefined) {
                for (let i=0; i<this.allCountries.Countries.length; i++) {
                    if (this.allCountries.Countries[i].Country === this.country) {
                        countryData = this.allCountries.Countries[i]
                    }
                }
            }
            return countryData
        },
        countryByDate () {
            return (!this.dataModule.country.loading && this.dataModule.country.data) || []
        },
        population () {
            return (!this.dataModule.population.loading && this.dataModule.population.data) || []
        }
    },
    watch: {
        population () {
            let casesLastWeek = 0
            if (this.countryByDate.length>0 && this.population !== undefined) {
                for (let i=1; i<this.countryByDate.length; i++) {
                    casesLastWeek += this.countryByDate[i].Cases - this.countryByDate[i-1].Cases
                }
                this.incidence = casesLastWeek/this.population.body.population *100000
            }
            return this.incidence
        },
        country () {
            this.getData()
        }
    }
}
</script>

<style>
    .parent {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
    }
    .child {
        width: 25rem;
        margin: auto; 
    }
    #subheader {
        margin-top: -2rem;
        font-size: 2.5rem;
    }
    .yellow {
        color: #D4AC0D;
    }
    .red {
        color: #A93226;
    }

</style>