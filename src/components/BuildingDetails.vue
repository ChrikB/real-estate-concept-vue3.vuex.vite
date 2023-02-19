

<template>
  <div class="buildingDetails-component" style="max-width: 1200px;">
    <h1 class="d-none text-capitalize" v-if="buildingDataProp">{{buildingDataProp.buildingName}}</h1>
    <div class="row">
      <div class="col-12 col-md-6">

        <div 
          id="carouselCaptions" 
          class="carousel slide m-auto" 
          data-bs-ride="carousel" 
          style="max-width: 500px;padding-bottom: 70px;"
        > 
          <div 
            class="carousel-indicators m-auto w-100" 
            style="background: #f9f9f9;"
          >
            <button  
              class="active" 
              aria-current="true" 
              type="button" 
              data-bs-target="#carouselCaptions"
              v-if="buildingDataProp" 
              v-for="(img,index) in buildingDataProp.imgs" 
              :data-bs-slide-to="index" 
              :aria-label="'Slide '+ index"
              :style="{'background-image': 'url('+getPath(img)+')'}" 
              style="background-size: cover; width: 50px; height: 50px;"
              >
            </button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item" 
              :class="{'active': (index===0)?true:false}" 
              v-if="buildingDataProp" 
              v-for="(img,index) in buildingDataProp.imgs"
              >
                <div 
                  class="carousel-item-img-bg"
                  :style="{'background-image': 'url('+getPath(img)+')'}"
                ></div>
                <div class="carousel-caption d-none"></div>
            </div>
          </div>

          <button 
            class="carousel-control-prev" 
            type="button" 
            data-bs-target="#carouselCaptions" 
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button 
            class="carousel-control-next" 
            type="button" 
            data-bs-target="#carouselCaptions" 
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        



      </div>
      <div class="col-12 col-md-6">
        <div class="row g-0 text-start">

          <h2 
            class="ps-1 text-capitalize" 
            v-if="buildingDataProp"
          >
            {{buildingDataProp.buildingName}}
          </h2>
          <a 
            role="button"
            @click="goTo" 
            class="p-1 d-inline-block w-auto" 
          >
            Edit Post as Admin
          </a>

          <div class="mb-1 col-12 text-left">
            <label  class="form-label m-0 p-1 _fw-bold align-middle">Reviews</label>
            <div 
              class="review-stars d-inline-block" 
              v-if="buildingDataProp&&buildingDataProp.rating"
            >
              <svg 
                v-for="index in 5" 
                xmlns="http://www.w3.org/2000/svg" 
                stroke="#979494" 
                style="margin-right: 0.1rem;" 
                width="16" 
                height="16" 
                :fill="(index<buildingDataProp.rating)?'#ffcd00':'transparent'" 
                class="bi bi-star-fill" 
                viewBox="0 0 16 16"
              >           
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            </div>
          </div>

          <div 
            class="mb-1 col-12 text-left" 
            v-if="buildingDataProp&&buildingDataProp.country"
          >
            <label  class="form-label m-0  p-1  fw-bold">Country</label>
            <span class="p-1">{{buildingDataProp.country}}</span>
          </div>

          <div 
            class="mb-1 col-12 text-left" 
            v-if="buildingDataProp&&buildingDataProp.size"   
          >
            <label  class="form-label m-0  p-1  fw-bold">Size</label>
            <span  class="p-1">{{buildingDataProp.size}}</span>
          </div>

          <div 
            class="mb-1 col-12 text-left" 
            v-if="buildingDataProp&&buildingDataProp.floor"  
          >
            <label  class="form-label m-0  p-1  fw-bold">Floor</label>
            <span class="p-1">{{buildingDataProp.floor}}</span>
          </div>

          <div 
            class="mb-1 col-12 text-left" 
            v-if="buildingDataProp&&buildingDataProp.rooms"  
          >
            <label  class="form-label m-0  p-1  fw-bold">Rooms</label>
            <span class="p-1">{{buildingDataProp.rooms}}</span>
          </div>
          
          <div 
            class="mb-1 col-12 text-left" 
            v-if="buildingDataProp&&buildingDataProp.pricePerDay"
          >
            <label  class="form-label m-0  p-1  fw-bold">Price(per day)</label>
            <span class="p-2">{{buildingDataProp.pricePerDay.toLocaleString()}}$</span>
          </div>

          <div class="mb-1 col-12 text-center">
            <button class="btn btn-success demo-disabled">Book now</button>
          </div>
        </div>
      </div>      
    </div>
    <div class="row" style="min-width: 300px;min-height: 400px;">
      <div class="col-12 mt-5 mb-3"><hr class="m-auto w-75"></div>
      <div class="col-12 col-md-6 datepicker-col">
        <h5 class="mt-3 mb-3">Available Dates</h5>
        <Datepicker 
          _dark
          style="justify-content: center;" 
          v-model="dateValue"  
          range 
          multi-calendars 
          :enable-time-picker="false" 
          :month-change-on-scroll="false"  
          :highlight="allowedDates" 
          :allowed-dates="allowedDates" 
          inline 
          ref="datepicker"
        ></Datepicker>
      </div>
      <div class="col-12 col-md-6 map-col">  
        <h5 class="mt-3 mb-3">Location</h5>
        <div class="map-cont mt-3" style=" margin:auto;">
          <div id="map" class="m-auto  h-100"></div>
        </div>
      </div>
    </div>
    <div class="row" style="min-width: 300px; min-height: 400px;">
      <div 
        id="bundles"
        class="col text-start mt-5"
        v-if="buildingDataProp&&buildingDataProp.bundles&&buildingDataProp.bundles.length>0"
        v-for="(bundle, index) in buildingDataProp.bundles"
        :index="index"
        :key="bundle"
      >

                    <div class="bundle mt-3 mb-3 text-center mx-auto" style="width:300px;"> 
                        <h5>{{bundle.name||'Unnamed'}}</h5>
                        <p class="d-inline-block p-1 fw-bold card-savingsMessage">
                          Save 
                          <span class="fw-bold save-percent">{{calcBundleSavings(bundle)}}</span>%
                        </p>
                        <div class="p-2">
                          <button class="btn btn-success demo-disabled">Select</button>
                        </div>
                        <div>
                            <ul class="list-group list-group-flush">
                              <li 
                                class="list-group-item" 
                                v-for="(bundleProp, indexKey) in filterBundleStaticProps(bundle)"
                              >
                                <span class="fw-bold text-capitalize d-inline-block">{{indexKey}}</span>
                                <svg 
                                  v-if="(bundleProp===true||bundleProp==='true')" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="26" 
                                  height="26" 
                                  fill="currentColor" 
                                  class="bi bi-check position-absolute d-inline-block" 
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                                <svg 
                                  v-if="(bundleProp===false||bundleProp==='false')" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="26" 
                                  height="26" 
                                  fill="currentColor" 
                                  class="bi bi-x position-absolute d-inline-block align-middle" 
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>                            
                              </li>
                            </ul>
                        </div>

                        <div 
                          class="bundle-dates p-2"  
                          v-if="bundle.dates.length>0"
                        >
                          <label class="fw-bold d-none">Available for</label>
                          <span class="p-2 d-block fw-bold text-decoration-underline"  style="color:green;">{{ reformDate(bundle.dates) }}</span>
                        </div>

                        <div 
                          class="bundle-duration p-2"  
                          v-if="bundle.days"
                        >
                          <label class="fw-bold">Duration:</label>
                          <span class="p-2">{{bundle.days}} days</span>
                        </div>

                        <div 
                          class="bundle-price p-2"     
                          v-if="bundle.bundlePrice>0"
                        >
                          <h5>{{bundle.bundlePrice}} $</h5>
                        </div>

                    </div>  
          </div>
    </div>

    <div class="mb-3"></div>
  </div>
</template>


<script>


import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import BuildingFormDataBundle from './BuildingFormDataBundle.vue';

export default {

  name: 'BuildingDetails',
  components: {
    Datepicker,
    BuildingFormDataBundle
  },
  props: {
    buildingDataProp: {
      type: Object
    }
  },
  data() {
    return {
      bundleStaticProps: ['bundlePrice', 'duration', 'name', 'dates', 'days'],
      leaflet: null,
      dateValue: [],
      d: {
        username: "",
        buildingName: "",
        region: "",
        country: "CANADA",
        countryMapObj:"",
        map: {
          lat: null,
          lng: null
        },
        size: "1234",
        floor: "2",
        rooms: "",
        pricePerDay: "",
        availability: "",
        imgs:[],
        bundles:[],
      }
    }
  },
  methods: {

    reformDate(bundleDates){
      let d = bundleDates.map(function(x){ return new Date(x).toLocaleDateString() } );
      return d.join(' - ');
    },

    goTo(){
      this.$router.push({ path: '/building/' + this.buildingDataProp.id })
    },

    getPath(x){
      if (x.length>100 || /blob/i.test(x) || /base64/i.test(x) ){
        /* means it is  base64 or blob */
        return x;
      }
      /* otherwise its a string path */
      return new URL('./../../' + x, import.meta.url).href
    },

    calcBundleSavings(bundle){
      let originalPrice = this.buildingDataProp.pricePerDay * bundle.days; 
      let bundlePrice = bundle.bundlePrice;    
      let dif = originalPrice - bundlePrice;

      let discount = bundlePrice*100/originalPrice;   
      return Math.ceil(100 - discount);
    },

    filterBundleStaticProps(bundle) {
      let allowed = this.bundleStaticProps;
      const filtered = Object.keys(bundle)
        .filter(key => !allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = bundle[key];
          return obj;
        }, {});

      return filtered;
    },

    createCalendars(){

    },

    format(dateOrArray) {
    
      let formater =  (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return day + '/' + month + '/' + year;
      }
    
      if( Array.isArray(dateOrArray) ){
        let formatted = [];
        for(let m =0; m< dateOrArray.length; m++){
          let date = dateOrArray[m];
          let formattedDate = formater(date); 
          formatted.push(formattedDate);
        }
        return formatted;
      } else {
        return  formater(dateOrArray); 
      }

    }, 

    updateLeafMap(countryOption, setView){ 
      if (!countryOption||!countryOption.lat||!countryOption.lng){    
        return;
      }
      let THAT = this;
      let latC = countryOption.lat;
      let lngC = countryOption.lng;

      this.leaflet.eachLayer((layer) => {
        if(layer['_latlng']!=undefined){
          layer.remove();
        }
      });
      if(setView){
        this.leaflet.setView([latC, lngC], 3); 
      }
      L.marker([latC, lngC]).addTo(this.leaflet);     
    }


  },
  watch:{
      'buildingDataProp'(newValue){
        if ( newValue ) {
          if ( newValue.map ) {
            this.updateLeafMap(this.buildingDataProp.map, true);
          }
        }
      }
  },
  mounted(){
    let THAT = this;
    let map = L.map('map',{scrollWheelZoom: false});
    map.setView([51.505, -0.09], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.leaflet = map;

  },
  beforeUpdate(){
    if (this.buildingDataProp && this.buildingDataProp.availability ){
  
      const map1 =  this.buildingDataProp.availability.map( x => new Date(x) );

      this.allowedDates = this.buildingDataProp.availability; 
    }   
  }  

}
</script>


<style>

.buildingDetails-component .demo-disabled:after{
    content: 'Disabled';
    position: absolute;
    color: rgba(255, 255, 255, 0);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .buildingDetails-component .demo-disabled:hover {
    color: rgba(255,255,255,0)!important;
    background-color: #dc3545!important;
    border-color: rgba(255, 255, 255, 0)!important;
    cursor: not-allowed;
  }

  .buildingDetails-component .demo-disabled:hover:after {
    color: rgba(255, 255, 255, 1);
  }

  .buildingDetails-component  .dp__action_row {
    /* datepicker fixing priginal bug for no-updating width when screen dimension changes. */
    width: 100%!important;
  }

  .buildingDetails-component .carousel-item-img-bg {
    background-size:cover; 
    width: 100%;
    max-width: 500px; 
    height:350px;
  }

  .buildingDetails-component .bundle {
    padding: 10px;
    border:1px solid rgba(0,0,0,0.14);
    border-radius: 5px;
  }

  .buildingDetails-component .bi-check {
    fill: green;
  }

  .buildingDetails-component .bi-x {
    fill: red;
  }

  .buildingDetails-component .card-savingsMessage{ 
    background:rgb(235, 255, 229); 
  }

  .buildingDetails-component .map-cont{
    width: 450px;
    height: 367px;
  }

  @media (max-width: 500px) {
    .buildingDetails-component .map-cont{
      width: 100%!important;
    }
  }

  @media (max-width: 1300px) {
    .buildingDetails-component .datepicker-col,
    .buildingDetails-component .map-col {
      width: 100%!important;
    }
  }

  .dp__cell_highlight {
    _background-color: rgb(105, 167, 131, 0.4);
  }
  .dp__range_end, 
  .dp__range_start, 
  .dp__active_date {
    background-color: #abcee9!important;
    color: #000000;
  }
</style>
