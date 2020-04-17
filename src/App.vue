<template>
  <div id="app">
    <student></student>
  </div>
</template>

<script>
import student from './views/student'

export default {
  name: 'App',
  components: {
    student
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
