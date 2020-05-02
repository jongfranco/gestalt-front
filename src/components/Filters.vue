<template>
  <div>
    <v-card>
      <v-card-title>Filters</v-card-title>
      <v-divider></v-divider>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-btn @click="rake" :disabled="!keywords.length" text>Rake</v-btn>
            <v-combobox
              v-model="keywords"
              label="Keywords"
              clearable
              outlined
              dense
              rounded
              multiple
              small-chips
              :loading="isLoadingPhrases"
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-select
              label="Similar Terms"
              multiple
              rounded
              small-chips
              clearable
              outlined
              dense
              v-model="keywords"
              v-if="raked.length"
              :items="raked"
            ></v-select>
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
    </v-card>
  </div>
</template>
<script>
import { synonyms } from '@/utils/synonyms'
import { mapMutations, mapGetters } from 'vuex'
import search from '@/connections/search'
import flask from '@/connections/flask'
export default {
  created () {
    this.synonyms = synonyms
  },
  watch: {
    keywords () {
      this.SET_KEYWORDS(this.keywords)
      if (!this.keywords.length) this.raked = []
    }
  },
  computed: {
    ...mapGetters([
      'isLoading'
    ]),
    words () {
      return this.synonyms[this.topic]
    },
    topics () {
      return Object.keys(this.synonyms)
    }

  },
  data: () => ({
    isLoadingPhrases: false,
    topic: '',
    dates: [],
    keywords: [],
    papers: [],
    raked: []
  }),
  methods: {
    ...mapMutations([
      'SET_KEYWORDS'
    ]),
    async search (keyword) {
      const response = await search.get('search', {
        params: {
          q: keyword,
          size: 1000
        }
      })
      this.papers = response.data.hits
    },
    async rake () {
      this.isLoadingPhrases = true
      await this.search(this.keywords[0])
      const response = await flask.post('rake', {
        term: this.keywords[0],
        papers: this.papers
      })
      this.raked = response.data
      this.isLoadingPhrases = false
    }
  }
}
</script>
