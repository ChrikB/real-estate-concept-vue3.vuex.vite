

<template>
  <div 
    class="col-12 col-sm-6 col-md-4 col-lg-3  mb-4" 
    v-if="userSearchResult"
  >            
    <div class="userSearchResult-component pt-3 pb-3">
      <div class="position-relative">
        <svg  
          @click="removeUser()" 
          style="right:5%;top:5%;" 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          class="bi bi-x-lg position-absolute" 
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>

        <svg 
          @click="$router.push({ path: '/user/' + userSearchResult.id })" 
          style="left:5%;top:5%;"  
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          class="bi bi-pencil-square position-absolute" 
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>

      </div>

      <div data-user="username" class="user-username">
        <div class="fw-bold">Username</div>
        <span>{{userSearchResult.username}}</span>
      </div>

      <div data-user="email" class="user-email">
        <div class="fw-bold">Email</div>
        <span>{{userSearchResult.email}}</span>
      </div>

      <div data-user="phone" class="user-phone">
        <div class="fw-bold">Phone</div>
        <span>{{(userSearchResult.phone)?userSearchResult.phone:'-'}}</span>
      </div>

      <div data-user="profileName" class="user-profileName">
        <div class="fw-bold">ProfileName</div>
        <span>{{(userSearchResult.profileName)?userSearchResult.profileName:'-'}}</span>
      </div>

      <div data-user="country" class="user-country">
        <div class="fw-bold d-inline-block me-2">Country</div>
        <span>{{userSearchResult.country}}</span>
      </div> 

      <div data-user="role" class="user-role">
        <div class="fw-bold d-inline-block me-2">Role</div>
        <span>{{([1,'1'].includes(userSearchResult.role))?'admin':'user'}}</span>
      </div>
      
      <div data-user="userBuildings"    class="user-buildings">
        <div class="fw-bold d-inline-block me-2">
          <button 
            @click="getUserBuildings()" 
            class="btn btn-sm btn-secondary"
          >Buildings : {{(userSearchResult.buildings?userSearchResult.buildings.length:0)}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'UserSearchResult',
  components: {},
  props: {
    userData: {
      type: Object
    },
    userSearchResult: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {}
  },
  methods: {

    getUserBuildings(){
     // let _path = '/buildings?params%5Bavailability%5D=false&params%5BassignTo%5D='+this.userSearchResult.id;
      let assignTo = this.userSearchResult.id;
      this.$router.push( `/buildings?params%5BassignTo%5D=${assignTo}` );
    },

    removeUser(){
      if(this.userSearchResult && this.userSearchResult.id){
        this.$store.dispatch('removeUser', this.userSearchResult);
      }
    }

  }  
}
</script>


<style scoped>

  .userSearchResult-component {
    box-shadow: 1px 4px 10px 10px #00000021;
    border-radius: 10px;
  }

  .userSearchResult-component input,
  .userSearchResult-component span {
    color: #016887;
    text-align: center;
    border:0;
  }



  .userSearchResult-component .user-buildings {
    padding: 5px;
    border-radius: 10px;
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
  }

  .userSearchResult-component .user-role input,
  .userSearchResult-component .user-country input{
    width: 60px;
  }


  .bi-x-lg{
    fill: red;
  }
  .bi-pencil-square{
    fill: green;
  }
  .bi-x-lg,
  .bi-pencil-square{
    cursor:pointer;
    z-index: 300;
  }
  .bi-x-lg,
  .bi-pencil-square:hover{  }
</style>

