<template>
  <Layout>
    <div>
      <h1>{{ $page.recipe.title }}</h1>
      <p>{{ $page.recipe.shortDescription }}</p>
    </div>
  </Layout>
</template>

<script>
import BlockContent from '~/components/BlockContent'
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import AuthorCard from '~/components/AuthorCard'

export default {
  components: {
    AuthorCard,
    PostMeta,
    PostTags,
    BlockContent,
  },
  metaInfo() {
    return {
      title: this.$page.recipe.title,
      meta: [
        {
          name: 'description',
          content: this.$page.recipe.description,
        },
      ],
    }
  },
}
</script>

<page-query>
query Recipe ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  recipe: sanityRecipe (id: $id) {
    title
    youtubeUrl
    shortDescription
    publishedAt (format: "D. MMMM YYYY")
    mainImage {
      asset {
        _id
        url
      }
      caption
      alt
    }
    categories {
      id
      title
    }
    _rawInformation
    _rawIngredients
    prepTime
    cookTime
    servings
    _rawStepsList
  }
}
</page-query>

<style lang="scss" scoped>
</style>
