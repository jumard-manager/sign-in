<template>
  <v-content>
    <br />
    <br />
    <br />
    <v-container> 
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-layout justify-center wrap>
          <v-flex xs6>
            <v-text-field
              v-model="username"
              :counter="20"
              :rules="nameRules"
              label="ID"
              required ></v-text-field>
          </v-flex>
        </v-layout> 
        <v-layout justify-center wrap mb-10>
          <v-flex xs6>
            <v-text-field
              v-model="password"
              :counter="20"
              type="password"
              :rules="passRules"
              label="Password"
              required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout justify-center wrap>
          <v-flex xs6>
            <v-btn
              :disabled="!valid"
              :block=true
              color="success"
              class="mr-4"
              @click="signin">
              SignIn
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>

export default {
  components: {
  },
  mounted: function () {
    if (this.$route.query.username) {
      this.username = this.$route.query.username;
    }
  },
  data: () => ({
    lazy: false,
    valid: false,
    username: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    
    passRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 20) || 'Password must be less than 20 characters',
    ],
  //
  }),
  methods: {
    signin: function () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/signin", {
            username: this.username,
            password: this.password
          })
          .then(() => {
            console.log("signin succeeded");
            this.$store.dispatch("message/setInfoMessage", {
                message: "Signin succeeded"
              });
            this.$router.replace("/signed_page");
          });
      } else {
        alert('Form invaild.');
      }
    },
  }
};
</script>