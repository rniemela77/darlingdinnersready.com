<template>
  <span>
    {{ displayedCategories }}
  </span>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  computed: {
    displayedCategories() {
      return this.categories.map((category) => category.title).join(', ')
    },
  },
}
</script>

<style lang="scss" scoped>
span {
  opacity: 0.5;
}
</style>
