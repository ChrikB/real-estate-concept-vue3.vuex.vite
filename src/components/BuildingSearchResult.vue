

<template>
  <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-4">
    <div 
      class="buildingSearchResult-component" 
      @click="$router.push({ path: '/buildings/' + buildingSearchResult.id })" 
      style="__width: 250px;"
    >    
      <div class="row">

        <div class="col-12 text-start">
          <figure> 
            <div 
              class="building-thumb building-thumb-main m-auto" 
              :style="{'background-image': (buildingSearchResult.imgs&&buildingSearchResult.imgs.length>0)? 'url('+buildingSearchResult.imgs[0]+')':'' }"
            ></div>
            <figcaption></figcaption>
          </figure>
        </div>

        <div class="col-12 _text-start text-center">
<div class="d-inline-block text-center">
          <div 
            data-building="id" 
            class="building-id d-none"
          >
            {{ buildingSearchResult.id }}
          </div>
          <div 
            data-building="availability" 
            class="building-availability"
          >
            {{ buildingSearchResult.availability?'Available':'Unavailable' }}
          </div>
          <div 
            data-building="name" 
            class="building-name"
          >
            <span class="buildingNameSpan align-middle" @click="$router.push({ path: '/buildings/' + buildingSearchResult.id })" >{{ buildingSearchResult.buildingName }}</span>
          </div>
          <div 
            class="review-stars" 
            v-if="buildingSearchResult&&buildingSearchResult.rating"
          >
              <svg 
                v-for="index in 5"
                :fill="(index<buildingSearchResult.rating)?'#ffcd00':'transparent'"  
                xmlns="http://www.w3.org/2000/svg" 
                stroke="#979494" 
                style="margin-right: 0.1rem;" 
                width="16" 
                height="16" 
                class="bi bi-star-fill" 
                viewBox="0 0 16 16"
              >           
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
          </div>
          <div>
            <span 
              data-building="region"   
              v-if="buildingSearchResult.region" 
              class="building-region"
            >
              {{ buildingSearchResult.region }}/
            </span>
            <span 
              data-building="country"  
              class="building-country"
            >
              {{ buildingSearchResult.country }}
            </span>
          </div>
          <div class="row g-3 align-items-center justify-content-center">
            <div class="col-auto">
              <div class="label building-size-label">Size:</div>
            </div>
            <div class="col-auto">  
              <div 
                data-building="size" 
                class="building-size"
              >
                {{ buildingSearchResult.size }}
                <span class="building-size-unit p-1">Sq.M</span>
              </div>   
            </div>
          </div>         
          <div class="row g-3 align-items-center justify-content-center">
            <div class="col-auto">
              <div class="label building-floor-label">Floor:</div>
            </div>
            <div class="col-auto">  
              <div 
                data-building="floor" 
                class="building-floor"
              >
                {{ buildingSearchResult.floor }}
              </div>   
            </div>
          </div>


          <div 
            data-building="price"   
            class="building-price align-items-center"
          >
            <span>${{ buildingSearchResult.pricePerDay }}</span>
            <span>/day</span>
          </div>
          <div 
            data-building="bundles"   
            class="building-bundles align-items-center"
          >
            <a v-if="itHasBundles()" :href="'/buildings/' + buildingSearchResult.id + '#bundles'">See bundles</a>
          </div>
</div>

        </div>

      </div><!-- end of row -->
    </div>
  </div>
</template>


<script>
export default {
  name: 'BuildingSearchResult',
  components: { },
  props: {
    buildingData: {},
    buildingSearchResult:{}
  },
  data() {
    return {}
  },
  methods: {
    itHasBundles(){
      if( this.buildingSearchResult&&this.buildingSearchResult.bundles&&this.buildingSearchResult.bundles.length>0 ){
        return true;
      }
      return false;
    }
  }  
}
</script>


<style scoped>
  .buildingSearchResult-component:hover{
    cursor: pointer;
  }
  .buildingSearchResult-component .building-thumb-main { 
    _width: 200px; 
    height: 200px; 
    background-size: cover; 
    background-position: center; 
    cursor: pointer;
    max-width: 250px;
    width: 100%;
  }
  
  .buildingSearchResult-component .building-price,
  .buildingSearchResult-component .building-name,
  .buildingSearchResult-component .building-size,
  .buildingSearchResult-component .building-size-label,
  .buildingSearchResult-component .building-region,
  .buildingSearchResult-component .building-country,
  .buildingSearchResult-component .building-floor,
  .buildingSearchResult-component .building-floor-label {
    text-transform: capitalize;
  }
  
  .buildingSearchResult-component .building-price>* {
    font-size: 17px;
    font-weight: bold;
  }

  .buildingSearchResult-component .building-name,
  .buildingSearchResult-component .building-size,
  .buildingSearchResult-component .building-size-unit {
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
  }

  .buildingNameSpan{
    text-decoration: underline;
    cursor:pointer
  }  
  .buildingNameSpan:hover{
    color: blue;
  }

  @media (max-width: 575.98px) { 
    .buildingSearchResult-component{
      margin: auto;
    }
    .buildingSearchResult-component .building-thumb {
      margin: auto;
    }
    .buildingSearchResult-component>.row>* {
      text-align:center!important;
    }
    .buildingSearchResult-component>.row>div>.row {
      justify-content: center;
    }
  }
</style>
