<template>
  <v-row no-gutters>
    <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4">
      <v-card hover tile outlined @click="handleClick(recipe)">
        <v-card-title class="headline">{{ omitString(recipe.title, 16) }}</v-card-title>
        <v-card-text>
          <v-img :src="recipe.imageUrl" max-height="200" contain />
          <v-rating background-color="grey lighten-2" color="warning" size="24" :value="recipe.rate" readonly />
          <p>{{ omitString(recipe.impression, 18) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, SetupContext } from '@nuxtjs/composition-api'
import { RecipeStore } from '~/store'
import { IRecipe } from '~/types/store'

export default defineComponent({
  setup(_, { root }: SetupContext) {
    const store = root.$store

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

    const handleClick = (recipe: IRecipe) => {
      console.log('debug', 'click', recipe)
    }

    return {
      recipes,
      omitString,
      handleClick,
    }
  },
})
</script>
