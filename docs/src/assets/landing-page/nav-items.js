import {
  mdiFilePlus,
  mdiFlare, mdiInvertColors,
  mdiPaletteSwatch,
  mdiShoppingMusic,
  mdiStarCircle,
  mdiViewDashboard
} from '@quasar/extras/mdi-v6'
import { fabCodepen, fabJsfiddle, fasCubes, fasFlask } from '@quasar/extras/fontawesome-v5'

export const navItems = {
  mainNavItems: [
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
      label: 'About',
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
    },
    {
      label: 'Blog',
      href: 'https://dev.to/quasar'
    }
  ],
  subNavItems: [
    {
      label: 'Why Quasar?',
      path: 'introduction-to-quasar'
    },
    {
      label: 'Getting Started',
      subMenu: [
        {
          label: 'Pick Quasar Flavour',
          path: 'start/pick-quasar-flavour'
        },
        {
          label: 'Quasar CLI',
          path: 'quasar-cli'
        },
        {
          label: 'UMD / Standalone',
          path: 'start/umd'
        },
        {
          label: 'Vue CLI Plugin',
          path: 'start/vue-cli-plugin'
        },
        {
          label: 'How to use Vue',
          path: 'start/how-to-use-vue'
        },
        {
          label: 'Playground',
          path: 'start/playground'
        },
        {
          label: 'Release Notes',
          path: 'start/release-notes'
        },
        {
          label: 'Upgrade Guide',
          path: 'start/upgrade-guide'
        },
        {
          label: 'VS Code Configuration',
          path: 'start/vs-code-configuration'
        }
      ]
    },
    {
      label: 'Tools',
      subMenu: [
        {
          label: 'Awesome List',
          icon: mdiFlare,
          href: 'https://awesome.quasar.dev'
        },
        {
          label: 'App Extensions',
          icon: mdiFilePlus,
          path: 'app-extensions/discover'
        },
        {
          label: 'Helpers',
          isHeader: true
        },
        {
          label: 'Icon Genie CLI',
          icon: mdiStarCircle,
          path: 'icongenie'
        },
        {
          label: 'Theme Builder',
          icon: mdiPaletteSwatch,
          path: 'style/theme-builder'
        },
        {
          label: 'Dark Mode',
          icon: mdiInvertColors,
          path: 'style/dark-mode'
        },
        {
          label: 'Layout Build',
          icon: mdiViewDashboard,
          href: 'layout-builder'
        },
        {
          label: 'Layout Gallery',
          icon: mdiShoppingMusic,
          path: 'layout/gallery'
        },
        {
          label: 'Flex Playground',
          icon: fasFlask,
          path: 'layout/grid/flex-playground'
        },
        {
          label: 'Playground',
          isHeader: true
        },
        {
          label: 'Codepen',
          icon: fabCodepen,
          href: 'https://codepen.quasar.dev'
        },
        {
          label: 'jsFiddle',
          icon: fabJsfiddle,
          href: 'https://jsfiddle.quasar.dev'
        },
        {
          label: 'Codesandbox',
          icon: fasCubes,
          href: 'https://codesandbox.quasar.dev'
        }
      ]
    },
    {
      label: 'Announcements',
      href: 'https://forum.quasar-framework.org/category/1/announcements'
    },
    {
      label: 'Roadmap',
      path: 'start/roadmap'
    },
    {
      label: 'Video Tutorials',
      path: 'video-tutorials'
    },
    {
      label: 'Quasar Brand resources',
      href: 'https://github.com/quasarframework/quasar-art'
    }
  ]
}
