

<template>
  <div class="userFormData-component">

    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input 
        id="username" 
        aria-describedby="usernameHelp"
        type="text" 
        class="form-control" 
        :class="{ 'is-invalid': isInvalid('username')}" 
        v-model="d.username" 
        required
      >
      <div class="invalid-tooltip" v-if="invalids.username">
        {{invalids.username}}
      </div>
      <div id="usernameHelp" class="form-text"></div>
    </div>

    <div class="mb-3">
      <label for="exampleInputEmail" class="form-label">Email address</label>
      <input 
        id="exampleInputEmail" 
        aria-describedby="emailHelp"
        type="email" 
        class="form-control" 
        :class="{ 'is-invalid':  isInvalid('email')}" 
        v-model="d.email"
      >
      <div class="invalid-tooltip" v-if="invalids.email">
        {{invalids.email}}
      </div>
      <div id="emailHelp" class="form-text"></div>
    </div>

    <div class="mb-3">
      <label for="inputPassword" class="form-label">Password (<span style="color:red">*</span>disabled for demo)</label>
      <input 
        id="inputPassword"
        type="password" 
        class="form-control" 
        v-model="d.password" 
        disabled>
    </div>

    <div class="mb-3">
      <label for="inputPhone" class="form-label">Phone</label>
      <input 
        placeholder="" 
        id="inputPhone" 
        aria-describedby="phoneHelp"
        type="number" 
        class="form-control"  
        :class="{ 'is-invalid': isInvalid('phone')}"  
        v-model="d.phone"
      >
      <div class="invalid-tooltip" v-if="invalids.phone">
        {{invalids.phone}}
      </div>
      <div id="phoneHelp" class="form-text"></div>
    </div>    

    <div class="mb-3">
      <label for="country" class="form-label">Country</label>
      <input type="text" class="form-control d-none" __v-model="d.country"  id="country" aria-describedby="countryHelp">
      
      <select 
        aria-label="Default select everywhere" 
        id="country"
        class="form-select form-control"  
        :class="{ 'is-invalid': isInvalid('country')}"   
        v-model="d.country"
        >

        <option  
          v-for="(option, index) in countries" 
          Zvalue="index"  
          :value="option.long_name" 
        >{{option.long_name}}</option>    

      </select>

      <div class="invalid-tooltip" v-if="invalids.country">
        {{invalids.country}}
      </div>
      <div id="countryHelp" class="form-text"></div>
    </div>   

    <div class="mb-3">
      <label for="profileName" class="form-label">Profile Name (visible to others)</label>
      <input 
        id="profileName" 
        aria-describedby="profileNameHelp"
        type="text" 
        class="form-control" 
        :class="{'is-invalid': isInvalid('profileName')}" 
        v-model="d.profileName"
      >
      <div class="invalid-tooltip" v-if="invalids.profileName">
        {{invalids.profileName}}
      </div>
      <div id="profileNameHelp" class="form-text"></div>
    </div> 

    <div class="mb-3 d-none">
      <label for="profileAvatar" class="form-label">Profile Avatar (visible to others)</label>
      <input type="text" class="form-control" id="profileAvatar" aria-describedby="profileAvatarHelp">
      <div id="profileAvatarHelp" class="form-text"></div>
    </div>
    <div style="margin-top: 1.9rem;"><hr class="bg-dark border-2 border-top border-dark"></div>       
    <div class="mb-3">
      <label class="form-label" for="role">Role</label>
      <select 
        aria-label="Default select user" 
        id="role"
        class="form-select form-control"  
        v-model="d.role"
        >     
        <option value="1">Admin</option>
        <option value="2">User</option>
      </select>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserFormData',
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
      countries: null,
      d: {
        username: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        profileName: "",
        profileAvatar: "",
        role: 2
      }
    }
  },
  updated(){
    
    this.$emit('formUpdated', {...this.d})
  },
  created(){
    this.countries = this.$store.state.countries.default;
  },
  methods:{
    dataPropSynch(){
      if(this.formDataProp) { 
        let d =  JSON.parse(JSON.stringify(this.formDataProp));
        this.d = d;
      }
    },

    isInvalid(dProp){    
      if( this.invalids && this.invalids.hasOwnProperty(dProp) ){
        return true;
      }
      return false;
    }
  },
  watch:{
    'formDataProp'(newValue, oldValue) {
      if ((newValue.id && oldValue && newValue.id!= oldValue.id)||!oldValue) {
        this.dataPropSynch();
      }
    }
  }
}
</script>

<style scoped>
.userFormData-component input,
.userFormData-component select {
  text-align: center;
}
</style>
