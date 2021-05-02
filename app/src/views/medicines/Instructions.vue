<template>
  <v-timeline dense>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 1</v-card-title>
        <v-card-text>
          Начните вводить название препарата в строку поиска и выберите нужный
          препарат из выпадающего списка.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 2</v-card-title>
        <v-card-text>
          Далее сервис покажет аптеки, где имеется искомый препарат. Из аптек
          выберите комфортную для себя как по местоположению так и по цене.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item>
      <v-card>
        <v-card-title>Шаг 3</v-card-title>
        <v-card-text>
          По окончанию поиска желательно позвонить в аптеку и уточнить наличие
          препарата.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class MedicinesInstructions extends Vue {}
</script>

<style lang="scss" scoped></style>
