<template>
  <div>
    <v-app-bar app absolute dense elevation="0" color="transparent">
      <v-icon left color="primary">mdi-microscope</v-icon>
      <v-toolbar-title color="primary">Gestalt</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="filters = true" color="primary" icon>
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-btn @click="about = true" icon color="primary">
          <v-icon>mdi-help-rhombus</v-icon>
        </v-btn>
        <v-btn @click="changeTheme" icon :color="color">
          <v-icon>{{icon}}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-dialog v-model="filters">
      <v-card>
        <Filters />
      </v-card>
    </v-dialog>

    <v-dialog v-model="about">
      <v-card>
        <About />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Filters from '@/components/Filters'
import About from '@/components/About'
export default {
  components: { Filters, About },
  data: () => ({
    filters: false,
    about: false,
    papers: []
  }),
  computed: {
    icon () {
      return this.$vuetify.theme.dark
        ? 'mdi-moon-waning-crescent'
        : 'mdi-weather-sunny'
    },
    color () {
      return this.$vuetify.theme.dark
        ? 'white'
        : 'yellow darken-2'
    }
  },
  methods: {
    changeTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>
