<template>
  <header class="header">
    <h1 class="header-title">Darling Dinner's Ready</h1>

    <nav class="nav">
      <g-link
        to="/"
        @click="resetFilters"
        :class="['nav-link', { 'nav-link--active': !$route.query.filterBy }]"
      >
        All Recipes
      </g-link>

      <g-link
        v-for="category in $static.categories.edges"
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
  padding: 10rem 2rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: var(--content-width);
  margin: 0 auto;
}
.header-title {
  font-family: 'Kristi', cursive;
  font-size: 4rem;
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.1);
  font-weight: normal;
  margin: 0;
  padding: 0;
  text-align: center;
  flex: 0 0 100%;
  color: var(--color-title);
}
.nav-link {
  text-decoration: none;
  display: inline-block;
  padding: 0.25rem 1rem;
  transition: background var(--transition-speed), color var(--transition-speed);
  color: var(--color-font-dark);
  &.nav-link--active {
    background: var(--color-main-bg);
  }
}
</style>