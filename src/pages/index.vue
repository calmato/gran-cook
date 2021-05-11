<template>
  <v-row no-gutters>
    <v-dialog v-model="showDialog" width="800px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>{{ recipe.title }}</v-card-title>
        <v-card-text>
          <v-rating :value="recipe.rate" background-color="grey lighten-2" color="warning" readonly size="24" />
        </v-card-text>
        <v-img :src="recipe.imageUrl" max-height="300" contain />
        <v-card-title>感想</v-card-title>
        <v-card-text>{{ recipe.impression }}</v-card-text>
        <v-card-title>レシピ</v-card-title>
        <v-card-text>{{ recipe.recipe }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="handleCloseDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col v-for="item in recipes" :key="item.id" cols="12" sm="6" md="4">
      <v-card hover tile outlined @click="handleClick(item)">
        <v-card-title class="headline">{{ omitString(item.title, 16) }}</v-card-title>
        <v-card-text>
          <v-img :src="item.imageUrl" max-height="200" contain />
          <v-rating background-color="grey lighten-2" color="warning" size="24" :value="item.rate" readonly />
          <p>{{ omitString(item.impression, 18) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref, SetupContext } from '@nuxtjs/composition-api'
import { RecipeStore } from '~/store'
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

    const showDialog = ref<boolean>(false)
    const recipe = ref<IRecipe>({ ...initialRecipe })

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

    const handleClick = (item: IRecipe) => {
      recipe.value = { ...item }
      showDialog.value = true
    }

    const handleCloseDialog = () => {
      showDialog.value = false
      recipe.value = { ...initialRecipe }
    }

    return {
      recipe,
      recipes,
      omitString,
      showDialog,
      handleClick,
      handleCloseDialog,
    }
  },
})
</script>
