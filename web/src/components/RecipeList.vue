<template>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.node.id"
      :recipe="recipe"
      class="recipe-card"
    />
  </div>
</template>

<script>
import RecipeCard from '~/components/RecipeCard'

export default {
  components: {
    RecipeCard,
  },
  props: {
    recipes: Array,
  },
}
</script>


<style lang="scss">
.recipe-list {
  display: flex;
  flex-wrap: wrap;
}
.recipe-card {
  flex: 0 1 50%;
  padding: 1rem;
}
</style>