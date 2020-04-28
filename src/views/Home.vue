<template>
  <div>
    <m-card title="Covid-19 Research" icon="mdi-file-search-outline">
      <v-container fluid>
        <v-select :items="themes" v-model="theme" label="Themes" outlined dense></v-select>
      </v-container>
    </m-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    theme: '',
    themes: [
      'What is known about transmission, incubation, and environmental stability?',
      'What do we know about COVID-19 risk factors?',
      'What do we know about virus genetics, origin, and evolution?',
      'What do we know about vaccines and therapeutics?',
      'What has been published about medical care?',
      'What do we know about non-pharmaceutical interventions?',
      'What do we know about diagnostics and surveillance?',
      'What has been published about ethical and social science considerations?',
      'What has been published about information sharing and inter-sectoral collaboration?'
    ]
  })
}
</script>
