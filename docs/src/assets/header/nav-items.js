import { fasCubes } from '@quasar/extras/fontawesome-v5'
import {
  mdiBug, mdiClipboardText, mdiCodepen, mdiFlare, mdiFlask, mdiGithub, mdiJsfiddle, mdiPaletteSwatch, mdiPuzzle, mdiShoppingMusic,
  mdiStarCircle, mdiThemeLightDark, mdiViewDashboard
} from '@quasar/extras/mdi-v6'
import { socialLinks } from '../social-links'

export const getVersionHistory = (quasarVersion) => [
  {
    label: `Latest (v${quasarVersion})`,
    isHeader: true
  },
  {
    label: 'Release notes',
    icon: mdiClipboardText,
    path: 'start/release-notes'
  },
  {
    label: 'Report a bug',
    icon: mdiBug,
    href: 'https://github.com/quasarframework/quasar/issues'
  },
  {
    label: 'Repository',
    icon: mdiGithub,
    href: 'https://github.com/quasarframework'
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

const gettingStartedNavItem = {
  label: 'Getting Started',
  name: 'getting-started',
  subMenu: [
    {
      label: 'Quick Start',
      path: 'start/quick-start'
    },
    {
      label: 'Installation',
      subMenu: [
        {
          label: 'Pick Quasar Flavour',
          path: 'start/pick-quasar-flavour'
        },
        {
          label: 'Quasar CLI',
          path: 'start/quasar-cli'
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
          label: 'Vite Plugin',
          path: 'start/vite-plugin'
        }
      ]
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
      label: 'Upgrade Guide',
      path: 'start/upgrade-guide'
    },
    {
      label: 'VS Code Configuration',
      path: 'start/vs-code-configuration'
    }
  ]
}

export const toolsNavItem = {
  label: 'Tools',
  name: 'tools',
  subMenu: [
    {
      label: 'Awesome List',
      icon: mdiFlare,
      href: 'https://awesome.quasar.dev'
    },
    {
      label: 'App Extensions',
      icon: mdiPuzzle,
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
      icon: mdiThemeLightDark,
      path: 'style/dark-mode'
    },
    {
      label: 'Layout Builder',
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
      icon: mdiFlask,
      path: 'layout/grid/flex-playground'
    },
    {
      label: 'Playground',
      isHeader: true
    },
    {
      label: 'Codepen',
      icon: mdiCodepen,
      href: 'https://codepen.quasar.dev'
    },
    {
      label: 'jsFiddle',
      icon: mdiJsfiddle,
      href: 'https://jsfiddle.quasar.dev'
    },
    {
      label: 'Codesandbox',
      icon: fasCubes,
      href: 'https://codesandbox.quasar.dev'
    }
  ]
}

const docsNavItem = {
  label: 'Docs',
  path: 'docs'
}

const componentsNavItem = {
  label: 'Components',
  path: 'vue-components/grid'
}

const socialsNavItem = {
  label: 'Socials',
  name: 'socials',
  subMenu: socialLinks
}

export const expandedHeaderMainToolbarNavItems = [
  docsNavItem,
  componentsNavItem,
  {
    label: 'Sponsor',
    path: 'sponsors-and-backers'
  },
  {
    label: 'Team',
    path: 'meet-the-team'
  },
  {
    label: 'Blog',
    name: 'blog',
    href: 'https://dev.to/quasar'
  }
]
export const expandedHeaderSecondaryToolbarNavItems = [
  {
    label: 'Why Quasar?',
    path: 'introduction-to-quasar'
  },
  gettingStartedNavItem,
  toolsNavItem,
  {
    label: 'Announcements',
    name: 'announcements',
    href: 'https://github.com/quasarframework/quasar/discussions/categories/announcements'
  },
  {
    label: 'Roadmap',
    href: 'https://roadmap.quasar.dev/'
  },
  {
    label: 'Video Tutorials',
    path: 'video-tutorials'
  },
  {
    label: 'Brand resources',
    name: 'brand-resources',
    href: 'https://github.com/quasarframework/quasar-art'
  },
  socialsNavItem
]

export const expandedHeaderMoreDropdownNavItems = [
  componentsNavItem,
  ...expandedHeaderSecondaryToolbarNavItems
]

export const denseHeaderNavItems = [
  docsNavItem,
  componentsNavItem,
  gettingStartedNavItem,
  toolsNavItem
]

export function filterNavItems (navItems, pagesToHide) {
  return navItems.filter(({ name, path }) => !pagesToHide.includes(name ?? path))
}

export function computeRouteNav (navItem, navType = 'to') {
  if (navType === 'href') {
    return navItem.href || undefined
  }
  return !navItem.subMenu ? `/${navItem.path}` : undefined
}
