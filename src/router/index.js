
import{createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import About from '../views/AboutView.vue'

import UserSearchResultsView from '../views/UsersSearchView.vue'
import UserFormInsertView from '../views/UserInsertAdd.vue'
import UserFormUpdateView from '../views/UserUpdateView.vue'

import BuildingSearchResultsView from '../views/BuildingsSearchView.vue'
import BuildingFormInsertView from '../views/BuildingInsertView.vue'
import BuildingFormUpdateView from '../views/BuildingUpdateView.vue'

import BuildingDetailsView from '../views/BuildingDetailsView.vue'

import ExtractView from '../views/ExtractView.vue'
import StatsView from '../views/StatsView.vue'

import qs from 'qs';


const routes = [
  { path:'/stats', name:'Stats', component: StatsView },
  { path:'/extract', name:'Extract', component: ExtractView },
  { path:'/about', name:'About', component: About },
  
  { path:'/users', name:'Users', component: UserSearchResultsView },
  { path:'/uadd', name:'addUser', component: UserFormInsertView },
  { path:'/user/:id(\\d+)', name:'updateUser', component: UserFormUpdateView },


  { path:'/buildings', name:'Buildings', component: BuildingSearchResultsView , sensitive: false,
      props: route => ({ criteriaProp: qs.parse( route.query ).params }) 
  },
  { path:'/building/add', name:'addBuilding', component: BuildingFormInsertView },
  { path:'/building/:id(\\d+)', name:'updateBuilding',component: BuildingFormUpdateView },
  { path: '/buildings/:id(\\d+)', component: BuildingDetailsView }
];

const router = createRouter({
  //history:  createWebHistory(import.meta.env.BASE_URL),
  history:  createWebHashHistory(import.meta.env.BASE_URL),
  routes
});
export default router;


