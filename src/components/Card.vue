<template>
  <div>
    <v-card :flat="flat" :shaped="shaped" :outlined="outlined" :height="height">
      <v-list-item>
        <v-list-item-avatar>
          <v-btn @click="clickIcon" color="primary" text :loading="loading">
            <v-icon>{{icon}}</v-icon>
          </v-btn>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-toolbar-title color="primary">{{title}}</v-toolbar-title>
          <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <slot name="actions"></slot>
        <v-btn @click="settingsOpen = true " v-if="settings" color="secondary" text>
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <slot name="filters"></slot>
      <slot></slot>
    </v-card>

    <!-- Settings -->
    <v-dialog v-model="settingsOpen">
      <v-card icon="settings" :shaped="false" overline="Settings">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="secondary">mdi-settings</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <div class="body-1">Settings</div>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <div class="mx-2 mt-2">
          <slot name="settings"></slot>
        </div>
        <div v-if="settingsButton">
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="clickSettingsButton" color="secondary" text>{{settingsButtonText}}</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    flat: {
      type: Boolean,
      default: false
    },
    title: String,
    subtitle: String,
    icon: String,
    loading: Boolean,
    outlined: {
      type: Boolean,
      default: false
    },
    shaped: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Boolean,
      default: false
    },
    settingsButton: {
      type: Boolean,
      default: false
    },
    settingsButtonText: {
      type: String,
      default: 'Refresh'
    },
    height: String
  },
  data: () => ({
    settingsOpen: false
  }),
  methods: {
    clickIcon () {
      this.$emit('clickIcon')
    },
    clickSettingsButton () {
      this.$emit('clickSettingsButton')
      this.settingsOpen = false
    }
  }
}
</script>
