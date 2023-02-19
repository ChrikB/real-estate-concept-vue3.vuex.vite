<template>
  <section class="user-add  mb-4 mt-4 m-auto">
    <UserFormUpdate :userDataProp="userData"/>
  </section>
</template>



<script>

import UserFormUpdate from './../components/UserFormUpdate.vue' 

export default {

  name: 'UserFormUpdateView',
  components: {
    UserFormUpdate
  },
  props: {
    criteria: {}
  },
  data() {
    return {
      userData: null,
      initialLoad: false
    }
  },
  methods: {

    doSearch(){ 
      let criteria;
      let userId =  parseInt(this.$route.params.id, 10) ;
      if (userId && userId >=0){
       criteria = {id: userId}; //alert('buildingId AAA is ' + buildingId )
      }else { //alert('buildingId is ' + buildingId )
        this.userData = null;
        return;
      }
      let usersFound = this.$store.getters.getUsers(criteria); // alert('doSearch LENGHT'+ buildingsFound.length);
      if (usersFound.length>0) {
        this.userData = usersFound[0];   // alert('doSearch' + this.building.id);
      }
      console.log('usersFound_', usersFound);
    }
  },
  mounted(){
    this.doSearch();
  },
  watch: {
    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal) { 
 
        if (this.initialLoad === false && newVal=== false){ 
          this.doSearch();
          this.initialLoad = true;
          console.log('appDataLoading changed', newVal);
        }
      }
    }
  }  

}
</script>

<style>
  section.user-add {
    width: 50%;
    max-width: 450px;
  }
  @media (max-width: 767.98px) {
    section.user-add {
      width: 90%;
    }
  }
</style>
