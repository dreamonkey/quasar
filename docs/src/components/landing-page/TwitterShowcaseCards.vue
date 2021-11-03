<template>
  <q-carousel
    v-model="slide"
    transition-prev="scale"
    transition-next="scale"
    swipeable
    animated
    navigation
    padding
    arrows
    height="400px"
    class="bg-transparent rounded-borders"
    keep-alive
    >
    <template v-slot:navigation-icon="{ active, btnProps, onClick }">
      <q-btn
        v-if="active"
        size="xs"
        :icon="btnProps.icon"
        color="lp-primary"
        flat
        round
        dense
        @click="onClick"
      />
      <q-btn
        v-else
        size="xs"
        :icon="btnProps.icon"
        color="grey-8"
        flat
        round
        dense
        @click="onClick"
      />
    </template>
    <q-carousel-slide :name="slideIndex" class="showcase-cards text-size-10" v-for="(tweetGroup, slideIndex) in tweetGroups" :key="`slide-${slideIndex}`">
      <div class="carousel-grid">
        <div v-for="(tweetId, cardIndex) in tweetGroup" :key="`twitter-card-${cardIndex}`">
          <twitter-card :tweetId="tweetId"/>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TwitterCard from 'src/components/landing-page/TwitterCard'

// TODO: fix the issue causing ONLY the first tweet group (slide 1) display
const scriptElement = document.createElement('script')
scriptElement.setAttribute('src', 'https://platform.twitter.com/widgets.js')
scriptElement.setAttribute('charset', 'utf-8')
document.head.appendChild(scriptElement)

export default defineComponent({
  name: 'TwitterShowcaseCards',
  components: { TwitterCard },
  setup () {
    const slide = ref(0)
    const tweetGroups = [
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ],
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ],
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ],
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ],
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ],
      [
        '1453670879825629189',
        '1453670879825629189',
        '1453670879825629189'
      ]
    ]

    return {
      slide,
      tweetGroups
    }
  }
})
</script>

<style lang="scss">
.carousel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 16px;
  align-content: center;
}
.showcase-cards {
  // prevent tweets with content larger than tweet height from overflowing.
  // Necessary for responsiveness
  overflow: hidden;
}
</style>
