<template>
  <v-row no-gutters>
    <v-dialog v-model="showDialog" scrollable>
      <!-- recipe edit form dialog -->
      <v-card v-if="editableRecipe">
        <v-toolbar color="#FFA594">レシピの編集</v-toolbar>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formData.title" label="料理名" single-line full-width></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="formData.impression" label="材料" full-width single-lin></v-textarea>
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
            <v-card-actions class="justify-end">
              <v-btn color="error" @click="handleDelete">Delete</v-btn>
              <v-btn color="info" @click="handleCancel">Cancel</v-btn>
              <v-btn color="#FFC107" dark @click="handleSubmit">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
      <!-- recipe detail dialog -->
      <v-card v-else class="mx-auto">
        <v-toolbar color="#FFA594">
          {{ recipe.title }}
          <v-spacer />
          <v-rating
            :value="recipe.rate"
            background-color="grey lighten-2"
            color="warning"
            readonly
            dense
            :small="$vuetify.breakpoint.xs"
            :medium="!$vuetify.breakpoint.xs"
          />
        </v-toolbar>
        <v-card-text class="py-2">
          <v-img :src="recipe.imageUrl" max-height="300" contain />
        </v-card-text>
        <v-card-title>材料</v-card-title>
        <v-card-text>{{ recipe.impression }}</v-card-text>
        <v-card-title>レシピ</v-card-title>
        <v-card-text>{{ recipe.recipe }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn class="info" @click="handleEdit">Edit</v-btn>
          <v-btn class="primary" @click="handleCloseDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- recipe list -->
    <v-col v-for="item in recipes" :key="item.id" cols="12" sm="6" md="4">
      <v-card hover tile outlined @click="handleClick(item)">
        <v-card-title class="headline">{{ omitString(item.title, 16) }}</v-card-title>
        <v-card-text>
          <v-img :src="item.imageUrl" max-height="200" contain />
          <v-rating background-color="grey lighten-2" color="warning" medium :value="item.rate" readonly />
          <p>{{ omitString(item.impression, 18) }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, SetupContext } from '@nuxtjs/composition-api'
import { RecipeStore } from '~/store'
import { IRecipeEditForm } from '~/types/forms'
import { IRecipe } from '~/types/store'

export default defineComponent({
  setup(_, { root }: SetupContext) {
    const store = root.$store

    const initialRecipe: IRecipe = {
      id: '',
      title: '',
      impression: '',
      recipe: '',
      rate: 0,
      imageUrl: '',
      createdBy: '',
      updatedBy: '',
      createdAt: 0,
      updatedAt: 0,
    }

    const editableRecipe = ref<boolean>(false)
    const showDialog = ref<boolean>(false)
    const recipe = ref<IRecipe>({ ...initialRecipe })
    const inputFile = ref<string | ArrayBuffer | null>()
    const fileData = ref<File>()
    const formData = reactive<IRecipeEditForm>({
      title: '',
      impression: '',
      recipe: '',
      rate: 3,
      imageUrl: '',
    })

    const recipes: ComputedRef<IRecipe[]> = computed(() => store.getters['recipe/getRecipes'])

    onMounted(() => {
      RecipeStore.listRecipe().catch((err: Error) => {
        console.log('failure', err)
      })
    })

    const omitString = (str: string, len: number): string => {
      if (str.length > len) {
        return str.substr(0, len) + '...'
      } else {
        return str
      }
    }

    const onImagePicked = (file: File): void => {
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

    const handleEdit = (): void => {
      formData.title = recipe.value.title
      formData.impression = recipe.value.impression
      formData.recipe = recipe.value.recipe
      formData.rate = recipe.value.rate
      formData.imageUrl = recipe.value.imageUrl
      editableRecipe.value = true
    }

    const handleDelete = async (): Promise<void> => {
      await RecipeStore.deleteRecipe(recipe.value.id)
        .then(() => {
          handleCloseDialog()
        })
        .catch((err: Error) => {
          console.log('failure', err)
        })
    }

    const handleSubmit = async (): Promise<void> => {
      await RecipeStore.uploadImage(fileData.value)
        .then(async (imageUrl: string) => {
          formData.imageUrl = imageUrl
          return await RecipeStore.updateRecipe({ params: formData, value: recipe.value })
        })
        .then((res: IRecipe) => {
          recipe.value = res
          editableRecipe.value = false
        })
        .catch((err: Error) => {
          console.log('failure', err)
        })
    }

    const handleCancel = (): void => {
      editableRecipe.value = false
    }

    const handleClick = (item: IRecipe): void => {
      recipe.value = { ...item }
      editableRecipe.value = false
      showDialog.value = true
    }

    const handleCloseDialog = (): void => {
      showDialog.value = false
      editableRecipe.value = false
      recipe.value = { ...initialRecipe }
    }

    return {
      recipe,
      recipes,
      editableRecipe,
      fileData,
      formData,
      inputFile,
      omitString,
      showDialog,
      handleCancel,
      handleClick,
      handleCloseDialog,
      handleDelete,
      handleEdit,
      handleSubmit,
      onImagePicked,
    }
  },
})
</script>
