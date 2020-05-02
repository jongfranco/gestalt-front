<template>
  <div>
    <v-card class="my-2">
      <v-card-title>{{paper.title}}</v-card-title>
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
        <v-rating :value="0" color="amber" dense half-increments readonly size="14"></v-rating>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" text color="primary" :disabled="!highlight">Scores</v-btn>
        <v-btn :href="paper.url" target="_blank" text color="primary">View</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog">
      <v-card>
        <v-col>
          <p class="overline">Start Scores</p>
          <area-chart
            xtitle="Position in Abstract"
            ytitle="Score"
            :curve="false"
            :data="startScores"
          ></area-chart>
        </v-col>

        <v-col>
          <p class="overline">End Scores</p>
          <area-chart xtitle="Position in Abstract" ytitle="Score" :curve="false" :data="endScores"></area-chart>
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
    dialog: false
  }),
  created () {
    this.lists = [
      { title: 'Authors:', content: this.paper.authors },
      { title: 'Journal:', content: this.paper.journal },
      { title: 'Published:', content: this.paper.published }
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
        ? this.paper.abstract.insertTextAtIndices(toAdd)
        : this.paper.abstract
    }
  }
}
</script>
