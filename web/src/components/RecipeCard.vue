<template>
  <div class="recipe">
    <g-link :to="recipe.node.slug.current" class="recipe-overlay-link"></g-link>
    <g-image
      :alt="recipe.node.mainImage.alt"
      v-if="recipe.node.mainImage"
      class="recipe-image"
      :src="
        $urlForImage(recipe.node.mainImage, $page.metadata.sanityOptions)
          .height(440)
          .width(800)
          .auto('format')
          .url()
      "
      height="440"
      width="800"
      loading="lazy"
    />
    <div class="recipe-info">
      <h3 class="recipe-title">{{ recipe.node.title }}</h3>
      <p class="recipe-description">{{ recipe.node.shortDescription }}</p>
      <p class="recipe-categories">{{ displayedCategories }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object,
  },
  computed: {
    displayedCategories() {
      return this.recipe.node.categories
        .map((category) => category.title)
        .join(', ')
    },
  },
}
</script>

<style lang="scss">
$title-left-spacing: 0.5rem;
.recipe {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background var(--transition-speed),
    box-shadow var(--transition-speed);
  border: 3px solid #ece5dc;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 1rem 0.5rem rgb(104 46 23 / 10%);
    & .recipe-title {
      transform: translate($title-left-spacing, -20px);
    }
  }
}
.recipe-info {
  padding: 0 0.5rem 1rem;
}
.recipe-title {
  margin: 0;
  transform: translate($title-left-spacing, -15px);
  padding: 0.25rem 1rem;
  color: var(--color-font-dark);
  display: inline-block;
  max-width: calc(100% - $title-left-spacing);
  background: #b99e9e;
  color: var(--color-font-light);
  transition: transform var(--transition-speed);
}
.recipe-categories {
  font-style: italic;
  opacity: 0.7;
  font-size: 90%;
}
.recipe-overlay-link {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
