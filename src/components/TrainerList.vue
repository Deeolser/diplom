<template>
  <div v-if="phrases.length > 0">
    <div class="flex flex-row justify-start gap-4 mx-4" v-for="(phrase, index) in phrases" :key="phrase.en.id">
    <div class="flex flex-col justify-center font-bold text-head_over_heels text-l"> {{phrase.en.value}} </div>
    <input type="text" class="w-full m-1 py-1.5 text-base text-head_over_heels
    border border-grape_mist bg-whiteout font-sans leading-6 px-3 border-2
    placeholder:text-dusky_grape p-1 focus:border-2 border-grape_mist outline-none"
           v-model.trim="inputValue[index]"
           @blur="addAnswer(phrase.en.id, phrase.en.value,index)"/>
    </div>
    <div class="flex flex-row justify-end m-4">
      <my-button @click="send">Проверить</my-button>
    </div>
  </div>
  <div v-else>
  <my-header>Похоже, в словаре ничего нет, добавь значения в словарь на странице "Добавить перевод"</my-header>
  </div>
</template>
<script>

export default {
  name: 'TrainerList',

  props: {
    phrases: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      inputValue: [],
      answers: [],
    }
  },
  methods: {
    send () {
      this.$emit('pushBtn')
    },
    addAnswer (phraseId, phraseValue,index) {
      const newAnswer = {
        en: {
          id: phraseId,
          value: phraseValue,
        },
        ru: {
          value: this.inputValue[index]
        }
      }
      console.log(newAnswer);
       this.$emit('createAnswer', newAnswer)
    }

  }
};

</script>

<style scoped>
</style>