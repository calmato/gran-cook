/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/auth'
import RecipeModule from '~/store/recipe'

let AuthStore: AuthModule
let RecipeStore: RecipeModule

function initialiseStores(store: Store<any>): void {
  AuthStore = getModule(AuthModule, store)
  RecipeStore = getModule(RecipeModule, store)
}

export { initialiseStores, AuthStore, RecipeStore }
