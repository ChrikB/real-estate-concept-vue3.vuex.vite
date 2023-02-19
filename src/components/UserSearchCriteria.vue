<template>
  <div class="user-search-criteria m-auto">
    <form>
      <div class="input-group  form-check-inline align-items-center mb-3" id="_username">
        <label class="form-check-label ms-2 me-2" for="_username">Username</label>
        <input 
          type="text"  
          placeholder="Username" 
          aria-label="Username" 
          class="form-control"  
          v-model="criteria.username"
        >
      </div>  
      <div class="input-group  form-check-inline align-items-center mb-3"  id="_email">
        <label class="form-check-label ms-2 me-2" for="_email">Email</label>
        <input  
          placeholder="Email" 
          aria-label="Email" 
          type="text" 
          class="form-control"  
          v-model="criteria.email"
        >
      </div> 
      <div class="input-group  form-check-inline align-items-center mb-3" id="_phone">
        <label class="form-check-label ms-2 me-2" for="_phone">Phone</label>
        <input 
          type="number" 
          class="form-control" 
          v-model="criteria.phone" 
          placeholder="Phone" 
          aria-label="Phone"
        >
      </div> 
      <div class="input-group  form-check-inline align-items-center mb-3"  id="_country">
        <label class="form-check-label ms-2 me-2" for="_country">Country</label>
        <select 
          class="form-select form-control" 
          v-model="countrySelectedIndex"  
          aria-label="Default select example" 
          id="exampleCheck1"
          >
            <option  value="-1">Everywhere</option>    
            <option  
              v-for="(option, index) in countries" 
              :key="index"  
              :value="index" 
            >{{option.long_name}}</option>     
        </select>
      </div> 
      <div class="input-group  form-check-inline align-items-center mb-3" id="_profileName">
        <label class="form-check-label ms-2 me-2" for="_profileName">Profile Name</label>
        <input 
          placeholder="profileName" 
          aria-label="profileName"
          type="text" 
          class="form-control" 
          v-model="criteria.profileName"
        >
      </div>       
      <div class="input-group  form-check-inline align-items-center  mb-3">
        <label class="form-check-label ms-2 me-2">Role</label>
        <select 
          class="form-select form-control" 
          aria-label="Default select example" 
          id="role" 
          v-model="criteria.role"
        >     
          <option :value="1">Admin</option>
          <option :value="2">User</option>
          <option :value=null>All</option>
        </select>
      </div>        
    </form>
  </div>
</template>


<script>

export default {
  name: 'UserSearchCriteria',
  props: {
    userSearchCriteria: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      countrySelectedIndex: null,
      countries: [],
      defaults: {},
      criteria: {
        username: null,
        email:null,
        phone: null,
        country:null,
        profileName: null,
        role: null
      }
    }
  },
  created() {

    this.countries = this.$store.state.countries.default;

    this.defaults =  {
      username: null,
      email:null,
      phone: null,
      country:null,
      profileName: null,
      role: null
    };
  },
  mounted() {

    this.synchPropsWithData();
    this.$emit('criteriaUpdated', {...this.criteria});
  },


  methods: {

    synchPropsWithData(userSearchCriteriaProp){

      let propCrit;
      if (userSearchCriteriaProp){
        propCrit = userSearchCriteriaProp;

      }else {
        propCrit = this.userSearchCriteriaProp;
      }

      if (propCrit) {
        let crit = Object.assign(this.criteria, JSON.parse(propCrit));
        this.criteria = crit;

      } else {
        this.criteria = {...this.defaults};
      }
    }
  },
  watch: {
    
    'countrySelectedIndex'(newValue, oldValue) {
      if(newValue||newValue===0){
        let countryMapObj = this.countries[newValue];
        if (countryMapObj) {
          this.criteria.country = countryMapObj.long_name;
          return;
        }
      }
      this.criteria.country = null;
    },

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

.user-search-criteria {
  width: 50%;
}

@media (max-width: 1100px) {
  .user-search-criteria{
      width: 80%;
  }
}
@media (max-width: 760px) {
  .user-search-criteria{
      width: 70%;
  }
}
@media (max-width: 580px) {
  .user-search-criteria{
      width: 100%;
  }
}
</style>
