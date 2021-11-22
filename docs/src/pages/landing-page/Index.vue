<template>
  <q-page class="text-white">

    <div class="row flex-center q-my-xl">

      <div class="col-md-6 col-xs-12 column items-center text-center">
        <q-img src="~assets/landing-page/quasar-logo/logo-with-payoff.svg" width="250px" />

        <div class="q-py-lg text-lp-light text-size-20">
          The open source multi-platform development framework based on Vue.js
          with an enterprise vocation.
        </div>

        <q-btn
          color="lp-accent"
          label="Take a look across the stars"
          padding="md"
          class="text-size-14 text-bold shadow-bottom-small"
        />

        <div class="q-mt-lg">
          <q-btn
            flat
            round
            icon="arrow_downward"
            class="text-white"
            size="lg"
            padding="none"
          />
        </div>
      </div>
    </div>

    <div class="q-mt-sm sponsors">
      <div class="text-lp-primary text-center text-size-16 text-capitalize">
        Our platform sponsors
      </div>
      <div class="sponsors__logos row col-6 col-sm-4 justify-center">
        <template v-for="(src, index) in sponsorLogos.platinum" :key="index">
          <q-img :src="`sponsor-logos/${src}`" width="200px"/>
        </template>
      </div>
      <div class="row justify-center text-size-16">
        <q-btn
          flat
          padding="none"
          text-color="lp-light"
          no-caps
          label="Full sponsor's list"
          class="lp-btn-underline"
        />
      </div>
    </div>

    <div class="q-my-xl">
      <div class="lp-heading lp-heading--large q-mb-xl">
        Why should your team choose quasar?
      </div>

      <div class="why-quasar-grid">
        <template v-for="({icon, title, body, btnLabel, btnLink}, i) in whyQuasar" :key="i">
          <why-quasar-card
            :icon="icon"
            :title="title"
            :body="body"
            :btn-label="btnLabel"
            :btn-link="btnLink"
          />
        </template>
      </div>

      <div class="q-mt-xl column items-center">
        <div
          class="lp-heading lp-heading--medium">
          Still Doubtful?
        </div>

        <div class="lp-heading lp-heading--small">
          "This framework's got a few surprises left in it, sweetheart!"
        </div>

        <div>
          <q-btn
            color="lp-accent"
            class="shadow-bottom-small q-my-md"
            label="Find out more"
          />
        </div>
      </div>
    </div>

    <div class="window-height row justify-center items-end">
      <div class="col-9 relative-position">
        <q-img src="~assets/landing-page/homepage-background-images/astronaut-on-moon.jpg" />
        <div class="column items-end absolute-bottom-right lp-mb--large">
          <div class="lp-heading lp-heading--large text-right">
            Advanced scaffolding
          </div>

          <div class="text-right lp-heading--small q-mb-md">
            Get all you need to setup your project basic
            <span class="block">features and save time</span>
          </div>
          <q class="lp-heading--quote">He who controls Scaffolding, controls the universe</q>
          <q-btn
            class="shadow-bottom-small q-mt-md"
            color="lp-accent"
            label="Consult pricing"
          />
        </div>
      </div>
    </div>

    <div class="community window-height">
      <div class="row justify-center">
        <div class="col-8 text-center">
          <q-icon
            size="xl"
            name="img:homepage-icons/astronaut.svg"
          />
          <div class="lp-heading lp-heading--large">
            What our community thinks of quasar
          </div>
          <div class="lp-heading lp-heading--small">
            "You've never heard of Quasar? It's the framework that made a mobile
            app, desktop app and browser extension altogether in less than 12 minutes."
          </div>
        </div>
      </div>
      <twitter-showcase-cards />
    </div>

    <div class="window-height row justify-center relative-position" >
      <div class="col-8 support-quasar">
        <div class="lp-heading--large">
          Support quasar: Become sponsor!
        </div>

        <div class="lp-heading--small text-left">
          Working for a company or freelancer? You can contribute, ever a bit and getting something back.
        </div>

        <div class="q-my-md lp-heading--quote">
          <q>So, um, we think we should discuss the bonus situation</q>
        </div>

        <q-btn
          color="lp-accent"
          label="Consult tiers"
          padding="sm"
          class="text-size-14 text-bold shadow-bottom-small"
        />
      </div>

      <q-img class="astronaut-hand astronaut-hand--left" src="~assets/landing-page/homepage-background-images/astronaut-left-hand.png" />
      <q-img class="astronaut-hand astronaut-hand--right" src="~assets/landing-page/homepage-background-images/astronaut-right-hand.png" />
    </div>

    <div class="text-center lp-mb--large">
      <q-icon size="xl" name="img:homepage-icons/medal.svg" />
      <div class="lp-heading lp-heading--large">Our Sponsors</div>
      <div class="lp-heading lp-heading--small">Every space odyssey has its patrons</div>
      <div class="row justify-center">
        <div class="col-8 text-size-12">
          <div class="q-my-md">Platinum Sponsors</div>
          <q-img :src="`sponsor-logos/${src}`" width="200px" v-for="(src, i) in sponsorLogos.platinum" :key="i" />
          <div class="q-my-md">Gold Sponsors</div>
          <q-img :src="`sponsor-logos/${src}`" width="200px" v-for="(src, i) in sponsorLogos.gold" :key="i" />
          <div class="q-my-md">Silver Sponsors</div>
          <q-img :src="`sponsor-logos/${src}`" width="200px" v-for="(src, i) in sponsorLogos.silver" :key="i" />
        </div>
      </div>
    </div>

    <div class="text-center social-channels-call-to-action">
      <q-img src="~assets/landing-page/homepage-background-images/planet.png">
        <div class="absolute-bottom bg-transparent">
          <q-icon size="xl" name="img:homepage-icons/satellite.svg" />
          <div class="lp-heading lp-heading--large">Don't miss the news </div>
          <div class="lp-heading lp-heading--small">Follow our social pages to stay up to date</div>
          <div class="row justify-center q-mb-xl q-mt-md q-gutter-x-md q-gutter-y-md">
            <q-btn label="Facebook" color="lp-accent" outline/>
            <q-btn label="Twitter" color="lp-accent" outline/>
            <q-btn label="Forum" color="lp-accent" outline/>
            <q-btn label="Discord" color="lp-accent" outline/>
          </div>
        </div>
      </q-img>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import WhyQuasarCard from 'src/components/landing-page/WhyQuasarCard'
import { sponsorLogos, whyQuasar } from 'src/assets/landing-page/image-links'
import TwitterShowcaseCards from 'src/components/landing-page/TwitterShowcaseCards'

export default defineComponent({
  name: 'Index',
  components: { TwitterShowcaseCards, WhyQuasarCard },
  setup () {
    return {
      whyQuasar,
      sponsorLogos
    }
  }
})
</script>

<style scoped lang="scss">
.lp-btn-underline {
  border-bottom: 1px solid $lp-light;
}

.social-channels-call-to-action {
  // TODO: reduce image height (from top), and remove this negative margin
  margin-top: -30%;
}

.why-quasar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 0 auto;
  width: 80%;
}

.astronaut-hand {
  z-index: 0; // ensure image is always displayed behind text
  width: 53%;
  position: absolute;

  &--left {
    left: 0;
    bottom: 0;

    @media screen and (max-width: $breakpoint-sm-max) {
      top: 60%;
      bottom: inherit;
    }
  }

  &--right {
    top: 0;
    right: 0;

    @media screen and (max-width: $breakpoint-sm-max) {
      top: 47%;
    }
  }
}

.support-quasar {
  z-index: 1;
}
</style>
