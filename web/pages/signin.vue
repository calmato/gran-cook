<template>
  <sign-in :form="form" :loading="loading" :has-error.sync="hasError" @submit="handleSubmit" />
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from '@nuxtjs/composition-api'
import { ISignInForm } from '~/types/forms'
import SignIn from '~/components/templates/SignIn.vue'

export default defineComponent({
  components: {
    SignIn,
  },
  layout: 'auth',

  setup(_) {
    const hasError = ref<Boolean>(false)
    const form = reactive<ISignInForm>({
      email: '',
      password: '',
    })
    const loading = computed((): boolean => {
      // const status = store.getters['common/getPromiseState']
      // return status === PromiseState.LOADING
      return false
    })
    const handleSubmit = () => {
      console.log('debug', form)
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
