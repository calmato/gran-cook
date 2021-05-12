<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formData.title" label="料理名" single-line full-width></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="formData.impression" label="レシピ" full-width single-lin></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="formData.recipe" label="レシピ" full-width single-line> </v-textarea>
        </v-col>
        <v-col cols="12" class="my-2">
          <v-rating
            v-model="formData.rate"
            color="#FFC107"
            icon-label="custom icon label text {0} of {1}"
            hover
            size="32"
          ></v-rating>
        </v-col>
        <v-col cols="12" md="4" class="my-2">
          <v-file-input
            accept="image/*"
            label="画像を選択"
            filled
            prepend-icon="mdi-camera"
            @change="onImagePicked"
          ></v-file-input>
        </v-col>
      </v-row>
      <img v-if="inputFile" :src="inputFile" width="auto" height="200" />
    </v-container>
    <div class="text-center">
      <v-btn large color="#FFC107" dark v-on="on" @click="handleSubmit"> レシピを登録 </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, SetupContext } from '@nuxtjs/composition-api'
import { IRecipeNewForm } from '~/types/forms'
import { RecipeStore } from '~/store'

export default defineComponent({
  setup(_, { root }: SetupContext) {
    const router = root.$router

    const inputFile = ref<string | ArrayBuffer | null>()
    const fileData = ref<File>()
    const formData = reactive<IRecipeNewForm>({
      title: '',
      impression: '',
      recipe: '',
      rate: 3,
      imageUrl: '',
    })

    const onImagePicked = (file: File) => {
      fileData.value = file
      if (!file) {
        inputFile.value = null
        return
      }

      if (file.name.lastIndexOf('.') <= 0) {
        return
      }

      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.addEventListener('load', () => {
        inputFile.value = fr.result
      })
    }

    const handleSubmit = async () => {
      await RecipeStore.uploadImage(fileData.value)
        .then(async (imageUrl: string) => {
          formData.imageUrl = imageUrl
          return await RecipeStore.createRecipe(formData)
        })
        .then(() => {
          alert('レシピの追加に成功しました')
          router.push('/')
        })
        .catch((err: Error) => {
          alert('レシピの追加に失敗しました\n画像が選択されているか確認してください')
          console.log('debug', formData, err)
        })
    }

    return {
      inputFile,
      fileData,
      formData,
      onImagePicked,
      handleSubmit,
    }
  },
})
</script>
