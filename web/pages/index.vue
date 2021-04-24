<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> タイトル </v-card-title>
        <v-card-text>
          <v-rating
            background-color="grey lighten-2"
            color="warning"
            hover
            length="5"
            size="16"
            value="3"
            readonly
          ></v-rating>
          <p>テキスト</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
}
</script>
