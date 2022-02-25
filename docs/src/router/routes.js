import DocLayout from 'layouts/DocLayout.vue'
import getListingComponent from 'components/getListingComponent.js'
import menu from 'assets/menu.js'
import layoutGallery from 'assets/layout-gallery.js'

const docsPages = [
  {
    path: '',
    name: 'home',
    component: () => import('pages/Homepage.vue')
  },
  {
    path: 'integrations',
    name: 'integrations',
    component: () => import('components/page-parts/platform-integrations/QuasarIntegrations.vue')
  },
  {
    // construct route for roadmap, it doesn't look like the other .mds, e.g: has no title
    path: '/start/roadmap',
    props: {
      title: 'What\'s next?',
      metaDesc: 'What\'s next for the Quasar Framework?',
      editPagePath: 'ROADMAP.md',
      metaTitle: 'Quasar Roadmap'
    },
    component: () => import('../../../ROADMAP.md')
  }
]

function parseMenuNode (node, __path) {
  const prefix = __path + (node.path !== void 0 ? '/' + node.path : '')

  if (node.children !== void 0) {
    prefix !== '/start' && docsPages.push({
      path: prefix,
      component: getListingComponent(
        node.name,
        node.children.map(node => {
          const to = node.external === true
            ? node.path
            : (
                prefix + (
                  node.path !== void 0
                    ? '/' + node.path
                    : (node.listPath !== void 0 ? '/' + node.listPath : '')
                )
              )

          if (node.external !== true && node.listPath !== void 0) {
            docsPages.push({
              path: to,
              component: getListingComponent(
                node.name,
                node.children.map(node => ({
                  title: node.name,
                  to: prefix + (node.path !== void 0 ? '/' + node.path : ''),
                  page: true
                }))
              )
            })
          }

          return {
            title: node.name,
            to,
            page: node.children === void 0
          }
        })
      )
    })

    node.children.forEach(node => parseMenuNode(node, prefix))
  }
  else if (node.external !== true) {
    docsPages.push({
      path: prefix,
      component: () => import('pages/' + prefix.substring(1) + '.md')
    })
  }
}

menu.forEach(node => {
  parseMenuNode(node, '')
})

const redirects = [
  { from: '/quasar-cli/supporting-ie', to: '/quasar-cli/browser-compatibility' },
  { from: '/quasar-cli/modern-build', to: '/quasar-cli/browser-compatibility' }
]

const routes = [
  ...redirects.map(entry => ({
    path: entry.from,
    redirect: entry.to
  })),

  {
    path: '/start',
    redirect: '/start/pick-quasar-flavour'
  },
  {
    path: '/docs',
    component: DocLayout,
    children: docsPages
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('pages/LandingPage.vue')
      },
      {
        path: 'components',
        name: 'components',
        component: () => import('pages/ComponentsPage.vue')
      }
    ]
  },

  // externals
  {
    path: '/layout-builder',
    component: () => import('layouts/LayoutBuilder.vue')
  },

  ...layoutGallery.map(layout => ({
    path: layout.demoLink,
    component: () => import('layouts/gallery/' + layout.path + '.vue'),
    children: [
      {
        path: '',
        component: () => import('components/page-parts/layout/LayoutGalleryPage.vue'),
        meta: {
          title: layout.name,
          screenshot: layout.screenshot,
          sourceLink: layout.sourceLink
        }
      }
    ]
  })),

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: DocLayout,
    children: [{
      path: '',
      component: () => import('pages/Error404.vue')
    }]
  }
]

export default routes
