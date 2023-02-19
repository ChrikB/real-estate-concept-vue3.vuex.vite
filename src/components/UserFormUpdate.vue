<template>
  <form class="UserFormUpdate-component">
    <UserFormData 
      _form-updated="onFormDataUpdated" 
      ref="formDataRef" 
      :formDataProp="formData" 
      :invalids="invalids"
    />
    <button 
      class="btn btn-primary"
      type="button" 
      @click="update()" 
    >Update</button>
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
  name: 'UserFormUpdate',
  props: {
    userDataProp: {
      type: Object
    }
  },
  components:{
    UserFormData
  },
  data() {
    return {
      invalids: {},
      formData: null
    }
  },
  methods:{
    
    update(){

      this.formData = {...this.$refs.formDataRef.d}; 

      this.$store.dispatch('updateUser',this.formData).then(payload => {
  
          if (!payload.ALL) {

            this.invalids = payload;

            if (Object.keys(payload).length ===0) {
              this.$refs.modalBody.innerHTML = "User updated successfully";
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
  mounted(){
    if (this.userDataProp){ 
      this.formData = this.userDataProp;
    }
  },

  watch: {
    
    'userDataProp'(newValue, oldValue) {
      this.formData = newValue;
    }
    
  }


}
</script>

<style scoped>
.UserFormUpdate-component {
    padding: 15px;
    border: 1px solid #b7a9a9;
    border-radius: 12px;
}   
</style>