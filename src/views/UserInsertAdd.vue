<template>
  <section class="user-add  mb-4 mt-4 m-auto">
    <UserFormInsert />
  </section>
</template>



<script>

import UserFormInsert from './../components/UserFormInsert.vue' 

export default {

  name: 'UserFormInsertView',
  components: {
    UserFormInsert
  },
  props: {
    criteria: {}
  },
  data() {
    return {}
  },
  methods: {

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
