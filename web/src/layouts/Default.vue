<template>
  <div id="app">
    <!-- <header-logo v-if="showLogo" /> -->
    <Header />

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright"
        >Copyright © {{ new Date().getFullYear() }}.</span
      >
      <span class="footer__links">
        Powered by
        <a href="//gridsome.org">Gridsome</a> &amp;
        <a href="//www.sanity.io">Sanity.io</a>
      </span>
    </footer>
  </div>
</template>




<script>
import HeaderLogo from '~/components/HeaderLogo'
import ToggleTheme from '~/components/ToggleTheme'
import Header from '~/components/Header'

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
    Header,
  },
}
</script>

<style lang="scss">
.main {
  background: var(--color-main-bg);
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 1rem 2rem;
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
