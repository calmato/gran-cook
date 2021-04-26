<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="料理名" single-line full-width></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea label="感想" full-width single-lin></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea label="レシピ" full-width single-line> </v-textarea>
        </v-col>
        <v-col cols="12" class="my-2">
          <v-rating
            v-model="rating"
            color="#FFC107"
            icon-label="custom icon label text {0} of {1}"
            hover
            size="32"
          ></v-rating>
        </v-col>
        <v-col cols="12" md="4" class="my-2">
          <v-file-input
            accept="image/png, image/jpeg"
            label="画像を選択"
            filled
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
      </v-row>
      <div v-if="url">
        <img :src="url" />
      </div>
    </v-container>
    <div class="text-center">
      <v-btn large color="#FFC107" dark> レシピを登録 </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'sidebar',
})
</script>
