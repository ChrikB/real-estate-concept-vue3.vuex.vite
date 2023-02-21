<template>
  <section class="users p-1 p-md-4 pt-0">
    <div  class="product-list-view">
      <h5 class="mt-3 mb-3">
        <u class="p-2">Search Users</u>
      </h5>
    </div>
    <div class="search-criteria-container">
      <UserSearchCriteria @criteriaUpdated="updateCriteria" :userSearchCriteriaProp="criteriaProp" />
    </div>
    <div>
      <h5 class="mb-4 mt-4 h-title">Results</h5>
      <div class="row">
        <div class="col-12">
           <UserSearchResults :userSearchResultsProp="users"/>
        </div>
      </div>
    </div>
  </section>
</template>



<script>

import UserSearchResults from './../components/UserSearchResults.vue' 
import UserSearchCriteria from './../components/UserSearchCriteria.vue' 

export default {

  name: 'UserSearchResultsView',
  components: {
    UserSearchResults,
    UserSearchCriteria
  },
  props: {
    criteriaProp: null
  },
  data() {
    return {
      initialLoad: false,
      criteria:{},
      users:[]
    }
  },
  methods: {
    updateCriteria(criteria){  
      this.criteria = criteria;
      this.doSearch();
    },
    doSearch(criteria){ 
      if(!criteria){
        criteria = this.criteria;
      }

      let usersFound = this.$store.getters.getUsers(criteria);
      this.users = usersFound;
    }
  },
  watch: {
    '$store.state.users': {
      deep: true,
      handler(newVal) {
        let usersFound = this.$store.getters.getUsers(this.criteria);
        this.users = usersFound;
      }
    },
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
