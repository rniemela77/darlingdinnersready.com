<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">{{ $page.recipe.title }}</h1>
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
    shortDescription
    publishedAt (format: "D. MMMM YYYY")
  }
}
</page-query>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>
