<template>
  <section class="stats-view  mb-4 mt-4 m-auto">
    <h4 class="mb-4">Stats</h4>
    <div class="row align-items-center  mt-4 mb-4">
      <div class="col-12 col-md-6 mb-4 chart-col">
        <h5>Total Users and Buildings</h5> 
        <div class="chart-cont">
          <canvas ref="pieSums"></canvas>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-4 chart-col">
        <h5>Most visited buildings</h5>   
        <div  class="chart-cont">
          <canvas ref="topVisits"></canvas>
        </div>   
      </div> 
    </div>
    <div class="row  align-items-center mt-4  mb-4">
      <div class="col-12 col-md-6 mb-4 chart-col">  
        <h5>Countries with most users</h5>   
        <div  class="chart-cont">
          <canvas ref="topUserCountries"></canvas>
        </div>
      </div>   
      <div class="col-12 col-md-6 mb-4 chart-col">
        <h5>Countries with most buildings</h5>
        <div  class="chart-cont">
          <canvas ref="topBuildingCountries"></canvas>
        </div>
      </div>       
    </div>
  </section>
</template>



<script>

import Chart from 'chart.js/auto';

export default {

  name: 'StatsView',
  components: {},
  props: {},
  data() {
    return {
      initialLoad: false,
      charts: {
        pieSums: {
          data: null, 
          chart: null
        },
        topVisits: {
          data: null, 
          chart: null
        },
        topUserCountries: {
          data: null, 
          chart: null
        },
        topBuildingCountries: {
          data: null, 
          chart: null
        }
      },
      processed: {
        buildings: [],
        userSum: 0,
        buildingSum: 0,
        topBuildingVisits: null,
        topUserCountries: null,
        topBuildingCountries: null
      }
    }
  },
  methods: {

    initData(){

      let THAT = this;
      let users = this.$store.state.users;

      let topBuildingCountries = {};
      let topUserCountries = {};
      let buildingsLen = 0;
      let userLen = users.length;
      let buildings = [];


      for (let m=0; m < userLen; m++) {

        buildingsLen = buildingsLen + (users[m].buildings?users[m].buildings.length:0);

        if (users[m].buildings) {

          let bLen = users[m].buildings.length;
          /* lets store user countries to an object*/
          let userCountry = users[m].country;
          if ( !topUserCountries.hasOwnProperty( userCountry )) {
            topUserCountries [ userCountry ] = 1;
          } else {
            topUserCountries [ userCountry ]++;
          }


          for(let b= 0; b < bLen; b++){
            /* lets store buildings to a flat array */
            buildings.push(users[m].buildings[b]);

            /* lets store building countries to an object  */
            let buildingCountry = users[m].buildings[b].country;

            if ( !topBuildingCountries.hasOwnProperty( buildingCountry )) {

              topBuildingCountries [ buildingCountry ] = 1;
            } else {

              topBuildingCountries [ buildingCountry ]++;
            }

          }
        }
      }


      function compareVisits( a, b ) {
        if ( a.visits < b.visits ){
          return -1;
        }
        if ( a.visits > b.visits ){
          return 1;
        }
        return 0;
      }

      this.processed.buildings = buildings;
      this.processed.userSum = userLen;
      this.processed.buildingSum = buildingsLen;
      this.processed.topBuildingVisits = buildings.sort( compareVisits ).slice(0, 3).reverse();
      this.processed.topUserCountries =  topUserCountries;
      this.processed.topBuildingCountries = topBuildingCountries;

    },
    pieSums(){
      let THAT = this;    
      this.charts.pieSums.data = {
        labels: [
          'Users',
          'Buildings'
        ],
        datasets: [
          {
            label: 'Totals',
            data: [
              THAT.processed.userSum , 
              THAT.processed.buildingSum 
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)'
            ],
            hoverOffset: 4
          }
        ]
      };

      const ctx = this.$refs.pieSums;
      THAT.charts.pieSums.chart = new Chart(ctx, {
        type: 'doughnut',
        data: THAT.charts.pieSums.data,
        options:{
          responsive: true,
          animation: {
            onProgress: function() {
             this.canvas.style.margin = 'auto';
            }
          }
        }
      });
    },

    visitsBars(){

      let THAT = this;
      let labels = [];
      let visits = [];
      for(let m =0; m< THAT.processed.topBuildingVisits.length; m++){
        labels.push(THAT.processed.topBuildingVisits[m].buildingName);
        visits.push(THAT.processed.topBuildingVisits[m].visits);
      }

      const data = {
        labels:  labels,
        datasets: [{
          label: 'Visits',
          data: visits,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
      THAT.charts.topVisits.data = data;


      const ctx = this.$refs.topVisits;
      THAT.charts.topVisits.chart = new Chart(ctx, {
        type: 'bar',
        data: THAT.charts.topVisits.data,
        options:{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
                y: {
                    ticks: {
                        precision: 0
                    }
                }
          },
          animation: {
            onProgress: function() {
             this.canvas.style.margin = 'auto';
            }
          }
        }
      });

    },

    userCountriesBars(){
      let THAT = this;

      const data = {
        labels:  Object.keys(THAT.processed.topUserCountries).slice(0, 3) ,
        datasets: [{
          label: 'Users',
          data: Object.values(THAT.processed.topUserCountries).slice(0, 3) ,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      THAT.charts.topUserCountries.data = data;


      const ctx = this.$refs.topUserCountries;
      THAT.charts.topUserCountries.chart = new Chart(ctx, {
        type: 'bar',
        data: THAT.charts.topUserCountries.data,
        options:{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
                y: {
                    ticks: {
                        precision: 0
                    }
                }
          },
          animation: {
            onProgress: function() {
             this.canvas.style.margin = 'auto';
            }
          }
        }

      });

    },

    buildingCountriesBars(){

      let THAT = this;

      const data = {
        labels:  Object.keys(THAT.processed.topBuildingCountries).slice(0, 3) ,
        datasets: [{
          axis: 'y',
          label: 'Buildings',
          data: Object.values(THAT.processed.topBuildingCountries).slice(0, 3) ,
          backgroundColor: [
            'rgba(201, 203, 207, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      THAT.charts.topBuildingCountries.data = data;


      const ctx = this.$refs.topBuildingCountries;
      THAT.charts.topBuildingCountries.chart = new Chart(ctx, {
        type: 'bar',
        data: THAT.charts.topBuildingCountries.data, 
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          indexAxis: 'y',
          scales: {
            x: {
              ticks: {
                precision: 0
              }
            }
          },
          animation: {
            onProgress: function() {
             this.canvas.style.margin = 'auto';
            }
          }
        }
      });
    },

    clearCharts(){
      for (let a in this.charts){
        if (this.charts[a].chart){
          this.charts[a].chart.destroy();
        }
      }
    }

  },
  created() {

  },
  mounted(){ 
    this.clearCharts();
    this.initData();
    this.pieSums();  
    this.visitsBars();   
    this.userCountriesBars();  
    this.buildingCountriesBars(); 
  },
  watch: {

    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal, oldValue) {
      //  alert(4 + JSON.stringify(this.initialLoad) + JSON.stringify(newVal) + JSON.stringify(oldValue) );
        if (this.initialLoad === false && newVal=== false){  // alert(4986787);
          this.clearCharts();
          this.initData();
          this.pieSums();  
          this.visitsBars();   
          this.userCountriesBars();  
          this.buildingCountriesBars(); 
          this.initialLoad = true;  
          console.log('appDataLoading changed', newVal);
        }

      }
    }
  }   

}
</script>

<style scoped>

  .chart-col{
    position: relative; 
    min-height: 350px; 
    height: 20vh; 
    max-height: 450px;
  }

  .chart-cont{
    position:relative;
    width:100%;
    height:85%;
  }

  .stats-view {
      width: 75%;
  }

  @media (max-width: 876px) {
    .stats-view {
      width: 70%;
    }
  }
  @media (max-width: 576px) {
    .stats-view {
      width: 100%;
    }
  }
</style>
