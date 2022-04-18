<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <author-card :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <post-card
        v-for="edge in displayRecipes"
        :key="edge.node.id"
        :post="edge.node"
        :metadata="$page.metadata"
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
  posts: allSanityPost(sortBy: "publishedAt") {
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
        _rawExcerpt
        mainImage {
          asset {
            _id
            url
          }
          caption
          alt
          hotspot {
            x
            y
            height
            width
          }
          crop {
            top
            bottom
            left
            right
          }
        }
      }
    }
  }
}

</page-query>

<script>
import AuthorCard from '~/components/AuthorCard'
import PostCard from '~/components/PostCard'

export default {
  components: {
    AuthorCard,
    PostCard,
  },
  metaInfo: {
    title: 'Hello, world!',
  },
  computed: {
    filterBy() {
      return this.$route.query.filterBy
    },
    recipes() {
      return this.$page.posts.edges
    },
    displayRecipes() {
      if (this.filterBy) {
        return this.recipes.filter((recipe) =>
          recipe.node.categories.some((category) => category.title === this.filterBy)
        )
      } else return this.recipes
    },
  },
}
</script>
