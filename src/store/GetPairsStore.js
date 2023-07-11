import { defineStore } from 'pinia';
const url = "http://45.95.235.82:3000/v1/admin/phrases?"
export const useGetPairsStore = defineStore("getPairsStore", {
  state: () => ({
    showSpiner: false,
    pairs: [],
    currentPage: 0,
    totalPages: 0

  }),
  actions: {
    async getPairsFromAPI(pageSize,pageNum) {
      this.showSpiner = true
      const response = await fetch(`${url}pageSize=${pageSize}&pageNum=${pageNum}`)
      const data = await response.json()
      console.log('Объект', response);
      console.log('Объект JSON', data);
      this.pairs = data.pairs
      this.currentPage = data.pageNum
      this.totalPages = data.pages
      this.showSpiner = false
    }
  }
})