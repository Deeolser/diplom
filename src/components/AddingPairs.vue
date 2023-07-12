<template>
  <my-container>
    <MyHeader>
      Добавление перевода
    </MyHeader>
  </my-container>
  <my-container class='flex flex-col justify-center'>
    <div>
      <form class='flex flex-row justify-between' @submit.prevent>
        <div class='flex flex-row w-10/12 justify-between gap-4'>
          <div class='w-1/2'>
            <label class='font-bold text-head_over_heels text-sm uppercase mr-2 '>EN</label>
            <my-input
              class='w-10/12'
              v-model='pair.phrase'
              placeholder='Введи фразу'
              type='text'
            />
          </div>
          <div class='w-1/2'>
            <label class='font-bold text-head_over_heels text-sm uppercase mr-2'>RU</label>
            <my-input
              class='w-10/12'
              v-model='pair.translate'
              placeholder='Введи перевод'
              type='text'
            />
          </div>
        </div>

        <div class='flex flex-col justify-center'>
          <my-button @click='addPair'>Добавить</my-button>
        </div>

      </form>
    </div>
  </my-container>
</template>

<script>

import MyContainer from './UI/MyContainer.vue';

export default {
  name: 'AddingPairs',
  components: { MyContainer },
  data() {
    return {
      pair: {
        phrase: '',
        translate: '',
      },
    };
  },
  methods: {
    addPair() {
      const newPair = [{
        en: {
          value: this.pair.phrase,
        },
        ru: {
          value: this.pair.translate,
        },
      }];
      console.log('Подготовлено на отправку на сервер -> ', JSON.stringify(newPair));
      this.postPair(newPair);
    },

    async postPair(newPair) {
      try {
        const response = await fetch('http://45.95.235.82:3000/v1/admin/add-pairs', {
          method: 'POST',
          body: JSON.stringify(newPair),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        const json = await response.json();
        console.log('Ответ на postPair -> ', json);
        this.pair.phrase = '';
        this.pair.translate = '';
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>

</style>