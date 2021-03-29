<template>
  <div class="center">

    <h3>Se connecter</h3>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <b-form @submit.prevent="submit()">
      <b-form-group id="input-group-1" label="Email :" label-for="input-1">
        <b-form-input id="input-1" v-model="email" type="email" placeholder="Entrer votre email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Mot de passe :" label-for="input-2">
        <b-form-input id="input-2" v-model="password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

  </div>
</template>

<script>
  export default {
    name: "LoginForm",
    props: {
      errorMessage: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      submit() {
        this.$emit("submit", {
          email: this.email,
          password: this.password
        });
      },
    },
  }
</script>

<style scoped>
  .error {
    color: tomato;
  }
</style>