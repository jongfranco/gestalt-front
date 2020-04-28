import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ffaaa5',
        secondary: '#e07a5f',
        third: '81b29a',
        fourth: 'f2cc8f',
        error: '#ED6A5A',
        darktext: '#be9b7b',
        accent: '#f4f1de'
      },
      dark: {

      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
