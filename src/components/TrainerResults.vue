<template>
<div>
  <my-canva>
  <div class='flex flex-row justify-start gap-4 px-4 py-2 font-bold
  text-head_over_heels text-center border-b-2 border-dusky_grape text-sm uppercase'>
    <div class='flex flex-col justify-center w-1/5'>Фраза</div>
    <div class='flex flex-col justify-center w-1/5'>Перевод</div>
    <div class='flex flex-col justify-center w-1/5'>Ты ввел</div>
    <div class='flex flex-col justify-center w-1/5'>Ошибок</div>
    <div class='flex flex-col justify-center w-1/5'>Результат</div>
  </div>
  <div class='flex flex-row justify-center gap-4 px-4 font-bold m-2
  text-head_over_heels text-center text-sm uppercase border-b-2 border-errigal_white'
       v-for='(testResult, index) in testResults' :key='index'>
    <div class='flex flex-col justify-center w-1/5'>
      {{ testResult.en.value }}
    </div>
    <div v-if='testResult.ru.correctPhrases.length === 1' class='flex flex-col justify-center w-1/5'>
       {{testResult.ru.correctPhrases[0].value}}
    </div>
    <div v-if='testResult.ru.correctPhrases.length > 1' class='flex flex-col justify-center w-1/5'>
           <div v-for='(correctPhrase, index) in testResult.ru.correctPhrases' :key='index'>
             {{correctPhrase.value}};
     </div>

    </div>
    <div class='flex flex-col justify-center w-1/5'>
      {{testResult.ru.checkResult.enteredValue}}
    </div>
    <div class='flex flex-col justify-center w-1/5'>
      {{testResult.ru.checkResult.failures}}
    </div>
    <div class='flex flex-col justify-center w-1/5'>
      <img class='self-center w-7' v-if='testResult.ru.checkResult.success===true'
           src="/public/IcBaselineCheck.svg" alt="Ok">
      <img class='self-center w-7' v-if='testResult.ru.checkResult.success===false'
           src="/public/IcBaselineClose.svg" alt="Error">
    </div>
  </div>
    <div class='flex flex-row justify-end m-4'>
      <my-button @click='repeatTest'>Еще раз</my-button>
    </div>
  </my-canva>

</div>



</template>

<script>


import MyButton from './UI/MyButton.vue';

export default {
  name: 'TrainerResults',
  components: { MyButton },

  props: {
    testResults: {
      type: Array,
      required: true,
    },
  },
  methods: {
    repeatTest () {
      this.$emit('repeatTest');
    },
  },

};
</script>

<style scoped>

</style>