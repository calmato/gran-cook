export interface IRecipe {
  id: string
  title: string
  impression: string
  recipe: string
  rate: number
  imageUrl: string
  createdBy: string
  updatedBy: string
  createdAt: number
  updatedAt: number
}

export interface IRecipeState {
  recipes: Array<IRecipe>
}
