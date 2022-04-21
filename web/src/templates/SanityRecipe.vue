<template>
  <Layout>
    <section class="recipe">
      <img
        class="main-image"
        :alt="$page.recipe.title"
        v-if="$page.recipe.mainImage"
        :src="
          $urlForImage($page.recipe.mainImage, $page.metadata.sanityOptions)
            .width(800)
            .auto('format')
            .url()
        "
        loading="lazy"
      />

      <div class="video-container">
        <a
          v-if="$page.recipe.youtubeUrl"
          :href="$page.recipe.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="video-link"
        >
          View recipe on YouTube
        </a>
        <iframe
          v-if="$page.recipe.youtubeUrl"
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${videoId}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-embed"
        ></iframe>
      </div>

      <div class="info">
        <h3 class="header">Info:</h3>
        <p class="info-prep" v-if="$page.recipe.prepTime">
          Prep Time: {{ $page.recipe.prepTime }}
        </p>

        <p class="info-cook" v-if="$page.recipe.cookTime">
          Cook Time: {{ $page.recipe.cookTime }}
        </p>

        <p class="info-servings" v-if="$page.recipe.servings">
          Serves: {{ $page.recipe.servings }}
        </p>

        <p class="info-categories" v-if="$page.recipe.categories">
          <span
            v-for="category in $page.recipe.categories"
            :key="category.title"
          >
            #{{ category.title }}
          </span>
        </p>
      </div>

      <div class="body">
        <h2 class="title">{{ $page.recipe.title }}</h2>

        <p class="published-at" v-if="$page.recipe.publishedAt">
          Published on {{ $page.recipe.publishedAt }}
        </p>

        <div class="short-description" v-if="$page.recipe.shortDescription">
          <h3 class="header">Description</h3>
          <p>{{ $page.recipe.shortDescription }}</p>
        </div>

        <div class="information" v-if="$page.recipe._rawInformation">
          <h3 class="header">About</h3>
          <block-content :blocks="$page.recipe._rawInformation" />
        </div>

        <div class="row">
          <div class="ingredients" v-if="$page.recipe._rawIngredients">
            <h3 class="header">Ingredients</h3>
            <block-content :blocks="$page.recipe._rawIngredients" />
          </div>

          <div class="steps" v-if="$page.recipe._rawStepsList">
            <h3 class="header">Steps</h3>
            <block-content :blocks="$page.recipe._rawStepsList" />
          </div>
        </div>
      </div>
    </section>
    <span class="enjoy">Enjoy!</span>
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
  computed: {
    videoId() {
      // Extract the video ID from the URL
      let regex =
        /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm

      return regex.exec(this.$page.recipe.youtubeUrl)[3]
    },
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
    publishedAt (format: "MMMM do, YYYY")
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
.recipe {
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    'image image image video'
    'image image image info'
    'body body body body';
  .main-image {
    grid-area: image;
  }
  .video-container {
    grid-area: video;
  }
  .info {
    grid-area: info;
  }
  .body {
    grid-area: body;
  }
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
  max-width: 800px;
  max-height: 500px;
  object-fit: cover;
}

.video-embed {
  width: 100%;
  height: auto;
}

.info {
  background: white;
  padding: 1rem;
}

.title {
  background: #b99e9e;
  padding: 0.5rem 1rem;
  display: inline-block;
  margin: 0;
  transform: translate(1rem, -1rem);
  color: var(--color-font-light);
}
.published-at {
  font-size: 0.8rem;
}

.ingredients,
.steps {
  padding: 1rem;
}
.ingredients {
  box-shadow: 0 0.5rem 0.5rem 0rem rgba(0, 0, 0, 0.11);
  .header {
    margin-bottom: 0.5rem;
  }
  ::v-deep *:not(h3) {
    line-height: 2rem;
    margin-bottom: 0;
  }
  background: white;
  background-color: #e5e5f7;
  background-size: 2rem 2rem;
  background-image: repeating-linear-gradient(
    0deg,
    #dbdbdb,
    #dbdbdb 1px,
    #fdfdfd 1px,
    #fdfdfd
  );
}
.header {
  background: var(--color-font-dark);
  display: inline-block;
  padding: 0.5rem 1rem;
  color: var(--color-font-light);
}

.information {
  &::v-deep img {
    max-width: 400px;
    margin: 1rem 0;
  }
  &::v-deep h4 {
    margin: 1rem 0;
  }
}

.row {
  display: flex;
  align-items: flex-start;
  .ingredients {
    flex: 50%;
  }
  .ingredients {
    order: 2;
  }
}
.enjoy {
  font-family: 'Kristi';
  text-align: center;
  display: block;
  width: 50%;
  font-size: 4rem;
  margin: 2rem auto;
  color: var(--color-font-dark);
  border-top: 1px solid var(--color-font-dark);
  border-bottom: 1px solid var(--color-font-dark);
}

@media screen and (max-width: 900px) {
  .row {
    flex-direction: column;
  }
  .col {
    margin-left: 0;
    margin-top: 1rem;
  }
  .video {
    width: 50%;
  }
}
</style>
