<template>
  <div id="app">
    <div class="bg"></div>
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
.bg {
  // TODO: selfhost image
  // TODO: edit image instead of using css
  background-image: url('https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
  background-size: cover;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  position: fixed;
  mix-blend-mode: multiply;
  filter: grayscale(30%) hue-rotate(200deg);
  opacity: 0.1;
}
.main {
  background: var(--color-main-bg);
  max-width: var(--content-max-width);
  width: var(--content-width);
  margin: 0 auto;
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
