<template>
  <Layout :show-logo="false">
    <div class="recipe-list">
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
$recipe-card-spacing: 1rem;
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
