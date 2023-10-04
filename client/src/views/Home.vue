<template>
  <v-content>
    <v-container>
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
        <v-row
          align="center"
          justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">Welcome Home!</h1>
            <v-btn
              color="info"
              class="mr-4"
              @click="() => {$router.push({ path: '/signin'})}">
              Sign In
            </v-btn>
            <v-btn
              color="info"
              class="mr-4"
              @click="() => {$router.push({ path: '/signed_page'})}">
              Signed In Page
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-container>
  </v-content>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
   
  }),
  methods: {
    
  }
};
</script>