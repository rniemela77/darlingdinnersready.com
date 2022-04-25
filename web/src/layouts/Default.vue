<template>
  <div id="app">
    <div class="bg"></div>
    <!-- <header-logo v-if="showLogo" /> -->
    <Header />

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p class="footer-title">Darling Dinner's Ready</p>
      <p>Copyright © {{ new Date().getFullYear() }}.</p>
      <p>
        Contact the author at
        <a href="mailto:frozentears05@msn.com">frozentears05@msn.com</a>
      </p>
      <p>
        Contact the developer at
        <a href="mailto:rvniemela@hotmail.com">rvniemela@hotmail.com</a>
      </p>
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
  padding: 2rem clamp(0rem, 2vw, 4rem);
}
.footer {
  padding: 3rem 0;
  text-align: center;
  color: var(--color-font-dark);
  font-size: 0.8rem;
  .footer-title {
    font-size: 1.25rem;
    padding: 1rem 0;
  }
  a {
    color: var(--color-font-dark);
  }
}
</style>
