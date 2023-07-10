<template>
  <input
    :value="modelValue"
    class="text-base text-head_over_heels
    border border-grape_mist bg-whiteout font-sans leading-6 px-3 border-2
    placeholder:text-dusky_grape p-1 focus:border-2 border-grape_mist outline-none"
    type="text"
    @input="updateInput"
  >
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>

</style>