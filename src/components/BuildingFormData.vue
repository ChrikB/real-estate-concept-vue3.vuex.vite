

<template>
  <div class="buildingFormData-component">
    <div class="mb-5">
      <label 
        for="buildingName" 
        class="form-label fw-bold buildingName"
      >
        Building Name/type
      </label>
      <input 
        type="text" 
        class="form-control" 
        id="buildingName" 
        aria-describedby="buildingNameHelp" 
        :class="{'is-invalid': (invalids.buildingName)?true:false}"  
        v-model="d.buildingName" 
      >
      <div 
        class="invalid-tooltip" 
        v-if="invalids.buildingName"
      >
        {{invalids.buildingName}}
      </div>
      <div id="buildingNameHelp" class="form-text"></div>
    </div>

    <ul class="nav nav-tabs nav-fill">

        <button 
          class="nav-link active" 
          id="building-props" 
          type="button"  
          role="tab"  
          data-bs-toggle="tab" 
          data-bs-target="#building-props-tab" 
          _aria-current="page"
        ><span :class="{'has-invalids': hasInvalidsProperties}">Info</span></button>

        <button 
          class="nav-link" 
          id="building-photos"  
          type="button"  
          role="tab"  
          data-bs-toggle="tab" 
          data-bs-target="#building-photos-tab" 
          _aria-current="page"   
        ><span :class="{'has-invalids': hasInvalidsPhotos}">Photos</span></button>

        <button 
          class="nav-link" 
          id="building-availability" 
          type="button"  
          role="tab"  
          data-bs-toggle="tab" 
          data-bs-target="#building-availability-tab" 
        >Availability</button>


        <button 
          class="nav-link" 
          id="building-bundles" 
          type="button"   
          role="tab"   
          data-bs-toggle="tab" 
          data-bs-target="#building-bundles-tab"
        ><span :class="{'has-invalids': hasInvalidsBundles}">Bundles</span>
        <span class="bundle-sum">{{(d.bundles.length/* 11-2-2023   -1*/)}}</span>
      </button>

    </ul>
    <div 
      class="tab-content" 
      id="myTabContent"
    >
      <div 
        class="tab-pane fade active show" 
        id="building-props-tab" 
        role="tabpanel" 
        aria-labelledby="building-props"
      >
        <div class="mt-5 m-auto" style="max-width: 460px;">
             <div class="row g-1">
               <div class="mb-3 col-12  col-md-3">
                  <label for="size" class="form-label">Size</label>
                  <input 
                    id="size" 
                    aria-describedby="sizeHelp"
                    type="number" 
                    class="form-control" 
                    :class="{'is-invalid': (invalids.size)?true:false}" 
                    v-model="d.size"
                  >
                  <div 
                    class="invalid-tooltip" 
                    v-if="invalids.size"
                  >{{invalids.size}}</div>
                 <div id="sizeHelp" class="form-text"><span style="color:#71b370;">*Square Meters</span></div>
               </div>   
               <div class="mb-3 col-12 col-md-3">
                  <label for="floor" class="form-label">Floor</label>
                  <input 
                    id="floor" 
                    aria-describedby="floorHelp"
                    type="number" 
                    class="form-control" 
                    :class="{'is-invalid': (invalids.floor)?true:false}"   
                    v-model="d.floor"
                  >
                  <div 
                    class="invalid-tooltip" 
                    v-if="invalids.floor"
                  >
                    {{invalids.floor}}
                  </div>
                  <div id="floorHelp" class="form-text"></div>
               </div> 
               <div class="mb-3 col-12 col-md-3">
                  <label for="rooms" class="form-label">Rooms</label>
                  <input 
                    id="rooms" 
                    aria-describedby="roomsHelp"
                    type="number" 
                    class="form-control"  
                    :class="{'is-invalid': (invalids.rooms)?true:false}"  
                    v-model="d.rooms"
                  >
                  <div 
                    class="invalid-tooltip" 
                    v-if="invalids.rooms"
                  >
                    {{invalids.rooms}}
                  </div>
                  <div id="roomsHelp" class="form-text"></div>
               </div> 
               <div class="mb-3 col-12 col-md-3">
                <label for="pricePerDay" class="form-label">Price/Day</label>
                <input 
                  id="pricePerDay" 
                  aria-describedby="pricePerDayHelp"
                  type="number" 
                  class="form-control" 
                  :class="{'is-invalid': (invalids.pricePerDay)?true:false}"  
                  v-model="d.pricePerDay" 
                >
                <div 
                    class="invalid-tooltip" 
                    v-if="invalids.pricePerDay"
                  >
                    {{invalids.pricePerDay}}
                </div>

               </div> 
                        
               <div class="mb-3">
                  <div class="m-auto" style="max-width: 460px;"> 
                    <label for="country" class="form-label">Country</label>
                    <select 
                      class="form-select form-control"  
                      :class="{'is-invalid': (invalids.country)?true:false}"     
                      v-model="countrySelectedIndex"  
                      aria-label="Default select example" 
                      id="exampleCheck1"
                      @change="updateCountryIndex"
                    >
                      <option  
                        v-for="(option, index) in countries" 
                        :key="index" 
                        :lon="option.center_lng" 
                        :lat="option.center_lat" 
                        :value="index"
                      >{{option.long_name}}</option>     
                    </select>
                    <div class="invalid-tooltip" v-if="invalids.country">
                        {{invalids.country}}
                    </div>
                    <span class="d-block fw-bold position-absolute country-note">Zoom in within country borders to place marker in certain region/street</span>
                  </div>
                  <div class="map-cont mt-5">
                    <div id="map" class="m-auto w-100"></div>
                  </div>
               </div>
               <div class="mb-3 d-none">
                <label for="pricePerDay" class="form-label">Price/Day</label>
                <input 
                  type="number"
                  class="form-control" 
                  v-model="d.pricePerDay" 
                  id="pricePerDay" 
                  aria-describedby="pricePerDayHelp"
                >
                <div id="pricePerDayHelp" class="form-text"></div>
              </div>
             </div>
        </div>


      </div>
      
      <div 
        class="tab-pane fade" 
        id="building-photos-tab" 
        role="tabpanel" 
        aria-labelledby="profile-tab"
      >
        <div class="input-group mb-3 mt-5">
          <label class="input-group-text fw-bold border-0 bg-transparent" for="buildingImageInput">Upload</label>
          <input 
            id="buildingImageInput"           
            type="file" 
            class="form-control"  
            :class="{'is-invalid': (invalids.imgs)?true:false}"   
            @change="imgUpload"
          >
          <div class="invalid-tooltip">{{invalids.imgs}}</div>
        </div>
        <div class="row gallery" ref="gallery">
          <div 
            class="col dashboard-building-thumb-slot"
            v-for="(photo, index) in d.imgs"
          >
            <div  
              class="m-auto p-1 mt-2 mb-2 d-flex justify-content-center align-items-center  dashboard dashboard-building-thumb" 
              :style="{'background-size':'cover','background-image':'url('+getPath(photo)+')'}"
            >
              <button 
                type="button" 
                class="btn-close p-2" 
                aria-label="delete-img"  
                @click="deleteBuildingImg(index)"
              ></button>            
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="building-availability-tab" role="tabpanel" aria-labelledby="profile-tab">

        <div style="max-width: 460px;margin: auto;">
          <div class="mt-5 mb-3">
            <div class="mt-3 m-auto" style="max-width: 200px;">
              <h6 class="mt-4 mb-4">Availability</h6>
              <div class="row">
                <div class="col-6">
                  <input 
                    name="isavailable" 
                    id="success-outlined" 
                    autocomplete="off" 
                    checked
                    type="radio" 
                    class="btn-check" 
                    v-model="isAvailable"  
                    @click="switchAvail"  
                    :value=true 
                  >
                  <label class="btn btn-outline-success" for="success-outlined">Available</label>
                </div>
                <div class="col-6">
                  <input 
                    name="isavailable" 
                    id="danger-outlined" 
                    autocomplete="off" 
                    type="radio" 
                    class="btn-check"  
                    v-model="isAvailable"  
                    @click="switchAvail"  
                    :value=false
                  >
                  <label class="btn btn-outline-danger" for="danger-outlined">Unavailable</label>
                </div>
              </div>
            </div>
            <div :style="{'opacity': !isAvailable?0.3:1}">
              <h6 class="mt-4 mb-4">You can choose available dates</h6>          
              <Datepicker 
                :disabled="!isAvailable?true:false" 
                v-model="dateValue" 
                multi-dates
                :enable-time-picker="false"
                :month-change-on-scroll="false" 
                _format="format"
              ></Datepicker>
            </div>
          </div>
        </div>

      </div>
      <div class="tab-pane fade" id="building-bundles-tab" role="tabpanel" aria-labelledby="contact-tab">        
        <h1 class="mt-5">  {{bundle.name}}  </h1>

        <div class="row">
          <div class="col">
            <div class="fw-bold">Fill bundle form</div>
            <div  class="bundle-cont mb-4">  
              <BuildingFormDataBundle             
                  @addBundle="addBundle"
                  :addbtn=true      
                  :removable=false   
                  @deleteBundle="deleteBundle" 
                  :bundleProps="bundle" 
              >
              </BuildingFormDataBundle> 
            </div>
          </div>
          <div class="col"
            v-for="(bundle, index) in d.bundles"
            :index="index"
            :key="bundle"
            >{{bundle.name||'Unnamed'}}

                    <div class="bundle-cont mb-4">
                        <BuildingFormDataBundle 
                          :invalids="invalids"
                          :index="index"
                          @addBundle="addBundle"                         
                          :addbtn=false
                          :removable=true 
                          @deleteBundle="deleteBundle"
                          @updateBundle="updateBundle" 
                          :bundleProps="bundle" >
                        </BuildingFormDataBundle> 
                    </div>  
          </div>
        </div>


      </div>
    </div>

    <div class="mb-3 d-none">
      <label for="region" class="form-label">Region (<span style="color:red">*</span>disabled for demo)</label>
      <input type="text" class="form-control" v-model="d.region" id="region" disabled>
    </div>


  </div>
</template>


<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


import BuildingFormDataBundle from './BuildingFormDataBundle.vue';



export default {
  name: 'BuildingFormData',
  components: {
    Datepicker,
    BuildingFormDataBundle
  },
  props: {
    formDataProp: {
      type: Object
    },
    invalids: {
      type: Object
    }
  },
  emits: ['formUpdated'],
  data() {
    return {
    //  invalids:{},
      isAvailable: false,
      currentBundle: {},
      css: '',
      dateValue: [],
      do: false,
      leaflet: null,
      countries: null,
      countrySelectedIndex: null,
      bundle: {
        name: null,
        dinner: false,
        breakfast: false,
        lunch: false,
        selfCatering: false,
        wifi: false,
        bundlePrice: null,
        days: null,
        dates: []
      },
      d: {
        username: "",
        buildingName: "",
        region: "",
        country: "",
        countryMapObj: "",
        rating: 1,
        map: {
          lat: null,
          lng: null
        },
        size: "",
        floor: "",
        rooms: "",
        pricePerDay: "",
        availability: "",
        imgs: [],
        bundles: []
      }
    }
  },

  updated(){
   this.$emit('formUpdated', {...this.d});
  },

  created(){
    this.countries = this.$store.state.countries.default;
  },

  mounted(){
    /* pass data for update using props */
    //this.dataPropSynch();

    this.initDefaultBundle();

    let THAT = this;
    let map = L.map('map');
    map.setView([51.505, -0.09], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.leaflet = map;

    function onMapClick(e) {
      let countryObjFound = THAT.findMapCountryName(e.latlng.lat, e.latlng.lng);
      if (countryObjFound && countryObjFound.index!= THAT.countrySelectedIndex) {
        THAT.countrySelectedIndex = countryObjFound.index;
      }
      THAT.d.map = {
        lat: e.latlng.lat, 
        lng: e.latlng.lng 
      };
      THAT.updateLeafMap(THAT.d.map);
	  }

	  this.leaflet.on('click', onMapClick);

  },
  computed: {
    hasInvalidsProperties(){
      if ( this.invalids && (this.invalids.size||this.invalids.floor||this.invalids.rooms||this.invalids.country)  ){
        return true;
      }
      return false;
    },
    hasInvalidsPhotos(){
      if ( this.invalids && (this.invalids.imgs)  ){
        return true;
      }
      return false;
    },
    hasInvalidsBundles(){
      if ( this.invalids && (this.invalids.bundles)  ){
        return true;
      }
      return false;
    }
  },
  watch: {

    'd.availability'(newValue, oldValue) {
      if (!newValue) {
        this.isAvailable = false;
      }
      if (newValue || Array.isArray(newValue) ) {
        this.isAvailable = true;
      }      
      
      if (!oldValue){
        /* track the first availability change after mount. */
        this.dateValue = this.d.availability;
      }
    },
    'formDataProp'(newValue, oldValue) {
      if ((newValue.id && oldValue && newValue.id!= oldValue.id)||!oldValue) {
       
        let key = this.getCountryIndexByName(newValue); 
        if(key){
          this.countrySelectedIndex =  key;
        }
        this.dataPropSynch();
      }
    },
    /*
    'countrySelectedIndex'(newValue, oldValue) { 
      if(newValue||newValue===0){
        let countryMapObj = this.countries[newValue];
        this.d.country = countryMapObj.long_name; 

        if (oldValue && this.d.map.lat && this.d.map.lng ) {
        
          this.d.map = {
            lat: countryMapObj.center_lat, 
            lng: countryMapObj.center_lng 
          };

        }
        this.updateLeafMap(this.d.map, true);
      }
    },
    */
    'dateValue'(newValue, oldValue){   
      if(!newValue){return;}   

      this.d.availability = newValue;   
      return; 
      /*
      let dateOrArray = newValue;
      let formatted = [];
      for(let m =0; m< dateOrArray.length; m++){
        let date = dateOrArray[m];
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let formattedDate =  day + '/' + month + '/' + year;
        formatted.push(formattedDate);
      }
      this.d.availability = formatted;
      */
    }
  },
  methods:{

    updateCountryIndex(ev){

      let newValue = ev.target.value;
      if(newValue||newValue===0) {
        let countryMapObj = this.countries[newValue];
        this.d.country = countryMapObj.long_name; 
       
          this.d.map = {
            lat: countryMapObj.center_lat, 
            lng: countryMapObj.center_lng 
          };

        this.updateLeafMap(this.d.map, true);
      }
    },

    getCountryIndexByName(formData){
      let len = this.countries.length;
      for (let i =0; i< len; i++) {
        if(this.countries[i].long_name=== formData.country){
          return i;
        }
      }
    },

    switchAvail(e){ 
      if(e.target.value ===true||e.target.value ==='true'){
        this.d.availability = true;
        this.d.availability = this.format(this.dateValue);
      }else {
        this.d.availability = false;
      }
      console.log(this.d.availability, this.d);
    },

    isValidHttpUrl(string) {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
    getPath(x){
      if (x.length>100 || /blob/i.test(x) || /base64/i.test(x) ){
        /* means it is  base64 or blob */
        return x;
      }
      /* means that img path is http */
      if ( this.isValidHttpUrl(x) ) {
        return x;
      }
      /* otherwise its a string path */
      if ( process.env.NODE_ENV === 'development' ) {  
        return new URL('./../../' + x, import.meta.url).href
      }else{
        return new URL('./../' + x, import.meta.url).href;
      }
    },

    dataPropSynch(){
      if(this.formDataProp) { 
        let d =  JSON.parse(JSON.stringify(this.formDataProp));
        this.d = d;
        this.initDefaultBundle();
        this.updateLeafMap(this.d.map, true);
      }

    },

    initDefaultBundle(){  
      let tempBundle = JSON.parse(JSON.stringify(this.bundle));
      tempBundle.emptyBundle = true;
    },

    format(dateOrArray) {

      let formater =  (date) => { 
        return date;
        /*
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return day + '/' + month + '/' + year;
        */
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

    deleteBuildingImg(index){
      this.d.imgs.splice(index, 1);
    },

    imgUpload(event){ 
      let THAT = this;
      let evTarget = event.target;
      if (evTarget.files && evTarget.files[0]) {
 
          let img = document.createElement('img');
          img.onload = () => {


            THAT.d.imgs.push(img.src);
        //      URL.revokeObjectURL(img.src);  // no longer needed, free memory



          }
          img.setAttribute('class', 'dashboard dashboard-building-thumb')

         img.src = URL.createObjectURL(evTarget.files[0]); // set src to blob url

          //let yyy = new URL('./../../' + img.src, import.meta.url).href;
          //this.d.imgs.push(yyy);
         //this.d.imgs.push(img.src);
      }

    },

    switchBundle(bundle){
     return;
    },

    addBundle(bundle){

      if (this.d.bundles.length>2) {
        alert('max 3');
        return;
      }

      let newBunble = JSON.parse(JSON.stringify(bundle));
      if (newBunble.emptyBundle) { 
        /* remove the temporary property emptyBundle. It was acting like empty form */
        delete newBunble.emptyBundle; 
      }
      this.d.bundles.push(newBunble);

    },

    deleteBundle(bundle, index){
      this.d.bundles.splice(index, 1);
    },

    updateBundle(bundle, index){
      this.d.bundles[index] = {...bundle};
     
    },


    findMapCountryName(lat, lng){
      let index=0;
      const normalizeDegrees = v => v < 0 ? 360 + v % 360 : v % 360;
      for (let countryObj of this.countries) {

         if ( countryObj.ne_lat  > lat 
            && countryObj.sw_lat < lat 
            && normalizeDegrees(lng - countryObj.sw_lng) < normalizeDegrees(countryObj.ne_lng - countryObj.sw_lng)
          )
         {
            return {countryObj: countryObj, index: index};
         }
         index++
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

  }  
}
</script>

<style scoped>


  .buildingFormData-component .country-note {
    animation: color-change 2s infinite;
    font-size: 10px;
    bottom: -20px;
    left: 0;
    right: 0;
    margin: auto;
  }
  
  @keyframes color-change {
    0% { color: #5a8d44; }
    50% { color: blue; }
    100% { color: #5a8d44; }
  }

  .buildingFormData-component label.buildingName {
    font-size: 17px;
    color: #144d62;
  }
  .buildingFormData-component input {
    text-align: center;
  }

  .buildingFormData-component :deep(#building-availability-tab .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad) {
    border-width: 1px;
    padding: 5px;
    text-align: center;
    padding-left: 40px;
    padding-right: 30px;
  }

  .buildingFormData-component .bundle-sum {
    border-radius: 20%;
    width: 25px;
    height: 25px;
    color: white;
    background-color: #5a8d44;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
  }
 

  .buildingFormData-component  .dashboard-building-thumb {
    width: 200px;
    height:  200px;
    background-position: center;
    background-size: cover;
  }
  .buildingFormData-component  img.dashboard-building-thumb {
    width: 200px;
    height: auto;
  }
  
  .buildingFormData-component  .dashboard-building-thumb >.btn-close {
    background-color: white;
    border-radius: 50%;
    color: black;
    opacity: 0.8;
  }   
  
  .buildingFormData-component   .has-invalids {
    color: red!important;
  }
  .buildingFormData-component   .has-invalids:after {
    content: '*';
  }

  .buildingFormData-component   .invalid-tooltip {
    z-index: 90000;
  }


  .buildingFormData-component   .bundle-cont{ 
    max-width: 350px; 
    min-width: 280px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 640px) {
    .buildingFormData-component   .nav-tabs .nav-link{
      padding: 8px;
      font-size: 14px;
    }
    .buildingFormData-component   .nav-tabs .nav-link.active{
      width: 100%;
      background-color: #f1f1f1!important;
      acolor: white!important;
    }
    .buildingFormData-component .bundle-cont{
      width: 100%;
      _min-width: 300px;
      border-bottom: 1px solid gray;
      margin-bottom: 50px;
    }
  }

  .buildingFormData-component #map{
    width: 450px;
    height: 367px!important;
  }
</style>
