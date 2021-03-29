<template>
  <div>
    <App v-if="user" />
    <LoginForm v-else :errorMessage="errorMessage" @submit="login" />
  </div>
</template>

<script>
  import { login } from "@/authentication";
  import App from '@/components/App';
  import LoginForm from "@/views/LoginForm";

  export default {
    data() {
      return {
        user: null,
        errorMessage: ""
      }
    },
    methods: {
      login({ email, password }) {
        this.user = login(email, password);
        console.log("Après", this.user);
        this.errorMessage = this.user ? "" : "Authentication failed, please try again";
      }
    },
    components: { App, LoginForm }
}
</script>

<style scoped>

</style>