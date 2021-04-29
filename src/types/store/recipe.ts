export interface IRecipe {
  id: string
  title: string
  impressions: string
  recipe: string
  rate: number
  image: File
  createdAt: number
  updatedAt: number
}

export interface IRecipeTest {
  id: string
  title: string
  createdAt: number
  updatedAt: number
}

export interface IRecipeState {
  recipes: Array<IRecipe>
}
