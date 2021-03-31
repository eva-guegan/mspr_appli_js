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
        if (this.user) {
          this.$root.idUser = this.user.id
        }
        this.errorMessage = this.user ? "" : "Oups, la connexion n'est pas passée ! Veuillez réessayer";
      }
    },
    components: { App, LoginForm }
}
</script>

<style scoped>

</style>