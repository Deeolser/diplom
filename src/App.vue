<template>
  <div class=" w-screen h-screen bg-errigal_white">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: { NavBar },
};
</script>

<style scoped></style>