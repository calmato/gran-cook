import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { v4 as uuidv4 } from 'uuid'
import firebase from '~/plugins/firebase'
import { AuthStore } from '~/store'
import { IRecipe, IRecipeState } from '~/types/store'
import { IRecipeEditForm, IRecipeNewForm } from '~/types/forms'

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

  @Mutation
  private addRecipe(recipe: IRecipe): void {
    this.recipes.push(recipe)
  }

  @Mutation
  private changeRecipe(recipe: IRecipe): void {
    const index: number = this.recipes.findIndex((item) => item.id === recipe.id)
    if (index === -1) {
      return
    }

    this.recipes.splice(index, 1, recipe)
  }

  @Mutation
  private removeRecipe(recipeId: string): void {
    const index: number = this.recipes.findIndex((item) => item.id === recipeId)
    if (index === -1) {
      return
    }

    this.recipes.splice(index, 1)
  }

  @Action({})
  public factory(): void {
    this.setRecipes(initialState.recipes)
  }

  @Action({ rawError: true })
  public async listRecipe(): Promise<void> {
    await firebase
      .firestore()
      .collection('recipes')
      .get()
      .then((res: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        const recipes: IRecipe[] = []

        res.forEach((doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): void => {
          const {
            id,
            title,
            impression,
            recipe,
            rate,
            imageUrl,
            createdBy,
            updatedBy,
            createdAt,
            updatedAt,
          } = doc.data()

          const r: IRecipe = {
            id,
            title,
            impression,
            recipe,
            rate,
            imageUrl,
            createdBy,
            updatedBy,
            createdAt,
            updatedAt,
          }

          recipes.push(r)
        })

        this.setRecipes(recipes)
      })
      .catch((err: Error) => {
        throw err
      })
  }

  @Action({ rawError: true })
  public async createRecipe(params: IRecipeNewForm): Promise<void> {
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
      createdBy: AuthStore.getId,
      updatedBy: AuthStore.getId,
      createdAt: current,
      updatedAt: current,
    }

    await firebase
      .firestore()
      .collection('recipes')
      .doc(id)
      .set(req)
      .then(() => {
        this.addRecipe(req)
      })
      .catch((err: Error) => {
        throw err
      })
  }

  @Action({ rawError: true })
  public async updateRecipe({ params, value }: { params: IRecipeEditForm; value: IRecipe }): Promise<IRecipe> {
    const { title, impression, recipe, rate, imageUrl } = params
    const current = Date.now()

    const req: IRecipe = {
      id: value.id,
      title,
      impression,
      recipe,
      rate,
      imageUrl,
      createdBy: value.createdBy,
      updatedBy: AuthStore.getId,
      createdAt: value.createdAt,
      updatedAt: current,
    }

    return await firebase
      .firestore()
      .collection('recipes')
      .doc(value.id)
      .update(req)
      .then(() => {
        this.changeRecipe(req)
        return req
      })
      .catch((err: Error) => {
        throw err
      })
  }

  @Action({ rawError: true })
  public async deleteRecipe(recipeId: string): Promise<void> {
    await firebase
      .firestore()
      .collection('recipes')
      .doc(recipeId)
      .delete()
      .then(() => {
        this.removeRecipe(recipeId)
      })
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
