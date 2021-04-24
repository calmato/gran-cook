import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  head: {
    titleTemplate: '%s - GranCook',
    title: 'gran-cook',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
    ],
  },
  css: ['firebaseui/dist/firebaseui.css'],
  plugins: ['~/plugins/firebase'],
  components: true,
  buildModules: ['@nuxtjs/composition-api/module', '@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: [],
  content: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  env: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
  build: {},
}
