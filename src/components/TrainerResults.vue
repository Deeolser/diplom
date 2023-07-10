<template>
<div>
  <my-canva>
    <div>
      <table class='flex flex-col justify-start gap-4 font-bold
  text-head_over_heels text-sm uppercase'>
        <tr class='flex flex-row justify-between border-b-2 pb-2 border-dusky_grape gap-2 '>
          <td class='w-1/5'>Фраза</td><td class='w-1/5'>Перевод</td><td class='w-1/5'>Ты ввел</td><td class='w-1/5 text-center'>Ошибок</td><td class='text-center w-1/5'>Результат</td>
        </tr>
        <tr class='flex flex-row justify-between border-b-2 border-errigal_white'
            v-for='(testResult, index) in testResults' :key='index'>
          <td class='text-start w-1/5'>{{ testResult.en.value }}</td>
          <td class='text-start w-1/5'><span v-for='(correctPhrase, index) in testResult.ru.correctPhrases' :key='index'>{{correctPhrase.value}}; </span></td>
          <td class='text-start w-1/5'>{{testResult.ru.checkResult.enteredValue}}</td>
          <td class='text-center w-1/5'>{{testResult.ru.checkResult.failures}}</td>
          <td class='flex flex-row justify-center w-1/5'><img class='w-7' v-if='testResult.ru.checkResult.success===true'
                   src="/public/IcBaselineCheck.svg" alt="Ok">
            <img class='w-7' v-if='testResult.ru.checkResult.success===false'
                 src="/public/IcBaselineClose.svg" alt="Error"></td>
        </tr>
      </table>
    </div>
    <div class='flex flex-row justify-end m-4'>
      <my-button @click='repeatTest'>Еще раз</my-button>
    </div>
  </my-canva>

</div>



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
  methods: {
    repeatTest () {
      this.$emit('repeatTest');
    },
  },

};
</script>

<style scoped>

</style>