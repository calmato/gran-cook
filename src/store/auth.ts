import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import firebase from '~/plugins/firebase'
import { IAuthState } from '~/types/store'

const initialState: IAuthState = {
  id: '',
}

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class AuthModule extends VuexModule {
  private id: IAuthState['id'] = initialState.id

  public get getId(): string {
    return this.id
  }

  @Mutation
  private setId(id: string): void {
    this.id = id
  }

  @Action({})
  public factory(): void {
    this.setId(initialState.id)
  }

  @Action({ rawError: true })
  public authorization(): Promise<void> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      firebase.auth().onAuthStateChanged((res: firebase.User | null) => {
        if (res) {
          this.setId(res.uid)
          resolve()
        } else {
          reject(new Error('unauthorized'))
        }
      })
    })
  }

  @Action({ rawError: true })
  public logout(): void {
    firebase
      .auth()
      .signOut()
      .finally(() => {
        this.factory()
      })
  }
}
