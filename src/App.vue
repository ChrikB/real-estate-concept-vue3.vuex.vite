

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <div  class="container-fluid overflow-hidden">
    <div class="row vh-100 overflow-auto">
      <div id="nav" class="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
        <div class="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
          <ul 
            :if="appDataLoading===false" 
            class="mt-md-5 nav nav-pills  flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
          >

            <li class="nav_item"><router-link to="/about">About</router-link></li>
            <li class="nav_item dropdown  d-sm-none">

                <router-link 
                  to="/users/" 
                  class="nav-link dropdown-toggle px-sm-0 px-1" 
                  id="dropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >Users</router-link>

                <ul  class="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li  class="list-group-item ps-1">
                    <router-link to="/users">All Users</router-link>
                  </li>
                  <li  class="list-group-item ps-1">
                    <router-link to="/uadd">Add User</router-link>
                  </li>
                </ul>
            </li>



            <li class="nav_item dropdown d-sm-none">

                <router-link 
                  to="/buildings" 
                  class="nav-link dropdown-toggle px-sm-0 px-1" 
                  id="dropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >Buildings</router-link>

                <ul  class="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li  class="list-group-item ps-1">
                    <router-link to="/buildings">All Buildings</router-link>
                  </li>                    
                  <li  class="list-group-item ps-1">
                    <router-link to="/building/add">Add building</router-link>
                  </li>
                  <li  class="list-group-item ps-1">
                    <router-link to='/buildings?params%5BassignTo%5D=&params%5Bname%5D=&params%5Bcountry%5D=&params%5Bfloor%5D=&params%5BpricePerDay%5D%5Bmin%5D=0&params%5BpricePerDay%5D%5Bmax%5D=10000&params%5Bsize%5D%5Bmin%5D=0&params%5Bsize%5D%5Bmax%5D=10000&params%5Bavailability%5D=false'>Find building</router-link>
                  </li>
                </ul>

            </li>

            <li class="nav_item  	d-none d-md-block d-xl-block d-xxl-block" >
              <router-link to="/buildings">Buildings</router-link>
              <ul  class="list-group">
                <li class="list-group-item  pb-0">
                  <router-link to="/building/add">Add building</router-link>
                </li> 
                <li class="list-group-item  pb-0">
                  <router-link id="buildings-link" to='/buildings?params%5BassignTo%5D=&params%5Bname%5D=&params%5Bcountry%5D=&params%5Bfloor%5D=&params%5BpricePerDay%5D%5Bmin%5D=0&params%5BpricePerDay%5D%5Bmax%5D=10000&params%5Bsize%5D%5Bmin%5D=0&params%5Bsize%5D%5Bmax%5D=10000&params%5Bavailability%5D=false'>Find building</router-link>
                </li>
              </ul>
            </li>
            <li class="nav_item 	d-none d-md-block d-xl-block d-xxl-block" >
              <router-link to="/users">Users</router-link>
              <ul  class="list-group">
                <li  class="list-group-item  pb-0">
                  <router-link to="/uadd">Add User</router-link>
                </li>
              </ul>
            </li> 
            <li class="nav_item"><router-link to="/extract">Export</router-link></li>
            <li class="nav_item"><router-link to="/stats">Stats</router-link></li>            
          </ul>
        </div>
  
      </div>
      <div class="col d-flex flex-column h-sm-100">
        <h2 class="mt-5 mb-3">ADMIN DASHBOARD</h2>
        <router-view />
      </div>
    </div>
  </div>

</template>


<script>

import qs from 'qs';

export default {
  name: 'App',
  components: {},
  mounted() { 
    this.$store.dispatch('getDataHTTP');
  },
  methods: {},
  data(){
    return{
      appDataLoading: true              
    } 
  },
  computed: {
    appDataLoading () {
      return this.$store.state.appDataLoading;
    }
  },
  watch: {
    '$store.state.appDataLoading': {
      deep: true,
      handler(newVal) {
        console.log('appDataLoading changed', newVal);
      }
    }
  }
};
</script>


<style scoped>

  a,
  router-link{
    display:block;
  }
  @media (min-width: 576px) {
    .h-sm-100 {
        aheight: 100%;
    }
  }
  .container-fluid{
    background:white;
    color:black!important;
    font-family: 'Montserrat', sans-serif;
  }

  #nav{
    background:red;
    left: 0;
    top: 0;
    color:white;
  }
  #nav ul{
    list-style-type:none;
    text-align:left;
  }
  #nav ul li{
    background: rgba(255,255,255,0.9);
    background: rgba(255,255,255,0);
  }

  .nav.nav-pills>li{
    margin-bottom: 15px;
    margin-right: 15px;
    margin-left:15px;
    font-size: 16px;
  }
  #nav ul li>a{
    color: white;
    text-decoration: none;
  }



  @media (max-width: 300px) {
    #nav ul li {
      margin-left: 5px;
      margin-right: 5px;
    }
  }

  @media (max-width: 580px) {
    #nav .nav.nav-pills {
      flex-wrap: wrap!important;
    }
 }
</style>
