<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col>
          <v-combobox
            v-model="keywords"
            label="Keywords"
            clearable
            outlined
            dense
            multiple
            small-chips
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Topics</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row dense>
                  <v-col cols="3" v-for="(topic, index) in topics" :key="index">
                    <v-radio-group dense v-model="keywords" :label="topic" multiple>
                      <v-radio
                        v-for="(word, index) in synonyms[topic]"
                        :key="index"
                        :label="word"
                        :value="word"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { synonyms } from '@/utils/synonyms'
import { mapMutations } from 'vuex'
export default {
  created () {
    this.synonyms = synonyms
  },
  watch: {
    keywords () {
      this.SET_KEYWORDS(this.keywords)
    }
  },
  computed: {
    words () {
      return this.synonyms[this.topic]
    },
    topics () {
      return Object.keys(this.synonyms)
    }
  },
  data: () => ({
    topic: '',
    dates: [],
    keywords: []
  }),
  methods: {
    ...mapMutations([
      'SET_KEYWORDS'
    ])
  }
}
</script>
