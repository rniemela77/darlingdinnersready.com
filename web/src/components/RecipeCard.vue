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
      <p class="recipe-categories">
        <Categories :categories="recipe.node.categories" />
      </p>
    </div>
  </div>
</template>

<script>
import Categories from '~/components/Categories'

export default {
  components: {
    Categories,
  },
  props: {
    recipe: Object,
  },
}
</script>

<style lang="scss" scoped>
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
  display: inline-block;
  max-width: calc(100% - calc($title-left-spacing * 2));
  background: var(--color-font-medium);
  color: var(--color-font-light);
  transition: transform var(--transition-speed);
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
