/*
 * @Author: fish119 
 * @Date: 2017-05-19 13:22:15 
 * @Last Modified by:   fish119 
 * @Last Modified time: 2017-05-22 13:22:15 
 */
<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item to="/" value="首页" title="首页" icon="home"/>
      <mu-bottom-nav-item to="/publish" value="发布" title="发布" icon="subject"/>
      <mu-bottom-nav-item to="/messages" value="消息" title="消息" icon="message"/>
      <mu-bottom-nav-item to="/person" value="我的" title="我的" icon="person"/>
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      bottomNav(){
        return this.$store.state.tabValue;
      }
    },
    methods: {
      handleChange (val) {
        this.$store.dispatch('changeTabValue', val);
      }
    }
  }
</script>

<style>

</style>
