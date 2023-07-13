<template>
  <my-container>
    <MyHeader>
      Недавно добавленные
    </MyHeader>
  </my-container>
  <my-container>
<div v-for='pair in lastPairs'>
    <div class='flex flex-row gap-2 font-sans text-head_over_heels text-base px-4 border-b-2'>
      <p>{{ pair.en.value }} </p>
      <p> - </p>
      <p> {{ pair.ru.value }}</p>
    </div>
</div>
  </my-container>
</template>

<script>

export default {
  name: 'LastAdded',
  props: {
    lastPairs: {
      type: Array,
      required: true
    }
  },
};
</script>

<style scoped>

</style>