<template>
  <div>
    <v-card class="my-2">
      <v-card-title>{{paper._source.title}}</v-card-title>
      <v-card-subtitle>
        <v-list dense>
          <v-list-item v-for="item in lists" :key="item.title">
            <v-list-item-content>
              <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-subtitle>
      <v-card-text>
        <div v-html="highlightedText"></div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :href="paper._source.url" target="_blank" text color="primary">View</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="searchDialog=true" text color="primary">
          <v-icon left>mdi-magnify</v-icon>Search
        </v-btn>
        <v-btn @click="highlightDialog=true" text color="primary" :disabled="!highlight">
          <v-icon left>mdi-format-color-highlight</v-icon>Highlight
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="highlightDialog">
      <v-card>
        <v-col>
          <p class="overline">Start Scores</p>
          <area-chart :curve="false" :data="startScores"></area-chart>
        </v-col>

        <v-col>
          <p class="overline">End Scores</p>
          <area-chart :curve="false" :data="endScores"></area-chart>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog v-model="searchDialog">
      <v-card>
        <v-card-title>Total Search Score: {{paper._explanation.value}}</v-card-title>
        <v-divider></v-divider>
        <v-col>
          <v-treeview
            :items="paper._explanation.details"
            item-children="details"
            item-text="description"
          >
            <template v-slot:prepend="{ item }">
              <v-icon color="black" v-text="makeIcon(item.description)"></v-icon>
            </template>
          </v-treeview>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    paper: Object,
    highlight: Object
  },
  data: () => ({
    highlightDialog: false,
    searchDialog: false,
    treeSearch: ''
  }),
  methods: {
    makeIcon (description) {
      if (description.includes('sum')) return 'mdi-timeline-plus-outline'
      if (description.includes('weight')) return 'mdi-weight'
      if (description.includes('score')) return 'mdi-graph'
      if (['boost', 'idf', 'tf'].some(x => description.includes(x))) return 'mdi-function-variant'
      return ''
    }
  },
  created () {
    this.lists = [
      { title: 'Authors:', content: this.paper._source.authors.split(/\W+/).slice(0, 3).join(' ') },
      { title: 'Journal:', content: this.paper._source.journal },
      { title: 'Published:', content: this.paper._source.published }
    ]
  },
  computed: {
    startScores () {
      return this.highlight ? this.highlight.start_scores.reduce((acc, cur, index) => {
        acc[index] = cur
        return acc
      }, {}) : []
    },
    endScores () {
      return this.highlight ? this.highlight.end_scores.reduce((acc, cur, index) => {
        acc[index] = cur
        return acc
      }, {}) : []
    },
    highlightedText () {
      /* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
      String.prototype.insertTextAtIndices = function (text) {
        return this.replace(/./g, function (character, index) {
          return text[index] ? text[index] + character : character
        })
      }

      const start = this.highlight ? this.highlight.start_index : 0
      const end = this.highlight ? this.highlight.end_index : 0

      const toAdd = {
        [start]: '<mark>',
        [end]: '</mark>'
      }

      return this.highlight
        ? this.paper._source.abstract.insertTextAtIndices(toAdd)
        : this.paper._source.abstract
    }
  }
}
</script>
