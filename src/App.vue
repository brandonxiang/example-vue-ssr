/*
 * @Author: fish119 
 * @Date: 2017-05-19 13:22:02 
 * @Last Modified by:   fish119 
 * @Last Modified time: 2017-05-22 13:22:02 
 */
<template>
  <div id="app">
    <app-header class="header"></app-header>
    <router-view></router-view>
    <bottom-navigation class="bottom_nav"></bottom-navigation>
  </div>
</template>

<script>
  import appHeader from './components/Header'
  import bottomNavigation from './components/BottomNavigation'

  export default {
    name: 'app',
    components: {
      appHeader,
      bottomNavigation
    }
  }
</script>

<style>
  html {
    font-size: 16px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
