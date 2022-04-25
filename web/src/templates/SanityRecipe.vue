<template>
  <Layout>
    <section class="recipe">
      <div class="row">
        <div class="image-title">
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

          <h2 class="title">{{ $page.recipe.title }}</h2>
        </div>

        <div class="side-content">
          <div class="video-container" v-if="$page.recipe.youtubeUrl">
            <iframe
              width="560"
              height="315"
              :src="`https://www.youtube.com/embed/${videoId}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video-embed"
            ></iframe>
            <a :href="$page.recipe.youtubeUrl">View on YouTube</a>
          </div>

          <div class="info">
            <p class="info-prep" v-if="$page.recipe.prepTime">
              <b>Prep:</b> {{ $page.recipe.prepTime }}
            </p>

            <p class="info-cook" v-if="$page.recipe.cookTime">
              <b>Cook:</b> {{ $page.recipe.cookTime }}
            </p>

            <p class="info-servings" v-if="$page.recipe.servings">
              <b>Servings:</b> {{ $page.recipe.servings }}
            </p>

            <p class="info-categories" v-if="$page.recipe.categories">
              <Categories :categories="$page.recipe.categories" />
            </p>
          </div>
        </div>
      </div>

      <div class="description" v-if="$page.recipe.shortDescription">
        <h3>{{ $page.recipe.shortDescription }}</h3>
      </div>

      <div class="information" v-if="$page.recipe._rawInformation">
        <h3 class="header">About</h3>
        <block-content :blocks="$page.recipe._rawInformation" />
      </div>

      <div class="row">
        <div class="ingredients" v-if="$page.recipe._rawIngredients">
          <h3 class="header">Ingredients</h3>
          <div class="ingredients-list">
            <block-content :blocks="$page.recipe._rawIngredients" />
          </div>
        </div>

        <div class="steps" v-if="$page.recipe._rawStepsList">
          <h3 class="header">Steps</h3>
          <block-content :blocks="$page.recipe._rawStepsList" />
        </div>
      </div>
    </section>
    <span class="enjoy">Enjoy!</span>
    <small class="published-at" v-if="$page.recipe.publishedAt">
      Published: {{ $page.recipe.publishedAt }}
    </small>
  </Layout>
</template>

<script>
import BlockContent from '~/components/BlockContent'
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import AuthorCard from '~/components/AuthorCard'
import Categories from '~/components/Categories'

export default {
  components: {
    AuthorCard,
    PostMeta,
    PostTags,
    BlockContent,
    Categories,
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
.image-title {
  margin-right: 1rem;
}
.main-image {
  width: 100%;
  max-width: 800px;
  height: auto;
  object-fit: cover;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.11);
}
.video-container {
  .video-embed {
    width: 100%;
    height: auto;
    max-width: 400px;
  }
  a {
    color: var(--color-accent--4);
  }
}
.info {
  margin: 1rem 0;
  padding: 1rem;
  background: white;
  border-left: 3px solid var(--color-font-dark);
  b {
    font-weight: bold;
  }
  .info-categories {
    font-style: italic;
  }
}

.row {
  display: flex;
}
.description {
  font-style: italic;
}

.description,
.information,
.ingredients,
.steps {
  padding: 1rem;
  &::v-deep {
    p,
    ol,
    li,
    figcaption {
      color: var(--color-font-dark);
      line-height: 1.5;
    }
  }
  ::v-deep figure {
    text-align: center;
    font-style: italic;
  }
  ::v-deep h4 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 1rem 0;
    border-bottom: 1px solid var(--color-accent--4);
    display: inline-block;
  }
  &::v-deep img {
    width: 100%;
    height: auto;
    max-width: 400px;
    margin: 1rem auto;
    display: block;
  }
}

.title {
  background: #b99e9e;
  padding: 0.5rem 1rem;
  display: inline-block;
  margin: 0;
  transform: translate(1rem, -1rem);
  color: var(--color-font-light);
}

.ingredients {
  min-width: 40%;
  .ingredients-list {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: white;
    box-shadow: 0 0.5rem 0.5rem 0rem rgba(0, 0, 0, 0.11);
  }
}
.header {
  color: var(--color-font-dark);
}

.enjoy {
  font-family: 'Kristi';
  text-align: center;
  display: block;
  width: 50%;
  font-size: 4rem;
  margin: 2rem auto;
  color: var(--color-font-dark);
}
.published-at {
  text-align: center;
  display: block;
  color: grey;
  font-style: italic;
}
@media screen and (max-width: 750px) {
  .row {
    flex-direction: column;
  }
  .video-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
