<template>
  <q-page class="column q-mt-xl lp-mb--large text-white q-mx-xl">
    <div class="row justify-center q-mb-lg">
      <div class="input-btn">
        <q-input
          color="white"
          input-class="search-field"
          label-color="grey-6"
          borderless
          v-model="search"
          label="Search component"
          dense
          width="xl"
          class="text-white"
        >
          <template #append>
            <q-icon name="search" size="sm" color="lp-primary" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center q-mb-md">
      <q-chip v-for="(filterChip, i) in filterChips" :key="i" color="lp-primary" clickable text-color="white" :label="filterChip"/>
    </div>
    <div class="row components">
      <q-card v-for="({name, text, imgName}, i) in components" :key="name + i" class="card text-size-16 shadow-bottom-small">
        <img :src="'components-thumbnails/' + imgName" />
        <q-card-section>
          <div class="card__title text-lp-primary text-weight-medium">{{ name }}</div>
        </q-card-section>
        <q-card-section>
          <div class="card__text text-lp-dark">{{ text }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { components } from 'src/assets/landing-page/image-links.js'

const FILTER_CHIPS = [ 'Buttons', 'Inputs', 'Loading', 'Media', 'Navigation', 'Panels & Popups', 'Scroll', 'Tables', 'Others' ]

export default defineComponent({
  name: 'Components',
  setup () {
    const search = ref('')

    watch(search, () => {
      // TODO: implement component filtering
    })

    return {
      search: '',
      filterChips: FILTER_CHIPS,
      components
    }
  }
})
</script>

<style lang="scss">
.components {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}

.card {
  transition: transform .3s;

  &__text {
    letter-spacing: 3px;
  }

  &:hover {
    box-shadow: $lp-box-shadow--large;
    transform: scale(1.03)
  }
}

.input-btn {
  padding: 0 10px 0px 10px;
  border-bottom: 1px solid $lp-primary;

  .search-field {
    color: $white;
  }
}
</style>
