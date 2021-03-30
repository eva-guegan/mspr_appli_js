<template>
  <div class="home">
    <h3>Vos coupons</h3>
    <br />

<!--    Génération des cards-->
    <div class="center">
      <div v-for="userCoupon in userCoupons">
        <b-card-group deck class="mb-3">
          <b-card border-variant="dark" :header="userCoupon.titre" align="center" style="width: 20em">
            <b-card-text>
              - {{ userCoupon.reduc }}% de réduction !
              <br />
              A utiliser avant le : {{ userCoupon.dateexpire }}
              <!--              Si besoin d'un btn détail -->
              <!--              <b-button variant="primary"><router-link class="lienBlanc" :to="'user/' + resultApi.idUser">Détail</router-link></b-button><span>azer</span>-->
            </b-card-text>
          </b-card>
        </b-card-group>
        <br />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
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
          .get(this.$root.baseApi + 'users/'+ this.$root.idUser +'/couponSet')
          .then(res => {
            this.userCoupons = res.data._embedded.coupons;
            console.log(this.userCoupons)
          })
    }
  },
}
</script>