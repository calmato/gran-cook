import { Context } from '@nuxt/types'

const excludedPaths: string[] = ['/signin']

export default async ({ route, store, redirect }: Context): Promise<void> => {
  if (excludedPaths.includes(route.path)) {
    return
  }

  await store.dispatch('auth/authorization').catch(() => {
    redirect('/signin')
  })
}
