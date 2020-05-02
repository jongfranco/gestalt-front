<template>
  <div>
    <v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="6" v-for="(section, index) in sections" :key="index">
            <v-card flat>
              <v-card-title>{{section.title}}</v-card-title>
              <v-container fluid>
                <p>{{section.text}}</p>
              </v-container>
              <v-divider></v-divider>
            </v-card>
          </v-col>
        </v-row>
        <p v-html="headline" class="overline"></p>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  created () {
    this.headline = 'In response to the COVID-19 pandemic, the White House and a coalition of leading research groups have prepared the COVID-19 Open Research Dataset (CORD-19). CORD-19 is a resource of over 59,000 scholarly articles, including over 47,000 with full text, about COVID-19, SARS-CoV-2, and related coronaviruses. <br/> <br/> Gestalt aims to provide researchers with a set of harmonized tools that makes gaining insight from existing research fast, efficient, and accurate.'
    this.sections = [
      { title: 'Search', text: "Gestalt uses ElasticSearch to return papers relevant to the question and keywords you provide. It's highly recommended that keywords are used alongside your questions to more accurately drill into relevant papers." },
      { title: 'Rake', text: 'Rake will take a single term, scan through a large volume of papers where it exists, and return a list of keywords most relevant to the original based on how frequently they showed up in close proximity.' },
      { title: 'Highlight', text: 'Determine the most relevant excerpt of the abstract of each paper in relation to your original search.' },
      { title: 'Summarize', text: "Build a concise summary of all the papers returned by the original search. Will use the paper's full text if available." }
    ]
  }
}
</script>
