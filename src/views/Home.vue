<template>
  <div class="home">
    <h3>Vos coupons</h3>
<!--    TODO : barre de recherche selon coupon utiliser ou pas avec un component -->
    <SearchUserCoupon></SearchUserCoupon>
    <br />

<!--    Génération des cards-->
    <div class="center">
      <div v-for="userCoupon in userCoupons">
        <b-card-group deck class="mb-3">
          <b-card border-variant="dark" header="Titre du coupon" align="center" style="width: 20em">
            <b-card-text>
              <p v-if="userCoupon.user === false">Vous n'avez pas utiliser votre coupon</p>
              <p v-else>Vous avez utiliser votre coupon</p>

              La réduction
              <br />
              La date d'expiration
              <!-- Si besoin d'un btn détail -->
              <!-- <b-button variant="primary"><router-link class="lienBlanc" :to="'user/' + resultApi.idUser">Détail</router-link></b-button><span>azer</span>-->
            </b-card-text>
          </b-card>
        </b-card-group>
        <br />
      </div>
    </div>

  </div>
</template>

<script>
import SearchUserCoupon from '@/components/SearchUserCoupon.vue'

export default {
  name: 'Home',
  components: {
    SearchUserCoupon
  },
  data() {
    return {
      // TODO : récup selon la manière d'auth l'user
      idUserCourant: "1",
      userCoupons: [],
    }
  },
  created() {
    this.appelApiUserCoupons();
  },
  methods: {
    appelApiUserCoupons() {
      // Récupération des coupons de l'utilisateur connecter
      this.axios
          .get(this.$root.baseApi + 'users/'+ this.idUserCourant +'/user_coupon')
          .then(res => {
            this.userCoupons = res.data._embedded.user_coupons;
          })
    },
  },
}
</script>