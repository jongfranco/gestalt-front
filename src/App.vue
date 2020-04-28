<template>
  <v-app>
    <NavBar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    //
  })
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Sen&display=swap");
#app {
  font-family: Sen, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
</style>
