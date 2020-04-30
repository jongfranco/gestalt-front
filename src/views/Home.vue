<template>
  <div>
    <v-select
      :loading="isLoading"
      :items="themes"
      v-model="question"
      label="Themes"
      outlined
      rounded
      dense
    ></v-select>
    <Paper
      v-for="(paper, index) in papers"
      :key="index"
      :paper="paper._source"
      :answer="answers[index]"
    />
  </div>
</template>
<script>
import search from '@/connections/search'
import answer from '@/connections/answer'
import Paper from '@/components/Paper'
export default {
  components: {
    Paper
  },
  watch: {
    question () {
      this.search()
    },
    papers () {
      this.answer()
    }
  },
  computed: {
    params () {
      return {
        q: this.question
      }
    }
  },
  data: () => ({
    isLoading: false,
    question: '',
    answers: [],
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
          q: this.question
        }
      })
      this.papers = response.data.hits
      this.isLoading = false
    },
    async answer () {
      this.isLoading = true
      this.answers = []
      const response = await answer.post('answer', {
        context: this.papers,
        question: this.question
      })
      this.answers = response.data.results
      this.isLoading = false
    }
  }
}
</script>
