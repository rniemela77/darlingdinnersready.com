<template>
  <Layout :show-logo="false">
    <RecipeList :recipes="displayRecipes" />
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
import AuthorCard from '~/components/AuthorCard'
import PostCard from '~/components/PostCard'
import RecipeList from '~/components/RecipeList'

export default {
  components: {
    AuthorCard,
    PostCard,
    RecipeList,
  },
  metaInfo: {
    title: 'Hello, world!',
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
