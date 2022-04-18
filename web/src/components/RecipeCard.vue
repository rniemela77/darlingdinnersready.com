<template>
  <div class="recipe">
    <g-link :to="recipe.node.slug.current">Link</g-link>
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
      <p>{{ recipe.node.title }}</p>
      <p>{{ recipe.node.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object,
  },
}
</script>

<style lang="scss">
.recipe {
  display: flex;
  flex-direction: column;
}
</style>
