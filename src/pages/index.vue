<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn @click="handleSubmit">Firestoreへのテスト登録</v-btn>
      <v-card>
        <v-card-title class="headline"> タイトル </v-card-title>
        <v-card-text>
          <v-rating
            background-color="grey lighten-2"
            color="warning"
            hover
            length="5"
            size="16"
            value="3"
            readonly
          ></v-rating>
          <p>テキスト</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { RecipeStore } from '~/store'

export default defineComponent({
  setup() {
    const handleSubmit = async () => {
      await RecipeStore.testAdd().catch((err: Error) => {
        console.log('debug', err)
      })
    }

    return {
      handleSubmit,
    }
  },
})
</script>
