<template>
  <my-canva>
    <div class='my-4 flex flex-row border-2 border-grape_mist py-2 px-4 justify-between'>
    {{this.pairs.pairs}}
  </div>
  </my-canva>

<!--    <transition-group name="couple-list">-->
<!--      <DictionaryItem-->
<!--          v-for="(pair, index) in pairs"-->
<!--          :key="index"-->
<!--          :pair="pair"-->
<!--      />-->
<!--    </transition-group>-->



</template>

<script>

export default {
  name: 'TranslatesList',
  props: {
    pairs: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>
.couple-list-item {
  display: inline-block;
  margin-right: 10px;
}

.couple-list-enter-active,
.couple-list-leave-active {
  transition: all 0.4s ease;
}

.couple-list-enter-from,
.couple-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.couple-list-move {
  transition: transform 0.4s ease;
}
</style>