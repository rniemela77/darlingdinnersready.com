<template>
  <div id="app">
    <header class="header">
      <div class="header__left"><header-logo v-if="showLogo" />s</div>

      <div class="header__right">
        <toggle-theme />
      </div>
    </header>

    <div class="filters">
      <button @click="resetFilters">All Recipes</button>

      <button
        v-for="category in $static.categories.edges"
        :key="category.node.id"
        @click="pushCategoryFilter(category.node.title)"
      >
        {{ category.node.title }}
      </button>
    </div>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}.</span>
      <span class="footer__links">
        Powered by
        <a href="//gridsome.org">Gridsome</a> &amp;
        <a href="//www.sanity.io">Sanity.io</a>
      </span>
    </footer>
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
import HeaderLogo from '~/components/HeaderLogo'
import ToggleTheme from '~/components/ToggleTheme'

export default {
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    HeaderLogo,
    ToggleTheme,
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;

  > span {
    margin: 0 0.35em;
  }

  a {
    color: currentColor;
  }
}
</style>
