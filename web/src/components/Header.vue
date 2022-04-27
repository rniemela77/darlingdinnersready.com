<template>
  <header class="header">
    <g-link to="/" class="header-title">
      <h1 class="header-title-text">Darling Dinner's Ready</h1>
    </g-link>

    <NavBar />
  </header>
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar,
  },
  computed: {
    orderedCategories() {
      // Sort categories in the order of: Breakfast, Lunch, Dinner, Dessert, Sides, Drinks
      return this.$static.categories.edges.sort((a, b) => {
        const categories = [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Dessert',
          'Sides',
          'Drinks',
        ]
        return (
          categories.indexOf(a.node.title) - categories.indexOf(b.node.title)
        )
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kristi&display=swap');

.header {
  padding: clamp(2rem, 5vw, 10rem) 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  max-width: var(--content-max-width);
  width: var(--content-width);
  margin: 0 auto;
}
.header-title {
  text-decoration: none;
  position: relative;
  .header-title-text {
    color: var(--color-font-dark);
    font-family: var(--font-family-title);
    font-size: 4rem;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    content: '';
    background-image: url('~@/assets/images/brush-stroke.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    mix-blend-mode: color-burn;
    opacity: 0.4;
    filter: hue-rotate(175deg);
    transform: rotate(4deg) translateY(14px);
  }
}
@media screen and (max-width: 1200px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  .header-title {
    margin-bottom: 2rem;
  }
}
@media screen and (max-width: 700px) {
  .header {
    align-content: flex-start;
    padding: 1rem 0;
    .header-title {
      margin: 0;
      &::after {
        top: -0.5rem;
      }
    }
    .header-title-text {
      font-size: 2rem;
    }
  }
}
</style>