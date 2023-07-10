<template>
  <div class="max-w-fit font-bold text-head_over_heels border-t-2 border-b-2
  border-dusky_grape bg-none px-2 uppercase text-sm py-1 align-middle hover:border-head_over_heels
  hover:cursor-pointer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>

<style scoped></style>