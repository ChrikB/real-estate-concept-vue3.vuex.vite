<template>
  <div class="building-search-criteria aw-50 m-auto">
    <form aclass="w-50 m-auto">
      <h6 v-if="criteria.assignTo" style="color:#2f6613;">{{getAssignedUser(criteria.assignTo)}}</h6>
      <div class="input-group  form-check-inline mb-3">
        <input 
          type="number" 
          min="0" 
          step="1"
          class="form-control" 
          placeholder="Floor" 
          aria-label="floor"
          v-model="criteria.floor" 
        >
      </div>
      <div class="input-group form-check-inline mb-3 align-items-center">
        <label class="form-check-label ms-2 me-2">Price</label>
        <input 
          type="number" 
          class="form-control" 
          placeholder="Min" 
          aria-label="price-min"
          v-model="criteria.pricePerDay.min" 
        >
        <input 
          type="number" 
          class="form-control" 
          placeholder="Max" 
          aria-label="price-max"
          v-model="criteria.pricePerDay.max"
        >
      </div>
      <div class="input-group form-check-inline mb-3 align-items-center">
        <label class="form-check-label ms-2 me-2">Size(Sq.M)</label>
        <input 
          placeholder="From" 
          aria-label="size-min"
          type="number" 
          class="form-control" 
          v-model="criteria.size.min" 
        >
        <input 
          placeholder="To" 
          aria-label="size-max"
          type="number" 
          class="form-control" 
          v-model="criteria.size.max" 
        >
      </div>   
      <div class="form-check  form-check-inline availability-check">
        
        <input 
          class="form-check-input"  
          type="checkbox" 
          value="" 
          id="flexCheckDefault"
          v-model="criteria.availability"
        >
        <label class="form-check-label" for="flexCheckDefault">Available <u>tomorrow</u></label>
      </div>   
    </form>
  </div>
</template>


<script>

export default {
  name: 'BuildingSearchCriteria',
  props: {
    buildingSearchCriteriaProp: {
      type: Object
    }
  },
  components: {},
  data() {

    return {
      defaults: null,
      criteria: {
        assignTo: null,
        name: null,
        country: null,
        floor: null,
        pricePerDay:{
          min: 0,
          max: 10000
        },
        size: {
          min: 0,
          max: 10000
        },
        availability: false
      }
    }
    
  },
  created() {

    this.defaults =  {
        assignTo: null,
        name: null,
        country: null,
        floor: null,
        pricePerDay: {
          min: 0,
          max: 10000
        },
        size: {
          min: 0,
          max: 10000
        },
        availability: false
      };
  },
  mounted(){
    this.synchPropsWithData();
    this.$emit('criteriaUpdated', {...this.criteria});
  },
  updated(){},
  methods:{
    convertBooleans(obj){

      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function conv(a){
        if(a==='true'){ return true;}
        if(a==='false'){ return  false;}
        if(a==='0'){ return  0;}
        if(a==='1'){ return  1;}
        if(isNumeric(a)) {
          return parseInt(a, 10); 
        }
        return a;
      };

      for (let d in this.defaults){
        if (obj.hasOwnProperty(d)) {
          if (d==='size'||d==='pricePerDay'){
            if (obj[d].min) {
              obj[d].min = conv(obj[d].min);
            }
            if (obj[d].max) {
              obj[d].max = conv(obj[d].max);
            }
          }else {           
            obj[d] = conv(obj[d]);
          }
        }
      }
      return obj;
    },

    synchPropsWithData(buildingSearchCriteriaProp){ 

      let propCrit;
      if (buildingSearchCriteriaProp) {
        propCrit = buildingSearchCriteriaProp;

      } else {
        propCrit = this.buildingSearchCriteriaProp;
      }   

      if (propCrit) {

        let converted = this.convertBooleans( propCrit );
        let crit = Object.assign(this.criteria, converted);
        this.criteria = crit;

      } else {
        this.criteria = {...this.defaults};
      }

    },

    getAssignedUser(assignTo){
      let u= this.$store.getters.getUser(assignTo); 
      if (u){
        return "Buildings by user: " + u.username;
      }
      return "";
    }

  },

  watch: {
    'criteria':{
      deep: true,
      handler(newVal, oldValue){
        this.$emit('criteriaUpdated', {...this.criteria});
      }
    },

    'buildingSearchCriteriaProp':{
      deep: true,
      handler(newVal, oldValue){ 
        let crit = "";  
        if (newVal) { 
          this.synchPropsWithData(newVal);
        } else {
          this.criteria = {...this.defaults};
        }
      }
    }
  }
}
</script>

<style scoped>

.building-search-criteria {
  width: 50%;
}

@media (max-width: 1100px) {
  .building-search-criteria {
      width: 80%;
  }
}
@media (max-width: 760px) {
  .building-search-criteria {
      width: 70%;
  }
}
@media (max-width: 580px) {
  .building-search-criteria {
      width: 100%;
    }
}


.building-search-criteria .availability-check>*{
  cursor: pointer;
}
</style>
