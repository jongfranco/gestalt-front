import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ffaaa5 lighten-5',
        secondary: '#8ac6d1'
      },
      dark: {
        primary: '#ffaaa5',
        secondary: '#8ac6d1'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
