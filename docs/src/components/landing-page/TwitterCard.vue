/* eslint-disable quotes */
<template>
<blockquote class="twitter-tweet">
  <a :href="`https://twitter.com/marsdevs/status/${tweetId}`"></a>
</blockquote>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TwitterCard',
  props: {
    tweetId: {
      required: true,
      type: String
    }
  },
  setup () {
    // FIX: If this is uncommented then the rest of the cards load normally, else only the first loads
    // const scriptElement = document.createElement('script')
    // scriptElement.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    // scriptElement.setAttribute('charset', 'utf-8')
    // document.head.appendChild(scriptElement)

    return {
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
