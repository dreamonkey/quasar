<template>
  <q-form
    v-if="showSearchInputField || isOpenByDefault"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    class="search-form position-relative"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-input
        ref="searchInputRef"
        v-model="searchTerms"
        :dark="!dark"
        :bg-color="dark ? 'white-28' : 'black-12'"
        :input-class="`q-ml-xs text-size-16 letter-spacing-40 ${dark? 'text-white' : 'text-black'}`"
        :autofocus="$q.screen.lt.lg"
        standout
        dense
        debounce="300"
        hide-bottom-space
        placeholder="Search Quasar v2..."
        @keydown="onSearchKeydown"
        @focus="onSearchFocus"
      >
        <template #append>
          <kbd
            v-if="!searchHasFocus"
            class="search-key text-weight-bold cursor-pointer letter-spacing-25"
          >Ctrl K</kbd>
          <q-icon
            v-else-if="!searchTerms"
            name="search"
            size="sm"
            color="brand-primary"
          />
          <q-icon
            v-else
            name="close"
            color="brand-primary"
            class="cursor-pointer"
            @click.stop="resetSearch"
          />
        </template>
      </q-input>
    </transition>
    <div class="search-result-field rounded-borders letter-spacing-25">
      <q-scroll-area
        :class="searchResults? 'set-scrollarea-height':'scroll-area-opacity-0'"
        class="bg-white text-dark rounded-borders search-result-container shadow-bottom-medium text-size-16"
      >
        <template v-if="searchResults">
          <component
            v-if="searchResults.masterComponent !== void 0"
            :is="searchResults.masterComponent"/>
          <app-search-results
            v-else
            :results="searchResults"
            :search-has-focus="searchHasFocus"
            :search-active-id="searchActiveId"/>
        </template>
      </q-scroll-area>
    </div>
  </q-form>
  <q-btn
    v-else
    flat
    round
    color="brand-primary"
    icon="search"
  />
</template>

<script>
import AppSearchResults from 'components/search-results/AppSearchResults.vue'
import useSearch from 'layouts/doc-layout/use-search'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { defineComponent, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'SearchForm',
  components: { AppSearchResults },
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    showSearchInputField: {
      type: Boolean,
      default: false
    },
    isOpenByDefault: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const $q = useQuasar()
    const $route = useRoute()

    const scope = {}
    useSearch(scope, $q, $route)

    watch(() => props.showSearchInputField, () => {
      if (!props.showSearchInputField) {
        scope.onSearchBlur()
        scope.resetSearch()
      }
    })

    watch(() => scope.focusByKeyboard.value, () => {
      emit('focus-by-keyboard', scope.focusByKeyboard.value)
    })

    watchEffect(() => emit('search-result-change', scope.searchResults.value))

    return scope
  }
})
</script>

<style lang="scss" scoped>
$search-form-width-sm: 256px;
$search-form-width-lg: 360px;

.search-form {
  width: $search-form-width-sm;
  @media screen and (min-width: $breakpoint-xs-max) {
    width: $search-form-width-lg;
  }

  .search-key {
    font-size: .5em !important;
    min-width: 1.6em;
    min-height: 1.5em;
  }
}

.search-result-field {
  position: absolute;
  left: 0;
  z-index: 10000;
  width: $search-form-width-sm;
  @media screen and (min-width: $breakpoint-xs-max) {
    width: $search-form-width-lg;
  }
}

.search-result-container {
  transition: height .3s ease-in-out;
  max-width: $search-form-width-sm;
  @media screen and (min-width: $breakpoint-xs-max) {
    max-width: $search-form-width-lg;
  }
}

.scroll-area-opacity-0 {
  height: 0;
}

.set-scrollarea-height {
  height: 90vh;
}

</style>
