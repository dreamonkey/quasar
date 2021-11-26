<template>
  <q-carousel
    v-model="slide"
    transition-prev="scale"
    transition-next="scale"
    swipeable
    animated
    navigation
    padding
    :arrows="$q.screen.gt.xs"
    :height="$q.screen.gt.xs? '450px' : '410px'"
    class="bg-transparent"
    keep-alive
    @transition="loadTweets"
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
        <div v-for="(tweetId, cardIndex) in tweetGroup" :key="`twitter-card-${cardIndex}`" class="tweeter-tweet">
          <div :id="`tweet-container-${tweetId}`"></div>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { Screen } from 'quasar'

const scriptElement = document.createElement('script')
scriptElement.setAttribute('src', 'https://platform.twitter.com/widgets.js')
scriptElement.setAttribute('charset', 'utf-8')
document.head.appendChild(scriptElement)

const INITIAL_TWEET_GROUP_INDEX = 0

const SHOW_CASE_TWEETS = [
  '1138034912232185856',
  '971542817834074113',
  '1317128110509379585',
  '1215238079868538880',
  '1260959783496101894',
  '1044280073690517504',
  '1217321922402250752',
  '1453670879825629189',
  '1209117858904629248',
  '1185955239343476737',
  '1398305954882543616',
  '1377514650212970497',
  '1315274816354750465',
  '1301171191269462017',
  '1301043009987866624',
  '1250060119402065923',
  '1221914932402442240',
  '1258436297087086594'
]

function splitArrayIntoChunks (arrayToChunk, chunkLength) {
  const chunkedArray = []
  let indexOfArray = 0

  while (indexOfArray < arrayToChunk.length) {
    chunkedArray.push(arrayToChunk.slice(indexOfArray, indexOfArray += chunkLength))
  }
  return chunkedArray
}

async function getTwitterInstance () {
  return new Promise(resolve => {
    scriptElement.onload = () => {
      resolve(window.twttr)
    }
  })
}

export default defineComponent({
  name: 'TwitterShowcaseCards',
  setup () {
    const tweetGroups = computed(() => {
      // create tweet groups depending on the size of the screen
      if (Screen.xs) {
        return splitArrayIntoChunks(SHOW_CASE_TWEETS, 1)
      }
      if (Screen.sm) {
        return splitArrayIntoChunks(SHOW_CASE_TWEETS, 2)
      }

      return splitArrayIntoChunks(SHOW_CASE_TWEETS, 3)
    })

    const slide = ref(INITIAL_TWEET_GROUP_INDEX)
    let twitterInstance = null
    const alreadyDisplayedTweetGroupsIndexes = []

    function createTweetCard (twitterInstance, tweetId, tweetContainerId) {
      twitterInstance.widgets.createTweet(
        tweetId,
        document.getElementById(tweetContainerId),
        {
          theme: 'light',
          conversation: 'none',
          cards: 'hidden',
          hide_thread: true,
          align: 'center'
        }
      )
    }

    onMounted(async () => {
      twitterInstance = await getTwitterInstance()

      // display first tweet group
      tweetGroups.value[ INITIAL_TWEET_GROUP_INDEX ].forEach(tweetId => {
        createTweetCard(twitterInstance, tweetId, `tweet-container-${tweetId}`)
      })
      alreadyDisplayedTweetGroupsIndexes.push(INITIAL_TWEET_GROUP_INDEX)
    })

    function loadTweets () {
      // do not create card if it has already been rendered
      if (!alreadyDisplayedTweetGroupsIndexes.includes(slide.value)) {
        tweetGroups.value[ slide.value ].forEach(tweetId => {
          createTweetCard(twitterInstance, tweetId, `tweet-container-${tweetId}`)
        })
        alreadyDisplayedTweetGroupsIndexes.push(slide.value)
      }
    }

    return {
      slide,
      tweetGroups,
      loadTweets
    }
  }
})
</script>

<style lang="scss">
.carousel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: $breakpoint-sm-max) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: $breakpoint-xs-max) {
    grid-template-columns: 1fr
  }
  grid-column-gap: 16px;
  align-content: center;
  flex: 1;
}
.showcase-cards {
  // prevent tweets with content larger than tweet height from overflowing.
  // Necessary for responsiveness
  overflow: hidden;
  display: flex;
  justify-content: center
}
.twitter-tweet {
  box-shadow: 0 8px 12px 0 rgba($lp-primary, 0.4);
  border-radius: 20px;
  overflow: hidden;
  background-color: $white;
  max-width: 100%;
}
</style>
