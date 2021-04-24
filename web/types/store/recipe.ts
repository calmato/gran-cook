export interface IRecipe {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

export interface IRecipeState {
  recipes: Array<IRecipe>
}
