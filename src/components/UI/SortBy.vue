<template>
    <div @click="$emit('sort', field)">{{ text }}
        <template v-if="currentSort==field">
            <span v-if="currentSortDir=='asc'">&#8595;</span>
            <span v-else>&#8593;</span>
        </template>
    </div>  
</template>

<script>
export default {
 props: {
    field: {
       type: String,
       default: null
    },
    text: {
       type: String,
       default: null
     },
    currentSort: {
      type: String,
      required: true
    },
    currentSortDir: {
      type: String,
      default: null
    }
  }
}
</script>
