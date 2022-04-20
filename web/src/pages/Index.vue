<template>
  <Layout :show-logo="false">
    <div class="recipe-list">
      <h2 class="recipe-list-header">{{ recipeListHeader }}</h2>
      <RecipeCard
        v-for="recipe in displayRecipes"
        :key="recipe.node.id"
        class="recipe-card-wrap"
        :recipe="recipe"
      />
    </div>
  </Layout>
</template>

<page-query>
{
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  recipes: allSanityRecipe(sortBy: "publishedAt") {
    edges {
      node {
        id
        title
        shortDescription
        slug {
          current
        }
        categories {
          id
          title
        }
        publishedAt(format: "D. MMMM YYYY")
        mainImage {
          asset {
            _id
            url
          }
          caption
          alt
        }
      }
    }
  }
}

</page-query>

<script>
import RecipeCard from '~/components/RecipeCard'

export default {
  components: {
    RecipeCard,
  },
  metaInfo: {
    title: 'DarlingDinnersReady Recipe List',
  },
  computed: {
    recipeListHeader() {
      if (this.$route.query.filterBy) {
        return `${this.$route.query.filterBy} Recipes`
      }
      return 'All Recipes'
    },
    filterBy() {
      return this.$route.query.filterBy
    },
    recipes() {
      return this.$page.recipes.edges
    },
    displayRecipes() {
      if (this.filterBy) {
        return this.recipes.filter((recipe) =>
          recipe.node.categories.some(
            (category) => category.title === this.filterBy
          )
        )
      } else return this.recipes
    },
  },
}
</script>

<style lang="scss">
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem clamp(0rem, 1vw, 4rem);
}
.recipe-list-header {
  flex: 0 0 100%;
  margin: 0 clamp(0rem, 3vw, 1rem);
  color: var(--color-font-dark);
}
$recipe-card-spacing: clamp(0rem, 3vw, 1rem);
.recipe-card-wrap {
  flex: 0 1 calc(50% - $recipe-card-spacing * 2);
  margin: $recipe-card-spacing;
}
@media screen and (max-width: 850px) {
  .recipe-card-wrap {
    flex: 0 0 calc(100% - $recipe-card-spacing * 2);
  }
}
</style>
