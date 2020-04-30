<template>
  <div>
    <v-app-bar app absolute dense elevation="0" color="transparent">
      <v-icon left color="primary">mdi-microscope</v-icon>
      <v-toolbar-title color="primary">Gestalt</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="dialog = true" color="primary" text>
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-btn text :color="color">
          <v-icon @click="changeTheme">{{icon}}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Filters</v-card-title>
        <v-divider></v-divider>
        <Filters />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Filters from '@/components/Filters'
export default {
  components: { Filters },
  data: () => ({
    dialog: false
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
