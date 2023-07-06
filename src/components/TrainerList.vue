<template>
  <div>
    Тут будет список заданий:
      <TrainerItem
          v-for="phrase in phrases"
          :key="phrase.id"
          :phrase="phrase"
          @remove="$emit('remove', phrase)"
      />
  </div>
  <my-header
      class="text-3xl"
  >
    Добавь значения в словарь
  </my-header>
</template>

<script>
import TrainerItem from "./TrainerItem.vue";

export default {
  name: 'TrainerList',
  components: { TrainerItem},
  props: {
    phrases: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style scoped>
</style>