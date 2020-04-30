<template>
  <div>
    <v-btn @click="summarize" :disabled="!papers.length" text>Summarize</v-btn>
    <v-btn @click="highlight" :disabled="!papers.length" text>Highlight</v-btn>

    <v-combobox
      :loading="isLoading"
      :items="themes"
      v-model="question"
      label="Question"
      rounded
      outlined
      dense
    ></v-combobox>
    <v-skeleton-loader v-if="isLoadingSummary" ref="skeleton" type="paragraph" class="mx-auto"></v-skeleton-loader>
    <v-card v-else-if="summary.length" shaped outlined>
      <p class="caption mx-3 my-2 font-italic">{{summary}}</p>
    </v-card>
    <Paper
      v-for="(paper, index) in papers"
      :key="index"
      :paper="paper._source"
      :highlight="highlights[index]"
    />
  </div>
</template>
<script>
import search from '@/connections/search'
import flask from '@/connections/flask'
import Paper from '@/components/Paper'
import { mapGetters } from 'vuex'
export default {
  components: {
    Paper
  },
  watch: {
    question () {
      this.search()
    },
    papers () {
      this.summary = []
    },
    KEYWORDS () {
      this.search()
    }
  },
  computed: {
    ...mapGetters([
      'KEYWORDS'
    ])
  },
  data: () => ({
    isLoading: false,
    isLoadingSummary: false,
    question: '',
    highlights: [],
    summary: '',
    papers: [],
    themes: [
      'What is known about transmission, incubation, and environmental stability?',
      'What do we know about COVID-19 risk factors?',
      'What do we know about virus genetics, origin, and evolution?',
      'What do we know about vaccines and therapeutics?',
      'What has been published about medical care?',
      'What do we know about non-pharmaceutical interventions?',
      'What do we know about diagnostics and surveillance?',
      'What has been published about ethical and social science considerations?',
      'What has been published about information sharing and inter-sectoral collaboration?',
      'How does hypertension affect patients?',
      'Is there any evidence to suggest geographic based virus mutations?',
      'What are the symptoms of COVID-19?',
      'Underlying drivers of fear, anxiety and stigma that fuel misinformation and rumor, particularly through social media.',
      'Are there geographic variations in the rate of COVID-19 spread?',
      'Are there geographic variations in the mortality rate of COVID-19?'
    ]
  }),
  methods: {
    async search () {
      this.isLoading = true
      const response = await search.get('search', {
        params: {
          q: this.question,
          keywords: this.KEYWORDS
        }
      })
      this.papers = response.data.hits
      this.isLoading = false
    },
    async highlight () {
      this.isLoading = true
      this.highlights = []
      const response = await flask.post('highlight', {
        context: this.papers,
        question: this.question
      })
      this.highlights = response.data.results
      this.isLoading = false
    },
    async summarize () {
      this.isLoadingSummary = true
      this.summaries = []
      const response = await flask.post('summarize', {
        papers: this.papers
          .filter(p => p._source.text.length)
          .map(p => p._source.text)
      })
      this.summary = response.data.summary
      this.isLoadingSummary = false
    }
  }
}
</script>
