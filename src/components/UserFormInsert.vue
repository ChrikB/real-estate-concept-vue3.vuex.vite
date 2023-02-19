<template>
  <form class="UserFormInsert-component">
    <UserFormData 
      @form-updated="onFormDataUpdated" 
      :invalids="invalids"
    />
    <button 
      type="button" 
      class="btn btn-primary" 
      @click="add()"
    >Add</button>
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

import UserFormData from './../components/UserFormData.vue' 



export default {
  name: 'UserFormInsert',
  components: {
    UserFormData
  },
  data() {
    return {
      lastEntryEmail: null,
      invalids: {},
      formData: null
    }
  },
  methods: {

    add(){ 

        this.$store.dispatch('addUser',this.formData).then(payload => {
 
          if (!payload.ALL) {

            this.invalids = payload;

            if (Object.keys(payload).length ===0) {
              this.$refs.modalBody.innerHTML = "Entry inserted successfully";
              this.$refs.modalbtn.click();
              this.$refs.lastentry.innerHTML = 'Last entry : ' + this.formData.email;
              this.lastEntryEmail = this.formData.email;
            }

          } else {
            this.$refs.modalBody.innerHTML = "Form cannot be empty";
            this.$refs.modalbtn.click();
          }

        });
    },

    onFormDataUpdated(formData){

      this.formData = formData; 

      if (this.formData.email != this.lastEntryEmail) {
        this.$refs.lastentry.innerHTML = "";
      }     
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
