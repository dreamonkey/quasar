import DocLayout from 'layouts/DocLayout.vue'
import MainLayout from 'layouts/MainLayout.vue'
import getListingComponent from 'components/getListingComponent.js'
import menu from 'assets/menu.json'
import layoutGallery from 'assets/layout-gallery.js'

const mdPageList = import.meta.glob('../pages/**/*.md')
const mdGalleryPageList = import.meta.glob('../layouts/gallery/*.vue')

const docsPages = [
  {
    path: '',
    name: 'home',
    component: () => import('../pages/Homepage.vue')
  },
  {
    path: 'integrations',
    name: 'integrations',
    component: () => import('../pages/Integrations.vue')
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
      component: mdPageList[ `../pages${prefix}.md` ]
    })
  }
}

menu.forEach(node => {
  parseMenuNode(node, '')
})

// remove components grid from DocPages (and avoid using DocLayout), use layout from MainLayout
docsPages.forEach((doc, index) => {
  if (doc.path === '/vue-components/grid') {
    docsPages.splice(index, 1)
  }
})

const redirects = [
  { from: '/quasar-cli/supporting-ie', to: '/quasar-cli-webpack/browser-compatibility' },
  { from: '/quasar-cli/modern-build', to: '/quasar-cli-webpack/browser-compatibility' },
  { from: '/quasar-cli/quasar-conf-js', to: '/quasar-cli-webpack/quasar-config-js' }
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
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'landing',
        component: () => import('../pages/LandingPage.vue')
      },
      {
        path: 'vue-components/grid',
        name: 'components-grid',
        component: () => import('../pages/ComponentsPage.vue')
      }
    ]
  },

  // externals
  {
    path: '/layout-builder',
    component: () => import('../layouts/LayoutBuilder.vue')
  },

  ...layoutGallery.map(layout => ({
    path: layout.demoLink,
    component: mdGalleryPageList[ `../layouts/gallery/${layout.path}.vue` ],
    children: [
      {
        path: '',
        component: () => import('../components/page-parts/layout/LayoutGalleryPage.vue'),
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
      component: () => import('../pages/Error404.vue')
    }]
  }
]

export default routes
