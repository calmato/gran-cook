import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { v4 as uuidv4 } from 'uuid'
import firebase from '~/plugins/firebase'
import { IRecipe, IRecipeTest, IRecipeState } from '~/types/store'

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

    const data: IRecipeTest = {
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
      .catch((err: any) => {
        throw err
      })
  }

  @Action({ rawError: true })
  public async recipeAdd({ params, imageData }: any): Promise<void> {
    const id: string = uuidv4()
    const current = Date.now()
    let resultUrl: any = ''
    const { title, impressions, recipe, rate } = params
    const metadata = { contentType: imageData.type }
    const storage = firebase.storage()
    const storageDoc = storage.ref().child('recipes/' + id + '/images/' + imageData.value.name)
    await storageDoc
      .put(imageData.value, metadata)
      .then(async () => {
        // Get upload image data URL
        await storageDoc.getDownloadURL().then((res) => {
          resultUrl = res
        })
      })
      .catch((err: any) => {
        console.log(err)
      })

    const req: IRecipe = {
      id,
      title,
      impressions,
      recipe,
      rate,
      imageUrl: resultUrl,
      createdAt: current,
      updatedAt: current,
    }

    await firebase
      .firestore()
      .collection('recipes')
      .doc(id)
      .set(req)
      .then((res) => {
        console.log('debug', 'success', res)
      })
      .catch((err: any) => {
        throw err
      })
  }
}
