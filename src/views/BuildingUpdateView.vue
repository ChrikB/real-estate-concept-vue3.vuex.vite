<template>
  <section class="building-update  mb-4 mt-4 m-auto aw-100">
    <BuildingFormUpdate :buildingDataProp="building"/>
    <div id="amap"></div>
  </section>
</template>



<script>

import BuildingFormUpdate from './../components/BuildingFormUpdate.vue' 

export default {

  name: 'BuildingFormUpdateView',
  components: {
    BuildingFormUpdate
  },
  props: {
    criteria: {}
  },
  data() {
    return {
      building: null,
      initialLoad: false
    }
  },
  methods: {
    getBuildingData(){ 
      let criteria;
      let buildingId =  parseInt(this.$route.params.id, 10) ; 
      if (buildingId && buildingId >=0){
       criteria = {buildingId: buildingId}; 
      } else { 
        this.building = null;
        return;
      }
      let buildingsFound = this.$store.getters.getBuildings(criteria); 
      if (buildingsFound.length>0) {
        this.building = buildingsFound[0];   
      }
         
    }
  },
  mounted(){  
    this.getBuildingData();
  },
  watch: {
    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal) {
 
        if (this.initialLoad === false && newVal=== false){
          this.getBuildingData();
          this.initialLoad = true;
        }
      }
    }
  }   

}
</script>

<style>
  #amap { height: 380px; width: 380px;}
  section.building-update {
    _width: 50%;
    _max-width: 450px;
  }

  @media (max-width: 1267.98px) {
    section.building-update {
      width: 100%;
    }
  }

  @media (max-width: 767.98px) {
    section.building-update {
      width: 90%;
    }
  }

  @media (max-width: 600.98px) {
    section.building-update {
      width: 100%;
    }
  }
</style>
