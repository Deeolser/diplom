<template>
  <div class="my-4 flex flex-row justify-between rounded-md bg-gray-100">
    <div class="p-1 pl-2 align-middle">
{{ pairs.pairs }}
    </div>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslateItem',
  props: {
    pairs: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>