<template>
  <form class="BuildingFormInsert-component">
    <BuildingFormData 
      @form-updated="onFormDataUpdated" 
      :invalids="invalids"
    />
    <div class="m-auto w-25 pt-2 pb-4" style="min-width:200px;">
      <label class="form-label fw-bold">Assing Building To</label>
      <select  
        class="form-select  text-center"  
        v-model="assignTo"
      >
        <option 
          v-for="user in this.$store.getters.getUsers()" 
          :value="user.id"
        >{{user.username}}</option>

      </select>
    </div>
    <button 
      type="button" 
      class="btn btn-primary" 
      @click="add()"
    >Save Building Entry</button>
    <div class="lastentry" ref="lastentry"></div>
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
  name: 'BuildingFormInsert',
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
    add(){
  
      this.$store.dispatch('addBuilding', {
        formData: this.formData, 
        assignTo: this.assignTo
      }).then(payload => {

          if (!payload.ALL) { 

            this.invalids = payload; 

            if (Object.keys(payload).length ===0) {
              this.$refs.modalBody.innerHTML = "Entry inserted successfully";
              this.$refs.modalbtn.click();
              this.$refs.lastentry.innerHTML = 'Last entry : ' + this.formData.buildingName;
              this.lastEntryBuildingName = this.formData.buildingName;
            }
            
          }else{
            this.$refs.modalBody.innerHTML = "Form cannot be empty";
            this.$refs.modalbtn.click();
          }

      });
    
    },

    onFormDataUpdated(formData){
      this.formData = formData;
      if (this.formData.buildingName != this.lastEntryBuildingName) {
        this.$refs.lastentry.innerHTML = "";
      }
    }
  }
}
</script>

<style scoped>
  .BuildingFormInsert-component {
    padding: 15px;
    border: 1px solid #b7a9a9;
    border-radius: 12px;
  }   
</style>