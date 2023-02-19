<template>
  <form class="BuildingFormUpdate-component">
    <BuildingFormData 
      __form-updated="onFormDataUpdated"  
      ref="buildingformDataRef" 
      :formDataProp="formData"  
      :invalids="invalids"
    />
    <div class="m-auto w-25 pt-2 pb-4" style="min-width:200px;">
      <label class="form-label fw-bold">Assing Building To</label>
      <select  
        class="form-select text-center"  
        v-model="assignTo"
      >
        <option 
          v-for="user in this.$store.getters.getUsers()" 
          :value="user.id"
        >
          {{user.username}}
        </option>
      </select>
    </div>
    <button 
      type="button" 
      class="btn btn-primary m-1"
      @click="update()"
    >Update</button>
    <button 
      class="btn btn-danger m-1"
      type="button" 
      @click="remove()"
    >Delete</button>
  </form>

  <button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" ref="modalbtn" data-bs-target="#feedbackModal"></button>
  <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header d-none">
          <h5 class="modal-title" id="feedbackModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" ref="modalBody">Saved</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>

import BuildingFormData from './../components/BuildingFormData.vue'  

export default {
  name: 'UserFormUpdate',
  props:["buildingDataProp"],
  components:{
    BuildingFormData
  },
  data() {
    return {
      invalids:{},
      formData: null,
      assignTo: 1
    }
  },
  methods:{
    remove(){
      this.formData = {...this.$refs.buildingformDataRef.d}; 
      this.$store.dispatch('removeBuilding',{
        formData: this.formData, 
        assignTo: null 
      }).then(payload => {
        let x = document.getElementById('buildings-link');
        x.click();
      });
    },
    update(){

     this.formData = {...this.$refs.buildingformDataRef.d};       

     this.$store.dispatch('updateBuilding',{
      formData: this.formData, 
      assignTo: this.assignTo
    }).then(payload => {

          if (!payload.ALL) { 

            this.invalids = payload;

            if (Object.keys(payload).length === 0) {
              this.$refs.modalBody.innerHTML = "Entry updated successfully";
              this.$refs.modalbtn.click();
            }

          } else {
            this.$refs.modalBody.innerHTML = "Form cannot be empty";
            this.$refs.modalbtn.click();
          }
        });

    },
    onFormDataUpdated(formData){
      this.formData = formData;
    }
  },
  watch: {
    
    'buildingDataProp'(newValue, oldValue) {
      this.formData = newValue;
      this.assignTo = this.formData.assignTo;
    }
    
  },
  mounted(){
    if (this.buildingDataProp){
      this.formData = this.buildingDataProp;
    }
  }
}
</script>

<style scoped>
.UserFormInsert-component {
    padding: 15px;
    border: 1px solid #b7a9a9;
    border-radius: 12px;
}   
</style>