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
  color: var(--color-font-grey);
  font-size: 90%;
  font-style: italic;
}
</style>
