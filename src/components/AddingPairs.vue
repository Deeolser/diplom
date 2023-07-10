<template>
  <my-canva>
    <MyHeader>
      Добавление перевода
    </MyHeader>
  </my-canva>
  <my-canva class='flex flex-col justify-center'>
    <div>
      <form class='flex flex-row justify-between gap-4' @submit.prevent>
        <div>
          <label class='font-bold text-head_over_heels text-sm uppercase mr-2 '>EN</label>
          <my-input
            v-model='pair.phrase'
            placeholder='Введи фразу'
            type='text'
          />
        </div>
        <div>
          <label class='font-bold text-head_over_heels text-sm uppercase mr-2 '>RU</label>
          <my-input
            v-model='pair.translate'
            placeholder='Введи перевод'
            type='text'
          />
        </div>
        <div class='flex flex-col justify-center '>
          <my-button @click='addPair'>Добавить</my-button>
        </div>

      </form>
    </div>
  </my-canva>
</template>

<script>

export default {
  name: 'AddingPairs',
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