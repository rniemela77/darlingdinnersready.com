<template>
  <header class="header">
    <g-link to="/" class="header-title">
      <h1 class="header-title-text">Darling Dinner's Ready</h1>
    </g-link>

    <nav class="nav">
      <g-link
        to="/"
        @click="resetFilters"
        :class="[
          'nav-link',
          { 'nav-link--active': !$route.query.filterBy && $route.path === '/' },
        ]"
      >
        All Recipes
      </g-link>

      <g-link
        v-for="category in orderedCategories"
        :key="category.node.id"
        :class="[
          'nav-link',
          { 'nav-link--active': $route.query.filterBy === category.node.title },
        ]"
        :to="`?filterBy=${category.node.title}`"
      >
        {{ category.node.title }}
      </g-link>
    </nav>
  </header>
</template>

<static-query>
{
  categories: allSanityCategory {
    edges {
      node {
        id
        title
      }
    }
  }
}
</static-query>

<script>
export default {
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
  methods: {
    resetFilters() {
      this.$router.replace({ path: '/' })
    },
    pushCategoryFilter(category) {
      this.$router.push({
        path: '/',
        query: {
          filterBy: category,
        },
      })
    },
  },
}
</script>

<style lang="scss">
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
  line-height: unset;
  .header-title-text {
    color: var(--color-title);
    font-family: 'Kristi', cursive;
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
    background-image: url(https://www.pngall.com/wp-content/uploads/5/Dry-Brush-Stroke-PNG-Free-Image.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    mix-blend-mode: color-burn;
    opacity: 0.4;
    filter: hue-rotate(175deg);
    transform: rotate(4deg) translateY(14px);
  }
  &:hover {
    &::after {
      opacity: 0.6;
    }
  }
}
.nav {
  position: relative;
  &::before {
    content: 'Viewing';
    position: absolute;
    top: -1rem;
    left: 0;
    font-size: 12px;
    color: var(--color-font-dark);
    opacity: 0.7;
  }
}
.nav-link {
  text-decoration: none;
  display: inline-block;
  padding: 0.25rem 1rem;
  transition: background var(--transition-speed);
  color: var(--color-font-dark);
  background: var(--color-nav-link);
  &.nav-link--active {
    background: var(--color-nav-link--active);
  }
  &:hover:not(.nav-link--active) {
    background: var(--color-nav-link--hover);
  }
  &:not(:last-of-type) {
    margin-right: 0.2rem;
  }
  position: relative;
}
@media screen and (max-width: 1140px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  .header-title {
    line-height: unset;
  }
}
</style>