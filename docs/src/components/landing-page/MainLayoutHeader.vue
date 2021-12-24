<template>
  <q-header class="bg-lp-dark">
    <q-toolbar class="q-px-lg q-py-md row justify-between">
      <q-btn flat @click="$emit('drawer-clicked', !showDrawer)" round dense icon="menu" v-if="$q.screen.xs" color="lp-primary"/>
      <div v-if="$q.screen.gt.xs || !searchField" class="row justify-center items-center add-vertical-bar position-relative quasar-logo cursor-pointer" @click="$router.push({name: 'home'})">
        <img v-if="$q.screen.sm" src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg" width="48" height="48" alt="Quasar Logo">
        <img v-else src="https://cdn.quasar.dev/logo-v2/svg/logo-horizontal-dark.svg" width="236" :height="$q.screen.xs? '24':'48'" alt="Quasar Logo">
      </div>

      <div class="row items-center text-size-16">
        <div v-if="$q.screen.gt.xs && showNavItems" class="toolbar-menu-items">
          <q-btn
              v-for="(navItem, navItemIndex) in navItems" :key="navItemIndex"
              :label="navItem.label"
              :to="`/${navItem.path}`"
              :color="$route.name === navItem.path? 'white' : 'lp-light'"
              class="text-weight-bold q-px-lg"
              flat
              size="16px"
          >
            <q-menu v-if="navItem.subMenu" class="shadow-bottom-small">
              <q-list>
                <q-item v-for="(menu, menuIndex) in navItem.subMenu" clickable v-close-popup :key="`menu-${menuIndex}`"
                        :to="menu.path">
                  <q-item-section>{{ menu.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
              label="Blog"
              type="a"
              href="https://dev.to/quasar"
              :color="$route.name === 'blog'? 'white' : 'lp-light'"
              target="__blank"
              class="text-weight-bold q-px-lg"
              flat
              size="16px"
          />
        </div>
        <q-form v-if="searchField" autocapitalize="off" autocomplete="off" spellcheck="false" class="search-form position-relative">
          <q-input ref="searchInputRef" autofocus v-model="searchTerms" dark dense square debounce="300" @keydown="onSearchKeydown" @focus="onSearchFocus" @blur="onSearchBlur" placeholder="Search Quasar v2...">
            <template #append>
              <q-icon name="cancel" color="lp-primary" @click.stop="toggleSearchInputField" />
            </template>
          </q-input>
          <div class="search-result-field">
            <q-scroll-area
              dark
              class="bg-dark text-white rounded-borders search-result-container"
            >
              <template v-if="searchResults !== null">
                <component v-if="searchResults.masterComponent !== void 0" :is="searchResults.masterComponent"/>
                <app-search-results v-else :results="searchResults" :search-has-focus="searchHasFocus" :search-active-id="searchActiveId"/>
              </template>
            </q-scroll-area>
          </div>
        </q-form>
        <q-btn v-if="!searchField" flat round color="lp-primary" icon="search" size="16px" align="right" @click="toggleSearchInputField"/>
      </div>

    </q-toolbar>
    <q-separator color="lp-primary"/>
    <div class="row justify-between q-py-xs q-pr-md social-links shadow-bottom-small">
      <div class="q-ml-lg q-py-xs">
        <q-btn flat @click="$emit('drawer-clicked', !showDrawer)" round dense icon="menu" v-if="$q.screen.sm" color="lp-primary"/>
        <q-btn-dropdown no-caps stretch dense auto-close unelevated class="text-bold" content-class="dropdown-menu" outline color="lp-primary">
          <template #label>
            <span class="dropdown-version-label">{{ `v${$q.version}` }}</span>
          </template>
          <q-list dense>
            <q-item-label header="header" class="text-lp-accent">Latest (v{{ $q.version }})</q-item-label>
            <q-item clickable="clickable" to="/start/release-notes">
              <q-item-section class="text-teal" avatar>
                <q-icon :name="mdiClipboardText" color="lp-primary"/>
              </q-item-section>
              <q-item-section class="text-no-wrap">Release notes</q-item-section>
            </q-item>
            <q-item clickable="clickable" tag="a" href="https://github.com/quasarframework/quasar/issues" target="_blank" rel="noopener">
              <q-item-section class="text-purple" avatar="avatar">
                <q-icon :name="mdiBugCheck" color="lp-primary"/>
              </q-item-section>
              <q-item-section class="text-no-wrap">Report a bug</q-item-section>
            </q-item>
            <q-item clickable="clickable" tag="a" href="https://github.com/quasarframework/quasar" target="_blank"
                    rel="noopener">
              <q-item-section avatar="avatar">
                <q-icon :name="fabGithub" color="lp-primary"/>
              </q-item-section>
              <q-item-section>Repository</q-item-section>
            </q-item>
            <q-separator class="q-mb-sm q-mt-md"></q-separator>
            <q-item-label header="header" class="text-lp-accent">Older Releases</q-item-label>
            <q-item key="v1-link" clickable="clickable" tag="a" href="https://v1.quasar.dev/" target="_blank"
                    rel="noopener">
              <q-item-section>v1 docs</q-item-section>
            </q-item>
            <q-item v-for="version in ['17', '16', '15', '14', '13']" :key="version" clickable="clickable" tag="a"
                    :href="`https://v0-${version}.quasar-framework.org/`" target="_blank" rel="noopener">
              <q-item-section>{{ `v0.${version}` }} docs</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div>
        <template v-if="$q.screen.gt.sm">
          <q-btn label="Why Quasar?" flat color="lp-light" no-caps size="12px" to="/introduction-to-quasar"/>
          <q-btn label="Getting Started" flat no-caps color="lp-light" size="12px" to="/start/pick-quasar-flavour"/>
          <q-btn label="Roadmap" flat no-caps color="lp-light" size="12px" to="/start/roadmap"/>
          <q-btn label="Video Tutorials" flat no-caps color="lp-light" size="12px" to="/video-tutorials"/>
          <q-btn label="Quasar Brand resources" flat no-caps color="lp-light" size="12px" type="a"
                 href="https://github.com/quasarframework/quasar-art" target="__blank"/>
        </template>
        <template v-for="(socialLink, linkIndex) in socialLinks" :key="linkIndex">
          <q-btn :icon="socialLink.icon" flat color="lp-primary" round size="md" type="a" :href="socialLink.href"
                 target="__blank"/>
        </template>
      </div>
    </div>
    <q-separator color="lp-primary"/>
  </q-header>
</template>
<script>
import { defineComponent } from 'vue'
import { mdiBugCheck, mdiClipboardText } from '@quasar/extras/mdi-v6'
import { fabGithub } from '@quasar/extras/fontawesome-v5'
import { socialLinks } from 'assets/landing-page/social-links.js'
import useSearch from 'layouts/doc-layout/use-search'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import AppSearchResults from 'components/AppSearchResults.vue'
import { ref } from 'vue'
import { Screen } from 'quasar'

export default defineComponent({
  name: 'MainLayoutHeader',
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppSearchResults
  },
  setup () {
    const $q = useQuasar()
    const $route = useRoute()
    const searchField = ref(false)
    const showNavItems = ref(true)

    const navItems = [
      {
        label: 'Docs',
        path: 'docs'
      },

      {
        label: 'Components',
        path: 'components'
      },
      {
        label: 'Become sponsor',
        path: 'sponsors-and-backers'
      },
      {
        label: 'Team',
        routeName: 'team',
        subMenu: [
          {
            label: 'Meet the Team',
            path: 'meet-the-team'
          },
          {
            label: 'Why Quasar?',
            path: 'introduction-to-quasar'
          }
        ]
      }
    ]

    function toggleSearchInputField () {
      if (searchField.value) {
        showNavItems.value = true
      }
      else if (Screen.lt.lg) {
        showNavItems.value = false
      }
      else {
        showNavItems.value = true
      }

      searchField.value = !searchField.value
    }

    const scope = {
      fabGithub,
      mdiBugCheck,
      mdiClipboardText,
      navItems,
      socialLinks,
      searchField,
      showNavItems,
      toggleSearchInputField
    }

    useSearch(scope, $q, $route)

    return scope
  }
})
</script>
<style lang="scss" scoped>
$footer-columns-md-min: 6;
$footer-columns-sm-min: 4;
$adjust-header-viewport: 860px;
$search-form-width: 300px;

.add-vertical-bar::after {
  display: none;

  @media screen and (min-width: 810px) {
    content: '';
    position: absolute;
    top: 0;
    left: 96px;
    display: block;
    border-right: 1px solid $lp-primary;
    height: 100%;

    @media screen and (min-width: $breakpoint-md-min) {
      left: 284px;
    }
  }
}

// remove some children just before xs
// remove some children just before xs
.toolbar-menu-items {
  .q-btn:nth-last-child(-n+2) {
    @media screen and (max-width: $adjust-header-viewport) {
      display: none;
    }
  }
}

.social-links {
  @media screen and (max-width: $breakpoint-xs-max) {
    display: none;
  }
}

body {
  font-family: $lp-font-family;
}

.dropdown-version-label {
  margin-right: 115px;
}

.search-form {
  width: $search-form-width;
}

.search-result-field {
  position: absolute;
  left: 0;
  z-index: 10000;
  width: $search-form-width;
}

.search-result-container {
  height: 80vh;
  max-width: $search-form-width;
}

</style>
