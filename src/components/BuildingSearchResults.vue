<template>
  <div class="building-search-results">
    <div class="row">
      <BuildingSearchResult 
        v-for="(buildingSearchResult, index) in buildingSearchResults" 
        :buildingSearchResult="buildingSearchResult" 
        :key="buildingSearchResult.id" 
      />
    </div>
  </div>
</template>



<script>
import BuildingSearchResult from './../components/BuildingSearchResult.vue';

export default {
  name: 'BuildingSearchResults',
  props: {
    buildingSearchResultsProp: {
      type: Array
    }
  },
  components: {
    BuildingSearchResult
  },
  updated(){
    if (this.buildingSearchResultsProp) {
        this.buildingSearchResults = this.buildingSearchResultsProp;
     }
  },
  mounted() {
     if (this.buildingSearchResultsProp) {
        this.buildingSearchResults = this.buildingSearchResultsProp;
     } 
  },
  data() {
    return {
      buildingSearchResults: []
    }
  }
}
</script>


<style scoped>

</style>
