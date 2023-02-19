

<template>
  <div 
    class="buildingFormDataBundle-component pt-2 pb-2" 
    :class={emptybundle:(!removable)?true:false}
  >

        <div class="mb-3">

          <div class="form-check align-items-center d-flex justify-content-center">
            <input 
              class="form-check-input" 
              type="checkbox"  
              :id="'flexCheckDefaultBreakfast'+index"
              v-model="bundle.breakfast"
              @change="updateBundle"
            ><label 
              class="form-check-label  ms-1" 
              :for="'flexCheckDefaultBreakfast'+index"
            >Breakfast</label>
          </div>

          <div class="form-check align-items-center d-flex justify-content-center">
            <input class="form-check-input" 
              type="checkbox" 
              :id="'flexCheckCheckedDinner'+index"
              v-model="bundle.dinner" 
              @change="updateBundle"
            checked>
            <label 
              class="form-check-label  ms-1" 
              :for="'flexCheckCheckedDinner'+index"
            >Dinner</label>
          </div>

          <div class="form-check align-items-center d-flex justify-content-center">
            <input class="form-check-input" 
              type="checkbox" 
              :id="'flexCheckCheckedLunch'+index"  
              v-model="bundle.lunch" 
              @change="updateBundle"
            checked>
            <label 
              class="form-check-label ms-1" 
              :for="'flexCheckCheckedLunch'+index"
            >Lunch</label>
          </div>


          <div class="form-check  align-items-center d-flex justify-content-center">
            <input class="form-check-input" 
              type="checkbox" 
              :id="'flexCheckCheckedSelfCatering'+index"   
              v-model="bundle.selfCatering" 
              @change="updateBundle"
            checked>
            <label 
              class="form-check-label  ms-1" 
              :for="'flexCheckCheckedSelfCatering'+index"
            >Self Catering</label>
          </div>

          <div class="form-check   align-items-center d-flex justify-content-center mb-3">
            <input class="form-check-input" 
              type="checkbox" 
              :id="'flexCheckCheckedWifi'+index"
              v-model="bundle.wifi" 
              @change="updateBundle"
            checked>
            <label 
              class="form-check-label  ms-1" 
              :for="'flexCheckCheckedWifi'+index"
            >wifi</label>
          </div> 

          <div class="input-group mb-3">
            <span class="input-group-text"   id="duration">Days</span>
            <input 
              type="number" 
              class="form-control text-center" 
              placeholder="Days" 
              aria-label="how many days" 
              aria-describedby="duration"  
              v-model="bundle.days" 
              @change="updateBundle"
            >
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Dates</span>
            <Datepicker 
              class="form-control text-center" 
              :enable-time-picker="false"
              @update:model-value="updateBundle"
              v-model="bundle.dates" 
              range>
            </Datepicker>
          </div>
          <div class="input-group mb-3">
            <span 
              class="input-group-text" 
              id="bundlePrice" 
              :class="{'is-invalid': hasInvalidBundle}" 
            >Bundle price</span>
            <input 
              placeholder="" 
              aria-label="BundlePrice" 
              aria-describedby="bundlePrice"
              type="text" 
              class="form-control text-center" 
              v-model="bundle.bundlePrice" 
              @change="updateBundle"
            >
            <div class="invalid-tooltip" v-if="hasInvalidBundle">
                      {{invalids.bundles.text}}
            </div>
          </div> 
          <div class="input-group mb-3">
            <span class="input-group-text" id="bundleName">Name</span>
            <input 
              placeholder="Summer Offer 2023" 
              aria-label="bundleName" 
              aria-describedby="bundle name"
              type="text" 
              class="form-control text-center" 
              v-model="bundle.name" 
              @change="updateBundle" 
            >
          </div>         
        </div> 
        <button 
          role="button" 
          class="btn btn-sm btn-primary m-1"  
          type="button" 
          v-if="addbtn==true"     
          @click="$emit('addBundle', this.bundle)"
        >Add</button>
        <button 
          role="button" 
          class="btn btn-sm btn-danger m-1"   
          type="button" 
          v-if="removable==true"      
          @click="$emit('deleteBundle', this.bundle, this.index)"
        >Delete</button>
      </div>


</template>

<script _setup _lang="ts">




import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



export default {
  name: 'BuildingFormDataBundle',
  components:{
    Datepicker
  },
  emits: [
    'addBundle', 
    'deleteBundle', 
    'updateBundle'
  ],
  props: {
    bundleProps:{
      type: Object
    }, 
    index:{
      type: Number
    },
    addbtn:{
      type: Boolean
    }, 
    removable:{
      type: Boolean    
    },
    invalids: {
      type: Object 
    }
  },
  data() {
    return {
      bundle: {}
    }
  },
  updated(){},
  mounted(){ 
    if(this.bundleProps) { 
      this.bundle = JSON.parse(JSON.stringify(this.bundleProps));
    }
  },
  computed: {
    hasInvalidBundle() {
      return this.invalids&&this.invalids.bundles&&this.invalids.bundles.key==this.index ? true:false;
    }
  },
  methods:{
    updateBundle(){ 
      let THAT= this;
      setTimeout(function(){
        THAT.$emit('updateBundle', THAT.bundle, THAT.index);
      },100);
      
    }
  }  
}
</script>

<style scoped>
  .buildingFormDataBundle-component .invalid-tooltip{
    z-index: 90000;
  }

  .buildingFormDataBundle-component .form-check label{
    cursor: pointer;
  }

  .buildingFormData-component .input-group-text{
    font-size: 14px;
  }

  .buildingFormDataBundle-component :deep(.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad) {
    border-width:0;
    padding-right: 0;
  }
  /* a style for bunlde template which acts like form */
  .buildingFormDataBundle-component.emptybundle{
    background:rgb(2,0,36);
    background: linear-gradient(180deg, rgb(245 244 255) 0%, rgba(191,191,255,1) 35%, rgba(255,255,255,1) 100%);
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
  }
</style>
