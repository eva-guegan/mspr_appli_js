<template>
  <div class="home">
    <h3>Vos coupons</h3>
    <br />

<!--    Génération des cards -->
    <div class="center">
      <div v-for="userCoupon in userCoupons">
        <b-card-group deck class="mb-3">
          <b-card border-variant="dark" header-text-variant="white" header-bg-variant="dark" :header="userCoupon.titre" align="center" style="width: 20em;">
            <b-card-text>
              - {{ userCoupon.reduc }}% de réduction !
              <br />
              A utiliser avant le : {{ userCoupon.dateexpire }}
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
          })
    }
  },
}
</script>