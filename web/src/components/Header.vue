<template>
  <header class="header">
    <g-link to="/" class="header-title">
      <h1 class="header-title-text">Darling Dinner's Ready</h1>
    </g-link>

    <nav class="nav">
      <div class="social-media-links">
        <a
          href="https://www.youtube.com/channel/UCacKyQXP6G4L5BdCcpdik6g/videos"
          target="_blank"
          rel="noopener noreferrer"
          class="social-media-link"
          aria-label="Open YouTube channel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            viewBox="0 0 256 256"
            height="32"
            width="32"
          >
            <g fill="none" stroke-miterlimit="10" stroke-width="0">
              <path
                fill="red"
                d="M249 67c-3-11-12-19-23-22-19-5-98-5-98-5s-79 0-98 5C19 48 10 56 7 67c-5 20-5 61-5 61s0 41 5 61c3 11 12 19 23 22 19 5 98 5 98 5s79 0 98-5c11-3 20-11 23-22 5-20 5-61 5-61s0-41-5-61z"
              />
              <path fill="#fff" d="m103 167 64-39-64-36z" />
            </g>
          </svg>
        </a>
      </div>
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
.social-media-links {
  flex: 0 0 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .social-media-link {
    opacity: 0.5;
    transition: opacity var(--transition-speed);
    &:hover {
      opacity: 1;
    }
  }
}
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
      color: var(--color-font-dark);
      opacity: 0.7;
    }
  }
}
@media screen and (max-width: 1140px) {
  .header {
    flex-direction: column;
    align-items: center;
  }
  .header-title {
    margin-bottom: 2rem;
  }
}
</style>