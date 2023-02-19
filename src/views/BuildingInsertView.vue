<template>
  <section class="building-add  mb-4 mt-4 m-auto aw-100">
    <BuildingFormInsert />
  </section>
</template>



<script>

import BuildingFormInsert from './../components/BuildingFormInsert.vue' 

export default {

  name: 'BuildingFormInsertView',
  components: {
    BuildingFormInsert
  },
  props: {
    criteria: {}
  },
  data() {
    return {}
  },
  methods: {

  },
  mounted(){
/*
      var map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
*/
  }  

}
</script>

<style>
  /* #map { height: 380px; width: 380px;} */
  section.building-add {
    _width: 50%;
    _max-width: 450px;
  }

  @media (max-width: 1267.98px) {
    section.building-add {
      width: 100%;
    }
  }

  @media (max-width: 767.98px) {
    section.building-add {
      width: 90%;
    }
  }

  @media (max-width: 600.98px) {
    section.building-add {
      width: 100%;
    }
  }
</style>
