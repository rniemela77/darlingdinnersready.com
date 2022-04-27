<template>
  <div>
    <button @click="toggleNav()" class="nav-button">
      <svg
        v-if="!isNavOpen"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        viewBox="0 0 385 385"
        height="24px"
        width="24px"
      >
        <path
          d="M12 84.2h361a12 12 0 0 0 0-24H12a12 12 0 0 0 0 24zM373 180.5H12a12 12 0 0 0 0 24h361a12 12 0 0 0 0-24zM373 300.8H12a12 12 0 0 0 0 24h361a12 12 0 0 0 0-24z"
        />
      </svg>

      <svg
        v-if="isNavOpen"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        viewBox="0 0 371.2 371.2"
      >
        <path
          d="M371.2 21.2 350 0 185.6 164.4 21.2 0 0 21.2l164.4 164.4L0 350l21.2 21.2 164.4-164.4L350 371.2l21.2-21.2-164.4-164.4z"
        />
      </svg>
    </button>

    <nav :class="['nav', { 'nav-open': isNavOpen }]">
      <g-link
        to="/"
        @click="resetFilters()"
        :class="[
          'nav-link',
          { 'nav-link--active': !$route.query.filterBy && $route.path === '/' },
        ]"
      >
        All Recipes
      </g-link>

      <g-link
        @click="closeNav()"
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
  </div>
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
  data: () => ({
    isNavOpen: false,
  }),
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
    toggleNav() {
      this.isNavOpen = !this.isNavOpen
    },
  },
}
</script>


<style lang="scss" scoped>
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.nav-link {
  text-decoration: none;
  display: inline-block;
  padding: 0.25rem 1rem;
  transition: background var(--transition-speed);
  color: var(--color-font-dark);
  background: var(--color-nav-link);
  font-size: 20px;
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
  &:first-of-type {
    &::before {
      content: 'View';
      position: absolute;
      top: -1rem;
      left: 0;
      font-size: 14px;
      color: var(--color-font-grey);
    }
  }
}
.nav-button {
  display: none;
}
@media screen and (max-width: 700px) {
  .nav-button {
    display: block;
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    border: none;
    padding: 1rem;
    background: var(--color-bg);
    fill: var(--color-accent--5);
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
    }
  }
  .nav {
    flex-direction: column;
    background: white;
    height: auto;
    width: auto;
    position: fixed;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    right: 0;
    transition: top var(--transition-speed);
    z-index: 98;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    & > * {
      margin: 0;
      padding: 0.5rem;
      flex: 1;
    }
    top: -100%;
    &.nav-open {
      top: 0;
    }
  }
  .nav-link {
    background: none;
    &:first-of-type {
      &::before {
        display: none;
      }
    }
    &:not(:last-of-type) {
      margin-right: 0;
    }
  }
}
</style>