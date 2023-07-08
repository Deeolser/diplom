<template>
<div>
  <div class='flex flex-row justify-start gap-4 mx-4 font-bold text-head_over_heels  text-center text-l border-b-2 '>
    <div class='flex flex-col justify-center w-1/5'>Фраза</div>
    <div class='flex flex-col justify-center w-1/5'>Перевод</div>
    <div class='flex flex-col justify-center w-1/5'>Ты ввел</div>
    <div class='flex flex-col justify-center w-1/5'>Ошибался</div>
    <div class='flex flex-col justify-center w-1/5'>Результат</div>
  </div>
  <div class='flex flex-row justify-start gap-4 mx-4 mt-2 font-bold text-head_over_heels text-l text-center '
       v-for='(testResult, index) in testResults' :key='index'>
    <div class='flex flex-col justify-center w-1/5'>
      {{ testResult.en.value }}
    </div>
    <div class='flex flex-col justify-center w-1/5'>
      {{testResult.ru.correctPhrases[0].value}}
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
</div>

<!--    <div> {{testResult.en.value}}</div>-->
<!--    <div> {{testResult.ru.correctPhrases[0].value}}</div>-->
<!--    <div>{{testResult.ru.checkResult.success}}</div>  -->
</template>

<script>
export default {
  name: 'TrainerResults',
  props: {
    testResults: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>