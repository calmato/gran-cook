import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { v4 as uuidv4 } from 'uuid'
import firebase from '~/plugins/firebase'
import { IRecipe, IRecipeState } from '~/types/store'
import { IRecipeNewForm } from '~/types/forms'

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
  public async addRecipe(params: IRecipeNewForm): Promise<void> {
    const { title, impression, recipe, rate, imageUrl } = params
    const id: string = uuidv4()
    const current = Date.now()

    const req: IRecipe = {
      id,
      title,
      impression,
      recipe,
      rate,
      imageUrl,
      createdAt: current,
      updatedAt: current,
    }

    await firebase
      .firestore()
      .collection('recipes')
      .doc(id)
      .set(req)
      .catch((err: Error) => {
        throw err
      })
  }

  @Action({ rawError: true })
  public async uploadImage(imageData: File | undefined): Promise<string> {
    if (!imageData) {
      const err = new Error('imageData is undefined')
      return Promise.reject(err)
    }

    const uuid: string = uuidv4()
    const metadata: firebase.storage.UploadMetadata = {
      contentType: imageData.type,
    }

    const storagePath: string = ['recipes', uuid].join('/')
    const storageDoc: firebase.storage.Reference = firebase.storage().ref().child(storagePath)

    return await storageDoc
      .put(imageData, metadata)
      .then(
        async (): Promise<string> => {
          return await storageDoc.getDownloadURL()
        }
      )
      .catch((err: Error) => {
        throw err
      })
  }
}
