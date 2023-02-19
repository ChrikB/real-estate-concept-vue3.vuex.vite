<template>
  <section class="stats-view">
    <div class="row">
      <div class="col-12">
        <h4>What is this ?</h4>
        <p>
          This project is a small part of a real-estate app from the past.<br>
          Images, titles, square feet, floors, locations, countries, user data etc are all random.<br>
          The concept is very similar to the original but everything else is reworked, simplified<br> and with different libraries/packages to create a proof of concept using <b>Vue 3/Vuex</b><br>
          Design/css is simple using <b>bootstrap 5</b> and without eye-candy stuff.<br>
          There is not server-side and database functionality. Everything happens in client side.<br>
          Sql, 'select' and 'join' statements have been all replaced with typical javascript  array filtering.<br>
          <u><b>You can add 'users' and 'buildings' to see how it works</b></u> but nothing can be saved.<br>
          Initial data are fetched from a json file.<br>
          In this demo, Charts are fed with data from static data processing, <br> 
          but in full version, data come from GA(google analytics api) usings metrics and dimensions.
          </p>
      </div>
      <div class="col-12">
        <h4>General sections covered</h4>  
        <ul>
          <li>-Responsiveness</li>
          <li>-Forms and data validation(error tooltips in form fields after submit)</li>
          <li>-Array filtering(to simulate search)</li>
          <li>-Map interactions, setting and getting lat and lng(leaflet.js)</li>
          <li>-Copy to clipboard and file export</li>
          <li>-Reusable vue components</li>
          <li>-Image uploading</li>
          <li>-Carousel</li>
          <li>-Multi Date and date-range Picking</li>
          <li>-Data processing and chart generation(chart.js)</li>
        </ul>             
      </div>
      <div class="col-12">
        <h4>Libraries/packages used</h4>
        <ul>
          <li><a href="https://vuejs.org">Vue 3</a></li>
          <li><a href="https://router.vuejs.org">Vue router</a></li>
          <li><a href="https://vitejs.dev">Vite</a></li>
          <li><a href="https://www.npmjs.com/package/vuex">Vuex</a></li>
          <li><a href="https://www.npmjs.com/package/chart.js?activeTab=readme">Chart.js</a></li>
          <li><a href="https://www.npmjs.com/package/@vuepic/vue-datepicker">vue-datepicker</a></li>
          <li><a href="https://www.npmjs.com/package/qs">qs</a></li>
          <li><a href="https://www.npmjs.com/package/jszip">jszip</a></li>
          <li><a href="https://www.npmjs.com/package/file-saver">file-saver</a></li>
          <li><a href="https://www.npmjs.com/package/bootstrap/v/5.0.1">bootstrap 5</a></li>
          <li><a href="https://www.npmjs.com/package/leaflet">Leaflet.js(maps)</a></li>
          <li>Sample Photos from <b>Pixabay</b></li>
        </ul>       
      </div>
    </div>
  </section>
</template>

<style>
ul{
  list-style-type: none;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
