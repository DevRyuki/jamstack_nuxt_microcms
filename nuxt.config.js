import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jamstack-nuxtjs',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 速度向上のためのやつ
    // https://tech.holmescloud.com/entry/2020/12/14/161147
    // parallel: true,
    // cache: true,
    // hardSource: true,

    // dotenvを使えるようにするやつ
    extend: function (config, {isDev, isClient}) {
      config.node = {
          fs: "empty"
      }
    }
  },
  generate: {
    async routes() {
      const pages = await axios
        .get(`https://${ process.env.CMS_URL }/api/v1/blog?limit=100`, {
          headers: { 'X-API-KEY': process.env.CMS_APIKEY }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/post/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  }
}
