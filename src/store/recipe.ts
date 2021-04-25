import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { v4 as uuidv4 } from 'uuid'
import firebase from '~/plugins/firebase'
import { IRecipe, IRecipeState } from '~/types/store'

const initialState: IRecipeState = {
  recipes: [],
}

@Module({
  name: 'recipe',
  stateFactory: true,
  namespaced: true,
})
export default class RecipeModule extends VuexModule {
  private recipes: IRecipeState['recipes'] = initialState.recipes

  public get getRecipes(): IRecipe[] {
    return this.recipes
  }

  @Mutation
  private setRecipes(recipes: IRecipe[]): void {
    this.recipes = recipes
  }

  @Action({})
  public factory(): void {
    this.setRecipes(initialState.recipes)
  }

  @Action({ rawError: true })
  public async testAdd(): Promise<void> {
    const id: string = uuidv4()
    const current = Date.now()

    const data: IRecipe = {
      id,
      title: 'テスト調理レシピ',
      createdAt: current,
      updatedAt: current,
    }

    await firebase
      .firestore()
      .collection('recipes')
      .doc(id)
      .set(data)
      .then((res) => {
        console.log('debug', 'success', res)
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
