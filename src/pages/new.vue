<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="form.title" label="料理名" single-line full-width></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="form.impressions" label="感想" full-width single-lin></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="form.recipe" label="レシピ" full-width single-line> </v-textarea>
        </v-col>
        <v-col cols="12" class="my-2">
          <v-rating
            v-model="form.rate"
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
            @change="onImagePicked"
          ></v-file-input>
        </v-col>
      </v-row>
      <img v-if="uploadImageUrl" :src="uploadImageUrl" width="auto" height="200" />
    </v-container>
    <div class="text-center">
      <v-btn large color="#FFC107" dark @click="hundleSubmit"> レシピを登録 </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { IRecipeNewForm } from '~/types/forms'
import { RecipeStore } from '~/store'

export default defineComponent({
  setup() {
    const inputImage = ref<string>('')
    const uploadImageUrl = ref<any>('')
    const imageData = ref<File>()
    const form = reactive<IRecipeNewForm>({
      title: '',
      impressions: '',
      recipe: '',
      rate: 3,
      imageUrl: '',
    })

    const onImagePicked = (file: File) => {
      imageData.value = file
      console.log(imageData)
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          uploadImageUrl.value = fr.result
        })
      } else {
        uploadImageUrl.value = ''
      }
    }

    const hundleSubmit = async () => {
      // Upload to cloud strage
      // Register data
      await RecipeStore.recipeAdd({ params: form, imageData }).catch((err: Error) => {
        console.log('debug', form, err)
      })
    }

    return {
      inputImage,
      uploadImageUrl,
      onImagePicked,
      form,
      hundleSubmit,
    }
  },
})
</script>
