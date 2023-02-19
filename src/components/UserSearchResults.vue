<template>
  <div class="user-search-results">
    <div class="row">    
      <UserSearchResult 
        v-for="(userSearchResult, index) in userSearchResults" 
        :userSearchResult="userSearchResult" 
        :index="index"
        :key="userSearchResult.id"  
      />
    </div>
  </div>
</template>



<script>
import UserSearchResult from './../components/UserSearchResult.vue';

export default {
  name: 'UserSearchResults',
  props: {
    userSearchResultsProp: {
      type: Array
    }
  },
  components: {
    UserSearchResult
  },
  data() {
    return {
      userSearchResults: []
    }
  },
  updated(){
    if (this.userSearchResultsProp){
        this.userSearchResults = this.userSearchResultsProp;
     }
  },
  mounted() {
     if (this.userSearchResultsProp){
        this.userSearchResults = this.userSearchResultsProp;
     } 
  }, 
}
</script>


<style scoped>

</style>
