<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="4">
      <v-card v-for="recipe in recipes" :key="recipe.id" hover @click="handleClick(recipe)">
        <v-card-title class="headline">{{ recipe.title }}</v-card-title>
        <v-card-text>
          <v-img :src="recipe.imageUrl" max-height="200" contain />
          <v-rating background-color="grey lighten-2" color="warning" size="24" :value="3" readonly />
          <p>{{ recipe.impression }}</p>
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

    const handleClick = (recipe: IRecipe) => {
      console.log('debug', 'click', recipe)
    }

    return {
      recipes,
      handleClick,
    }
  },
})
</script>
