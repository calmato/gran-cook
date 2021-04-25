<template>
  <v-app>
    <v-main>
      <v-form>
        <v-container>
          <v-row>
            <v-card-title class="text-h2">料理を追加</v-card-title>
            <v-col cols="12">
              <v-text-field label="料理名" single-line full-width></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="感想"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea label="調理手順" full-width single-line> </v-textarea>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-rating v-model="rating" icon-label="custom icon label text {0} of {1}" hover size="32"></v-rating>
            </v-col>
            <v-col cols="12" md="4" class="my-2">
              <v-file-input label="画像を選択" filled prepend-icon="mdi-camera"></v-file-input>
            </v-col>
          </v-row>
        </v-container>
        <div class="text-right">
          <v-btn class="mr-10" large color="#4ABBF3" dark> 料理を登録 </v-btn>
        </div>
      </v-form>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'sidebar',
})
</script>
