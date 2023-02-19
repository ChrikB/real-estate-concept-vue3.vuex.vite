<template>
  <section class="buildings">
    <div class="product-list-view"></div>
    <div  
      :class="{'d-none':(criteriaProp?false:true)}" 
      class="search-criteria-container"
    >
      <h5 class="mt-3 mb-3">
        <u class="p-2">Search Buildings</u>
      </h5>
      <BuildingSearchCriteria 
        @criteriaUpdated="updateCriteria" 
        :buildingSearchCriteriaProp="criteriaProp"
      />
    </div>
    <div>
      <h5 class="mb-5 mt-4 h-title">Buildings for rent</h5>
      <div class="row">
        <div class="col-12" >
           <BuildingSearchResults :buildingSearchResultsProp="buildings"/>
        </div>
      </div>
    </div>
  </section>
</template>



<script>

import BuildingSearchResults from './../components/BuildingSearchResults.vue' 
import BuildingSearchCriteria from'./../components/BuildingSearchCriteria.vue' 

export default {

  name: 'BuildingSearchResultsView',
  components: {
    BuildingSearchCriteria,
    BuildingSearchResults
  },
  props: {
    criteriaProp: null
  },
  data() {
    return {
      initialLoad: false,
      criteria: {},
      buildings: []
    }
  },
  updated(){},
  mounted(){},
  methods: {
    updateCriteria(criteria) {  
      this.criteria = criteria;
      this.doSearch();
    },

    doSearch(criteria) { 
      if(!criteria){
        criteria = this.criteria;
      }
      let buildingsFound = this.$store.getters.getBuildings(criteria);
      this.buildings = buildingsFound;
    }
  }, 
  watch: {

    'criteria':{
      deep: true,
      handler(newVal, oldValue){
      }
    },

    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal) {
 
        if (this.initialLoad === false && newVal=== false){
          this.doSearch();
          this.initialLoad = true;  
        }
      }
    }
  }  
  

}
</script>