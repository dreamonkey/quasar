<template>
  <q-header class="bg-lp-dark header">
    <q-toolbar :class="$q.screen.xs? 'shadow-bottom-small':''" class="q-pl-lg q-pr-md q-py-md row justify-between" >
      <q-btn flat @click="$emit('update:modelValue', !modelValue)" round dense icon="menu" v-if="$q.screen.xs" color="lp-primary"/>
      <div v-if="$q.screen.gt.xs || !searchField" class="row justify-center items-center add-vertical-bar position-relative quasar-logo cursor-pointer" @click="$router.push({name: 'home'})">
        <img v-if="$q.screen.sm" src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg" width="48" height="48" alt="Quasar Logo">
        <img v-else src="https://cdn.quasar.dev/logo-v2/svg/logo-horizontal-dark.svg" width="236" :height="$q.screen.xs? '24':'48'" alt="Quasar Logo">
      </div>

      <div class="row items-center text-size-16">
        <div v-if="$q.screen.gt.xs && showNavItems" class="toolbar-menu-items">
          <q-btn
              v-for="(navItem, navItemIndex) in navItems.mainNavItems" :key="navItemIndex"
              :label="navItem.label"
              :to="computeRouteNav(navItem)"
              :href="computeRouteNav(navItem, 'href')"
              :target="navItem.href? '_blank':'_self'"
              :color="$route.path === `/${navItem.path}`? 'white' : 'lp-light'"
              class="text-weight-bold q-px-lg"
              flat
              size="16px"
          >
            <q-menu v-if="navItem.subMenu" class="shadow-bottom-small">
              <nav-dropdown-menu :nav-items="navItem.subMenu"/>
            </q-menu>
          </q-btn>
        </div>
        <q-form v-if="searchField" autocapitalize="off" autocomplete="off" spellcheck="false" class="search-form position-relative">
          <q-input ref="searchInputRef" autofocus v-model="searchTerms" dark dense square debounce="300" @keydown="onSearchKeydown" @focus="onSearchFocus" @blur="onSearchBlur" placeholder="Search Quasar v2...">
            <template #append>
              <q-icon name="cancel" color="lp-primary" @click.stop="toggleSearchInputField" />
            </template>
          </q-input>
          <div class="search-result-field">
            <q-scroll-area dark class="bg-dark text-white rounded-borders search-result-container">
              <template v-if="searchResults !== null">
                <component v-if="searchResults.masterComponent !== void 0" :is="searchResults.masterComponent"/>
                <app-search-results v-else :results="searchResults" :search-has-focus="searchHasFocus" :search-active-id="searchActiveId"/>
              </template>
            </q-scroll-area>
          </div>
        </q-form>
        <q-btn v-if="!searchField" flat round color="lp-primary" icon="search" size="16px" @click="toggleSearchInputField"/>
      </div>

    </q-toolbar>
    <q-separator color="lp-primary"/>
    <template v-if="$q.screen.gt.xs">
      <div class="row justify-between q-py-xs q-pr-md social-links shadow-bottom-small">
        <div class="row items-center q-ml-lg">
          <q-btn flat @click="$emit('update:modelValue', !modelValue)" round dense icon="menu" v-if="$q.screen.sm" color="lp-primary"/>
          <q-btn-dropdown no-caps dense auto-close class="text-bold" outline color="lp-primary">
            <template #label>
              <span class="dropdown-version-label">{{ `v${$q.version}` }}</span>
            </template>
            <nav-dropdown-menu :nav-items="versionHistory"/>
          </q-btn-dropdown>
          <template v-if="$q.screen.width < showMoreNavDropdownViewPort">
            <q-separator vertical color="lp-primary" class="q-ml-md q-mr-sm nav-dropdown-vertical-separator"/>
            <q-btn-dropdown color="lp-primary" no-caps dense label="More" flat menu-anchor="bottom right" :menu-offset="[150, 5]">
              <nav-dropdown-menu :nav-items="moreNavItems"/>
            </q-btn-dropdown>
          </template>
        </div>
        <div>
          <template v-if="$q.screen.gt.sm">
            <q-btn
              v-for="(subNavItem, navIndex) in navItems.subNavItems"
              :key="`nav-${navIndex}`"
              :label="subNavItem.label"
              :to="computeRouteNav(subNavItem)"
              :href="computeRouteNav(subNavItem, 'href')"
              :target="subNavItem.href? '_blank':'_self'"
              flat
              color="lp-light"
              no-caps
              size="12px"
              class="secondary-header-links"
            >
              <q-menu v-if="subNavItem.subMenu" class="shadow-bottom-small">
                <nav-dropdown-menu :nav-items="subNavItem.subMenu"/>
              </q-menu>
            </q-btn>
          </template>
          <template v-for="(socialLink, linkIndex) in socialLinks" :key="linkIndex" >
            <q-btn :icon="socialLink.icon" flat color="lp-primary" round size="md" type="a" :href="socialLink.href" target="__blank"/>
          </template>
        </div>
      </div>
      <q-separator color="lp-primary"/>
    </template>
  </q-header>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { mdiBugCheck, mdiClipboardText } from '@quasar/extras/mdi-v6'
import { fabGithub } from '@quasar/extras/fontawesome-v5'
import { socialLinks } from 'assets/landing-page/social-links.js'
import useSearch from 'layouts/doc-layout/use-search'
import { Screen, useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import AppSearchResults from 'components/AppSearchResults.vue'
import { navItems } from 'assets/landing-page/nav-items.js'
import { computeRouteNav } from 'assets/landing-page/nav-items.js'
import NavDropdownMenu from 'components/landing-page/NavDropdownMenu'

export default defineComponent({
  name: 'MainLayoutHeader',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NavDropdownMenu,
    AppSearchResults
  },
  setup () {
    const $q = useQuasar()
    const $route = useRoute()
    const searchField = ref(false)
    const showNavItems = ref(true)
    const showMoreNavDropdownViewPort = 1272

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

    const versionHistory = [
      {
        label: `Latest (v${$q.version})`,
        isHeader: true
      },
      {
        label: 'Release notes',
        icon: mdiClipboardText,
        path: 'start/release-notes'
      },
      {
        label: 'Report a bug',
        icon: mdiBugCheck,
        href: 'https://github.com/quasarframework/quasar/issues'
      },
      {
        label: 'Repository',
        icon: fabGithub
      },
      {
        isSeparator: true
      },
      {
        label: 'Older Releases',
        isHeader: true
      },
      {
        label: 'v1 docs',
        href: 'https://v1.quasar.dev/'
      },
      {
        label: 'v0.17 docs',
        href: 'https://v0-17.quasar-framework.org/'
      },
      {
        label: 'v0.16 docs',
        href: 'https://v0-16.quasar-framework.org/'
      },
      {
        label: 'v0.15 docs',
        href: 'https://v0-15.quasar-framework.org/'
      },
      {
        label: 'v0.14 docs',
        href: 'https://v0-14.quasar-framework.org/'
      },
      {
        label: 'v0.13 docs',
        href: 'https://v0-13.quasar-framework.org/'
      }
    ]

    // add components nav item to the 'More' dropdown
    const moreNavItems = [
      {
        label: 'Components',
        path: 'components'
      },
      ...navItems.subNavItems
    ]

    const scope = {
      fabGithub,
      mdiBugCheck,
      mdiClipboardText,
      navItems,
      socialLinks,
      searchField,
      showNavItems,
      versionHistory,
      moreNavItems,
      showMoreNavDropdownViewPort,
      computeRouteNav,
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
// FIXME: this is a quick for the header misbehaving at this viewport, may have to figure a much better way to do this
$adjust-secondary-header-viewport: 1272px;

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

// remove second child, (components nav)
.toolbar-menu-items {
  .q-btn:nth-child(2) {
    @media screen and (max-width: $adjust-header-viewport) {
      display: none;
    }
  }
}

.social-links {
  @media screen and (max-width: $adjust-secondary-header-viewport) {
    .secondary-header-links {
      display: none;
    }
  }
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

.nav-dropdown-vertical-separator {
  height: 48px;
}

.header {
  font-family: $lp-font-family;
}
</style>
