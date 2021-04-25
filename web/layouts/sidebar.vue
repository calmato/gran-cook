<template>
  <v-app dark>
    <v-navigation-drawer app clipped left>
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Gran Cook</v-list-item-title>
            <v-list-item-subtitle>レシピ管理アプリ</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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

<script>
export default {
  data() {
    return {
      items: [
        { title: 'ホーム', icon: 'mdi-home-city' },
        { title: '料理登録', icon: 'mdi-plus-box' },
      ],
    }
  },
}
</script>
