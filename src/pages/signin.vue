<template>
  <v-container fill-height>
    <v-layout wrap>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img src="/logo.png" max-height="96px" contain class="mb-8" />
          <v-card rounded="32">
            <v-card-title class="justify-center">
              <h3>ログイン</h3>
            </v-card-title>

            <v-divider />

            <v-card-text cols="12">
              <div id="firebaseui-auth-container" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@nuxtjs/composition-api'
import * as firebaseUI from 'firebaseui'
import firebase from '~/plugins/firebase'
import { AuthStore } from '~/store'

export default defineComponent({
  layout: 'auth',

  setup(_, { root }: SetupContext) {
    const router = root.$router

    onMounted(() => {
      const config: firebaseUI.auth.Config = {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
      }

      const ui = new firebaseUI.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', config)

      AuthStore.authorization().then(() => {
        router.push('/')
      })
    })
  },
})
</script>
