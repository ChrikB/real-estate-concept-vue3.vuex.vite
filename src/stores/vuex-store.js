import { createStore } from "vuex"

import * as Countries from './../assets/countries.json' 


/* since there is not serverside, lets put some basic validation for formdata here */
function validateUserData(formData, invalids){
  if(!formData.username){
    invalids.username = 'Username is required'; 
    return invalids;
  }   
  if( !formData.email){
    invalids.email = 'Email is required';
    return invalids; 
  }
  if( formData.phone && /[^0-9]/.test(formData.phone)){
    invalids.phone = 'Only numbers allowed'; 
    return invalids;
  }
  if( formData.profileName && /[^A-Za-z0-9_-]/.test(formData.profileName)){
    invalids.profileName = 'Invalid characters. Allowed only letters, numbers, underscores and hyphen '; 
    return invalids;
  }
  if( !formData.country){
    invalids.country = 'Country is required'; 
    return invalids;
  }
  if( formData.username && /[^A-Za-z0-9_-]/.test(formData.username)){
    invalids.username = 'Invalid characters. Allowed only letters, numbers, underscores and hyphen '; 
  }
  if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(formData.email)){
    invalids.email = 'Email is invalid'; 
  }
  return invalids;
}


function validateBuildingData(formData, invalids){

  if(!formData.buildingName){
    invalids.buildingName = 'Building Name is required'; 
    return invalids;
  }   

  if( formData.size || formData.size ===0 ){
    if(formData.size < 0){
      invalids.size = 'Size must be positive number'
      return invalids;
    }
  }
  else {
    invalids.size = 'Size is required' 
    return invalids;
  }

  if( formData.rooms || formData.rooms ===0 ){
    if(formData.rooms < 0){
      invalids.rooms = 'Rooms must be positive number'
      return invalids;
    }   
  }
  else{
    invalids.rooms = 'Rooms is required'
    return invalids;    
  }

  if( formData.floor  || formData.floor ===0 ){
  }else{
    invalids.floor = 'Floor is required' 
    return invalids;   
  }

  if( !formData.country){
    invalids.country = 'Country is required'; 
    return invalids;
  }

  if( !formData.pricePerDay){
    invalids.pricePerDay = 'Price is required'; 
    return invalids;
  }

  if( formData.pricePerDay  && formData.pricePerDay < 0 ){
    invalids.pricePerDay = 'Price can"t be negative number';
  }
  

  if(formData && formData.imgs && formData.imgs.length ===0 ){
    invalids.imgs = 'Put at least one photo'; 
  }
  if( formData.buildingName && /[^A-Za-z0-9_-\s]/.test(formData.buildingName)){
    invalids.buildingName = 'Invalid characters. Allowed only letters, numbers, underscores and hyphen '; 
    return invalids;
  }
  if( formData.buildingName && formData.buildingName.length < 5){
    invalids.buildingName = 'building name must have at least 4 characters'; 
  }
  if( formData.bundles){
    for(let m =0; m < formData.bundles.length; m++){
      if(!formData.bundles[m].bundlePrice || formData.bundles[m].bundlePrice==0){
        invalids.bundles = { key: m, text:'Price is required'}; 
        return invalids;
      }
    }    
  }  
  return invalids;
}




const store = createStore({
  plugins: [],
  state: {
    appDataLoading: true,
    countries: Countries,
    buildings: [],
    users: [],
  },
  mutations: {
    setData(state, httpRessponse){
      state.users = httpRessponse;
      console.log('USERS ARE', state.users);
      state.appDataLoading = false;
    },


    removeUser(state){

    },


    removeBuilding(state, formData){

    },


    addUser(state, formData){
       formData.id = state.users.length + 1;
       state.users.push(formData);
     },


    updateUser (state, formData) {
      let userObj = this.getters.getUser(formData.id);
      if (userObj){
        for (let i in formData) {
          if (i!='buildings'){
            userObj[i] = formData[i];
          }
        }
      }
    },
  

    addBuilding(state, payload){ 
      let userById = this.getters.getUser(payload.assignTo);
      if (userById){
        if(!userById.buildings){
          userById.buildings = [];
        }
      
        payload.formData.id = Date.now();/* lets use timestamp as id, since there is not database */

        payload.formData.assignTo = payload.assignTo;
        userById.buildings.push(payload.formData);
      }
      /* updateBuildingsArray */
      this.commit('updateBuildingsArray');
    },


    updateBuilding(state, payload){
   
      this.dispatch('getUserBuilding', payload.formData).then(_payload => {

        let getBuilding = _payload;
        let userBuilding = getBuilding.building;

        if (userBuilding){ 
          payload.formData.assignTo = payload.assignTo;
          let previousAssignTo = userBuilding.assignTo;
          for (let i in payload.formData) {
            userBuilding[i] = payload.formData[i];
          }
          if (previousAssignTo != payload.assignTo){
            /* remove building from current user and assign to another */
            state.users[ getBuilding.userArrayIndex ].buildings.splice(getBuilding.buildingArrayIndex, 1);
            let userObj = this.getters.getUser(payload.assignTo);
            if (userObj){
              userObj.buildings.push(userBuilding);
            }
          }

        }

      });




    },  


    updateBuildingsArray(state){
     let ALL_BUILDINGS = this.getters.getBuildings({});
     state.buildings = ALL_BUILDINGS;
    }  
  },

  actions: {


    getDataHTTP (context) {

      fetch('./../src/assets/data.json', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        context.commit("setData", result);
      })
      .catch((error) => {
       console.error('Error:', error);
      });

    },


    addUser(context, formData){
      let invalids = {};

      if(!formData){
        invalids.ALL = true;
        return invalids; 
      }

      invalids = validateUserData(formData, invalids);

      if ( Object.keys(invalids).length > 0 ){
        return invalids;
      }

      let exist = context.state.users.find(user => user.email === formData.email);
      if(exist) {
        invalids.email = 'Email exists already'; 
        return invalids;
      }
      exist = context.state.users.find(user => user.username === formData.username);
      if(exist) {
        invalids.username = 'Username exists already';
        return invalids;
      }

      context.commit('addUser', formData);

      return invalids;
    },


    updateUser(context, formData){
      let invalids = {};

      if(!formData){
        invalids.ALL = true;
        return invalids; 
      }

      invalids = validateUserData(formData, invalids);

      if ( Object.keys(invalids).length > 0 ){
        return invalids;
      }

      let exist = context.state.users.find(user => user.email === formData.email);  
      if(exist && exist.id!== formData.id ) {
        invalids.email = 'Email exists already'; 
        return invalids;
      }
      exist = context.state.users.find(user => user.username === formData.username);
      if(exist && exist.id!== formData.id ) {
        invalids.username = 'Username exists already';
        return invalids;
      }

      context.commit('updateUser', formData);

      return invalids;
    },  


    removeUser(context, formData){
      context.state.users.forEach(function(user, idx, arr){
        if(user.id === formData.id){ 
          arr.splice(idx, 1);
        }
      });
    }, 


    addBuilding(context, payload ){  
      let invalids = {};

      if(!payload.formData){
        invalids.ALL = true;
        return invalids; 
      }
  
      invalids = validateBuildingData(payload.formData, invalids);

      if ( Object.keys(invalids).length > 0 ){
        return invalids;
      }

      context.commit('addBuilding', payload);

      return invalids;
    },


    updateBuilding(context, payload){ 
      let invalids = {};

      if(!payload.formData){
        invalids.ALL = true;
        return invalids; 
      }

      invalids = validateBuildingData(payload.formData, invalids);

      if ( Object.keys(invalids).length > 0 ){
        return invalids;
      }
  
      context.commit('updateBuilding', payload);

      return invalids;
    },


    removeBuilding(context, payload){
      /* is assignTo is null, then remove building */
      context.commit('updateBuilding', payload);
    },


    getUserBuilding(context, formData){
      let state = context.state;
      for(let u=0; u < state.users.length; u++){
        let user = state.users[u];
        if(user.buildings){
          for(let b=0; b < user.buildings.length; b++){

            if(user.buildings[b].id === formData.id){   
              for (let i in formData) {
                state.users[u].buildings[b][i] = formData[i];
              }
              state.users[u].buildings[b] = JSON.parse(JSON.stringify(formData));


              return {
                user: state.users[u], 
                userArrayIndex: u, 
                buildingArrayIndex: b,
                building: state.users[u].buildings[b] 
              };
            }
          }
        }
      }
    }  
  },
  getters: {
    
    getUser: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },

    getBuilding: (state) => (id) => {
      return state.buildings.find(building => building.id === id)
    },

    getUsers: (state) => (criteria) => { 
      let users = [];
      for(let u=0; u < state.users.length; u++){
        let user = state.users[u];
        let getIt = true;

        if(!criteria){
          users.push(user);
        } else {

                        /* userid */
                        if(criteria.id && criteria.id >= 0 ){ 

                          if(user.id === criteria.id){
                          //  getIt = true;
                          }else{
                            getIt = false;
                          }

                        }

                        let criteriaAttrib = ['username','email','profileName','country','phone', 'role'];
                        for (let a=0; a< criteriaAttrib.length; a++){

                          const regex = new RegExp(criteria[ criteriaAttrib[a] ], 'gi');

                          if ( criteria[ criteriaAttrib[a] ] ){ 
                            if( 
                                  (criteria[ criteriaAttrib[a] ] === user[ criteriaAttrib[a] ]) || ( user[ criteriaAttrib[a] ] && user[ criteriaAttrib[a] ].toString().match(regex) )  
                              
                              ){

                            }else{
                              getIt = false;
                            }
                          }
                        }


                        if(getIt){
                          users.push(user);
                        }        
        }

      }

      return users;

    },
    getBuildings: (state) => (criteria) => {   
      let buildings = [];
   
      /* because there is no database for this demo, 
      I create an array with buildings. 
      Buildings will be scanned and extracted from each user object  
      */
      for(let u=0; u < state.users.length; u++){
        let user = state.users[u];
 
        if(user.buildings){

          if(!criteria){
 
            for(let b=0; b < user.buildings.length; b++){
              buildings.push(user.buildings[b]);
            }


          } else {

            for(let b=0; b < user.buildings.length; b++){
              let building = user.buildings[b];
              let getIt = true;

              /* assignTo */
              if(criteria.assignTo && criteria.assignTo >= 0 ){ 
                if(building.assignTo === criteria.assignTo){
                //  getIt = true;
                }else{
                  getIt = false;
                }

              }

              /* buildingId */
              if(criteria.buildingId && criteria.buildingId >= 0 ){ 
                if(building.id === criteria.buildingId){
                //  getIt = true;
                }else{
                  getIt = false;
                }

              }

              /* floor */
              if(criteria.floor || parseInt(criteria.floor,10) >= 0 ){ 
                if(building.floor === criteria.floor){
                //  getIt = true;
                }else{
                  getIt = false;
                }

              }

              /* country */
              if(criteria.country){
                if( building.country === criteria.country ){
              //    getIt = true;
                }else{
                  getIt = false;
                }

              }

              /* min price */
              if(criteria.pricePerDay && criteria.pricePerDay.min  && criteria.pricePerDay.min >=0){
                if(building.pricePerDay && building.pricePerDay> criteria.pricePerDay.min){
             //     getIt = true;
                }else{
                  getIt = false;
                }

              }
              /* max price */
              if(criteria.pricePerDay && criteria.pricePerDay.max  &&criteria.pricePerDay.max >=0){
                if(building.pricePerDay && building.pricePerDay <= criteria.pricePerDay.max){
              //    getIt = true;
                }else{
                  getIt = false;
                }

              }

              /* min size */
              if(criteria.size &&  criteria.size.min && criteria.size.min >=0){
                if(building.size && building.size >= criteria.size.min){
              //    getIt = true;
                }else{
                  getIt = false;
                }

              }   
              /* max size */
              if(criteria.size && criteria.size.max && criteria.size.max >=0){
                if(building.size && building.size <= criteria.size.max){
            //      getIt = true;
                }else{
                  getIt = false;
                }

              }           
              /* availability */
              if(criteria.availability){
                
                const today = new Date();
                let tomorrow =  new Date();
                tomorrow.setDate(today.getDate() + 1);

                if( criteria.availability === building.availability 
                  || (Array.isArray(building.availability) && building.availability.length==0)  
                  || (Array.isArray(building.availability) && building.availability.includes(tomorrow))   
                ){
            //      getIt = true;
                }else {
                  getIt = false;
                }

              }

              
              if(getIt){
                buildings.push(building);
              }          
            }           
          }
        }
      }
      return buildings;
    }
  }
})

export default store
