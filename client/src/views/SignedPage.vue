<template>
  <v-content>
    <v-container>
      <v-layout justify-center wrap>
        <v-spacer />
        <v-flex xs2>
          <v-btn
            :block=true
            color="error"
            class="mr-4"
            @click="signout">
            SignOut
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container> 

    <v-container>
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">Signed Page!</h1>
            <h4 class="subheading">Server message : {{serverdata}}</h4>
            
          </v-col>
          <v-col class="text-center" cols="4">
            <v-text-field
              v-model="p1"
              label="Param 1"
              color="yellow lighten-5"
            ></v-text-field>
          </v-col>
          <v-col class="text-center" cols="4">
            <v-text-field
              v-model="p2"
              label="Param 2"
              color="yellow lighten-5"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" cols="12">
            <v-btn
              color="info"
              class="mr-4"
              @click="getreqa">
              Admin Get
            </v-btn>
            <v-btn
              color="success"
              class="mr-4"
              @click="postreqa">
              Admin Post
            </v-btn>
          
            <v-btn
              color="red darken-2"
              class="mr-4"
              @click="getrequ">
              User Get
            </v-btn>
            <v-btn
              color="yellow darken-1"
              class="mr-4"
              @click="postrequ">
              User Post
            </v-btn>
          </v-col>
        </v-row>
        
      </v-parallax>
    </v-container>

  </v-content>
</template>

<script>
import api from '@/local_modules/api';
import { uuid } from 'uuidv4';

export default {
  components: {
  },
  data: () => ({
    serverdata: '',
    pk: '',
    p1: '',
    p2: '',
  }),
  methods: {
    signout: function() {
      this.$store.dispatch("auth/signout");
      alert('Sign out!');
      this.$router.replace("/");
    },
    getreqa: function() {
      let params = {
        params : {
          pk: this.pk,
          p1: this.p1,
          p2: this.p2}};
      api.get('/protected/a/', params)
        .then(res => {
          this.serverdata = res.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    postreqa: function() {
      let params = {
        id: uuid(),
        name: this.$store.getters['auth/username'],
        param1: this.p1,
        param2: this.p2};
      api.post('/protected/a/', params)
        .then(res => {
          this.serverdata = res.data;
        })
        .catch(err => {
          alert(err);
        });
    },
    getrequ: function() {
      api.get('/protected/')
        .then(res => {
          this.serverdata = res.data.msg;
        })
        .catch(err => {
          alert(err);
        });
    },
    postrequ: function() {
      api.post('/protected/')
        .then(res => {
          this.serverdata = res.data.msg;
        })
        .catch(err => {
          alert(err);
        });
    },
  },
  mounted: function () {
    api.get('/protected/')
      .then(res => {
        this.serverdata = res.data.msg;
      })
      .catch(err => {
        alert(err);
      });
  }
};
</script>