<template>
  <v-container fill-height>
    <v-layout wrap>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8">
          <v-img src="/logo.png" max-height="96px" contain class="mb-8" />
          <!-- TODO: アラートの実装 -->
          <v-card rounded="32">
            <v-card-title class="justify-center">
              <h3>ログイン</h3>
            </v-card-title>

            <v-divider />

            <v-card-text class="px-12">
              <v-form class="py-8">
                <!-- TODO: バリデーションの設定 -->
                <v-text-field v-model="form.email" label="email" autofocus outlined />
                <v-text-field v-model="form.password" label="password" type="password" outlined />
                <v-btn
                  :block="true"
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  class="mt-4"
                  @click="handleSubmit"
                  >ログイン</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import { ISignInForm } from '~/types/forms'

export default defineComponent({
  setup(_) {
    const form = reactive<ISignInForm>({
      email: '',
      password: '',
    })
    const hasError = ref<boolean>(false)
    const loading = ref<boolean>(false)

    const handleSubmit = () => {
      console.log('debug', 'submit')
    }

    return {
      form,
      hasError,
      loading,
      handleSubmit,
    }
  },
})
</script>
