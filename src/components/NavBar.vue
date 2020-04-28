<template>
  <div>
    <v-app-bar app absolute dense elevation="0" color="transparent">
      <v-icon left color="primary">mdi-brain</v-icon>
      <v-toolbar-title color="primary">Mindra</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn text color="yellow darken-2">
          <v-icon>mdi-weather-sunny</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- <v-navigation-drawer app v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://www.tinygraphs.com/labs/isogrids/hexa16/tinygrap?theme=frogideas&numcolors=3"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Justin Zint</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route" link>
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: 'Geolocation', icon: 'mdi-map-marker-circle', route: '/geolocation' },
      { title: 'Geofencing', icon: 'mdi-location-exit', route: '/geofencing' },
      { title: 'Activity Recognition', icon: 'mdi-car-info', route: '/activity' },
      { title: 'Network', icon: 'mdi-cube-send', route: '/network' },
      { title: 'Application', icon: 'mdi-application', route: '/application' },
      { title: 'Logging', icon: 'mdi-console-line', route: '/logging' }
    ],
    mini: true
  })
}
</script>
