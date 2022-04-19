<template>
  <Layout :show-logo="false">
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in displayRecipes"
        :key="recipe.node.id"
        :recipe="recipe"
        class="recipe-card"
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
}
.recipe-card {
  flex: 0 1 50%;
  padding: 1rem;
}
@media screen and (max-width: 850px) {
  .recipe-card {
    flex: 0 0 100%;
  }
}
</style>
