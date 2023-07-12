import { defineStore } from 'pinia';
const url = "http://45.95.235.82:3000/v1/admin/phrases?"
export const useGetPairsStore = defineStore("getPairsStore", {
  state: () => ({
    loadPairs: false,
    pairs: [],
    currentPage: 0,
    totalPages: 0

  }),
  actions: {

    async getPairsFromAPI(pageSize,pageNum) {
      try {
        this.loadPairs = true
        const response = await fetch(`${url}pageSize=${pageSize}&pageNum=${pageNum}`)
        const data = await response.json()
        console.log('Объект', response);
        console.log('Объект JSON', data);
        this.pairs = this.capitalizeFirstLetterInObject(data.pairs)

        this.currentPage = data.pageNum
        this.totalPages = data.pages
        this.loadPairs = false
      } catch (e) {
        console.log(e);
      }
    },


    capitalizeFirstLetterInObject(pairs){
      for (let pair of pairs)
      {
        pair.en.value = this.capitalizeFirstLetter(pair.en.value)
        pair.ru.value = this.capitalizeFirstLetter(pair.ru.value)
      }
      return pairs
    },

    capitalizeFirstLetter(string){
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

  }
})