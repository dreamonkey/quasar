<template>
  <div v-html="cardContent">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fabTwitter } from '@quasar/extras/fontawesome-v5'

export default defineComponent({
  name: 'ShowCaseCard',
  props: {
    cardContent: {
      required: true,
      type: String
    }
  },
  setup () {
    const scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    scriptElement.setAttribute('charset', 'utf-8')
    document.head.appendChild(scriptElement)

    return {
      fabTwitter
    }
  }
})
</script>

<style lang="scss">
.twitter-tweet {
  box-shadow: 0 8px 12px 0 rgba($lp-primary, 0.4);
  border-radius: 10px;
  overflow: hidden;
  background-color: $white;
  max-width: 100%;
}
</style>
