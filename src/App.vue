<template>
  <div class="w-full h-screen px-2 bg-errigal_white">
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