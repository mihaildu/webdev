<template>
  <div id="app">
    <p>Hi from Vue app!</p>
    <p>The message param is {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return { message: 'Test' }
  },
  created: function () {
    console.log('App was created');
  },
  mounted: function () {
    console.log('App was mounted');
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
