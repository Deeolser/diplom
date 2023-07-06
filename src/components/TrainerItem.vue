<template>
  <div class="p-1 pl-2 align-middle">
    {{ phrases }}
  </div>
</template>

<script>
export default {
  name: "TrainerItem",
  props: {
    phrases: {
      type: Object,
      required: true,
    },
  },
};

</script>

<style scoped>

</style>