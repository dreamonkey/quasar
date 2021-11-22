<template>
  <q-layout view="hHh lpR fff" class="bg-lp-dark">

    <q-header class="bg-lp-dark">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-if="$q.screen.xs" color="lp-primary" />
        <q-toolbar-title :class="$q.screen.xs? 'row justify-center items-center':''">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          QUASAR
        </q-toolbar-title>
        <q-space v-if="$q.screen.gt.xs"/>

        <div class="row items-center">
          <template v-if="$q.screen.gt.xs">
            <q-btn
              label="Home"
              color="white"
              flat
              :to="{ name: 'lpHome' }"
            />
            <q-btn
              label="Features"
              color="lp-light"
              flat
              class="q-py-sm q-px-md"
            />
            <q-btn
              color="lp-light"
              flat
              label="Services"
            />
            <q-btn
              color="lp-light"
              flat
              label="Components"
              class="q-py-sm q-px-md"
              :to="{ name: 'lpComponents' }"
            />
            <q-btn
              color="lp-light"
              flat
              label="Become sponsor"
              class="q-py-sm q-px-md"
            />
            <q-btn
              color="lp-light"
              flat
              label="About"
              class="q-py-sm q-px-md"
            />
            <q-btn
              color="lp-light"
              flat
              label="Blog"
            />
          </template>
          <q-btn flat round color="lp-primary" icon="search"/>
        </div>

      </q-toolbar>
      <q-separator color="lp-primary"/>
      <div class="row justify-end q-mr-md">
        <template v-for="(socialLink, i) in socialLinks" :key="i">
          <q-btn :icon="socialLink.icon" flat color="lp-primary" round size="sm" />
        </template>
      </div>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      overlay
      bordered
      class="bg-lp-dark"
    >
      <q-scroll-area class="fit">
        <q-list class="text-white">

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Home'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-lp-grey text-size-12 text-capitalize">
      <q-toolbar class="row justify-center bg-white">
        <template v-for="({label, to}, i) in footerToolbar" :key="i">
          <q-btn
            v-if="$q.screen.gt.xs? true:[0, 2, 3].includes(i)"
            :label="label"
            :to="to"
            color="lp-light"
            flat
            padding="md"
          />
        </template>
      </q-toolbar>
      <div class="lp-footer q-ma-xl">
        <q-list v-for="footerItem in footerItems" :key="footerItem.label">
          <q-item-label class="text-lp-dark text-weight-bold">{{ footerItem.label }}</q-item-label>
          <q-separator spaced color="lp-primary" />
          <template v-for="(item, i) in footerItem.items" :key="i">
            <q-item dense class="q-pa-none" clickable :to="item.to">
              <q-item-section class="text-lp-dark">
                {{ item.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
      <q-separator class="full-width" />
      <div class="row text-lp-dark justify-center q-my-md">
        Copyright © 2015 - 2021 PULSARDEV SRL, Razvan Stoenescu // This website has been designed in collaboration with Dreamonkey Srl
      </div>
    </q-footer>

    <scrollToTop :scroll-to-top="scrollToTop"/>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { footerToolbar, homepageFooterItems } from 'assets/landing-page/landing-page-footer.ts'
import {
  fabGithub,
  fabTwitter,
  fabFacebookSquare
} from '@quasar/extras/fontawesome-v5'
import ScrollToTop from 'src/components/landing-page/ScrollToTop.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { ScrollToTop },
  setup () {
    const drawer = ref(false)

    const menuList = [
      {
        icon: 'home',
        label: 'Home',
        separator: true
      },
      {
        icon: 'send',
        label: 'Features',
        separator: false
      },
      {
        icon: 'delete',
        label: 'Services',
        separator: false
      },
      {
        icon: 'error',
        label: 'Components',
        separator: true
      },
      {
        icon: 'settings',
        label: 'Become sponsor',
        separator: false
      },
      {
        icon: 'feedback',
        label: 'About',
        separator: false
      },
      {
        icon: 'help',
        iconColor: 'primary',
        label: 'Blog',
        separator: false
      }
    ]

    const socialLinks = [
      { icon: fabGithub, link: '#' },
      { icon: 'message', link: '#' },
      { icon: 'forum', link: '#' },
      { icon: fabTwitter, link: '#' },
      { icon: fabFacebookSquare, link: '#' }
    ]

    return {
      footerItems: homepageFooterItems,
      fabGithub,
      fabTwitter,
      fabFacebookSquare,
      socialLinks,
      footerToolbar,
      drawer,
      menuList
    }
  }
})
</script>

<style lang="scss" scoped>
$footer-columns-md-max: 6;
$footer-columns-sm-max: 4;
$footer-columns-xs-max: 1;

.lp-footer {
  display: grid;
  grid-template-columns: repeat($footer-columns-md-max, 1fr);
  @media screen and (max-width: $breakpoint-sm-max) {
    grid-template-columns: repeat($footer-columns-sm-max, 1fr);
  }
  @media screen and (max-width: $breakpoint-xs-max) {
    grid-template-columns: repeat($footer-columns-xs-max, 1fr);
  }
  grid-column-gap: 24px;
  grid-row-gap: 48px;
}
</style>
