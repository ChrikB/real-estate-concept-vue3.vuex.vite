<template>
  <section class="BuildingDetails  mb-4 mt-4 m-auto">
    <BuildingDetails :buildingDataProp="building" />
  </section>
</template>



<script>

import BuildingDetails from './../components/BuildingDetails.vue' 

export default {

  name: 'BuildingDetailsView',
  components: {
    BuildingDetails
  },
  props: {
    
  },
  data() {
    return {
      building: null,
      initialLoad: false
    }
  },
  methods: {

    doSearch(){ 
      let criteria;
      let buildingId =  parseInt(this.$route.params.id, 10) ;
      if (buildingId && buildingId >=0){
       criteria = {buildingId: buildingId}; 
      }else { 
        this.building = null;
        return;
      }
      let buildingsFound = this.$store.getters.getBuildings(criteria); 
      if (buildingsFound.length>0) {
        this.building = buildingsFound[0];  
      }
     // console.log('buildingsFound_', buildingsFound);
    }
  },
  mounted(){
    /*
    let buildingId =  parseInt(this.$route.params.id, 10) ; 
    if (buildingId && buildingId >=0){
      this.doSearch({buildingId: buildingId});
    }
    */
    this.doSearch();
  },
  
  watch: {
    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal) {
 
        if (this.initialLoad === false && newVal=== false){
          this.doSearch();
          this.initialLoad = true;
        //  console.log('appDataLoading changed', newVal);
        }
      }
    }
  }    

}
</script>

<style scoped>
.BuildingDetails{
  width: auto;
}

@media (max-width: 600.98px) {
  .BuildingDetails{
      width: 100%;
    }
  }
</style>
