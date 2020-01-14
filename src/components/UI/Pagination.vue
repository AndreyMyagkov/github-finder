<template>
    <div class="button-list">
        <div :class="['btn', {btnPrimary: current>1}]" @click="prevPage"> &#8592; </div>
        <div :class="['page', {current: (page+1)==current}]" v-for="page in pages" :key="page" @click="setPage(page+1)">{{ (page+1) }}</div>
        <div :class="['btn', {btnPrimary: current*itemPerPage<total}]" @click="nextPage"> &#8594; </div>
    </div>  
</template>

<script>
export default {
 props: {
    current: {
       type: Number,
       default: 1
    },
    total: {
       type: Number,
       default: 1
    },
    itemPerPage: {
      type: Number,
      default: 5
    }
  },
  methods: {
    setPage(page){
        this.$emit('setPage', page)
    },
    nextPage(){
       if ((this.current * this.itemPerPage) < this.total) {
        this.setPage(this.current+1)
      }
    },
    prevPage(){
        if (this.current >1) {
            this.setPage(this.current-1)
        }
    }
  },
  computed: {
    pages(){
        return [...Array(Math.ceil(this.total/this.itemPerPage)).keys()]
    }
  } 
}
</script>

<style>
    .page {
        display: inline-block;
        padding: .8em 1em;
        line-height: 1;
        cursor: pointer;
    }
    .current {font-weight: bold}
</style>