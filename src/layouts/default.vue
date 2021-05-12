<template>
  <v-app dark>
    <v-app-bar absolute app clipped-right color="939393" elevate-on-scroll>
      <v-app-bar-nav-icon @click="toggle = !toggle"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="toggle" app color="#FFA594" left>
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img src="/logo.png"> </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Gran Cook</v-list-item-title>
            <v-list-item-subtitle>レシピ管理アプリ</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link nuxt :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="handleLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext, watch } from '@nuxtjs/composition-api'
import { AuthStore } from '~/store'

export default defineComponent({
  setup(_, { root }: SetupContext) {
    const router = root.$router

    const title = ref<string>('')
    const current = computed(() => root.$route.path)

    const items = [
      { title: 'レシピを調べる', icon: 'mdi-magnify', link: '/' },
      { title: 'レシピ登録', icon: 'mdi-plus-box', link: '/new' },
    ]

    switch (current.value) {
      case '/':
        title.value = 'レシピ一覧'
        break
      case '/new':
        title.value = 'レシピ登録'
        break
    }

    watch(current, (): void => {
      switch (current.value) {
        case '/':
          title.value = 'レシピ一覧'
          break
        case '/new':
          title.value = 'レシピ登録'
          break
      }
    })

    const toggle = null

    const handleLogout = (): void => {
      AuthStore.logout()
      router.push('/signin')
    }

    return {
      title,
      toggle,
      items,
      handleLogout,
    }
  },
})
</script>
