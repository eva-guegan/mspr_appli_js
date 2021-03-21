<template>
  <div>
    <h3>Liste des promotions en cours</h3>
    <br />

    <div v-for="resultApi in resultsApi">
      <p v-if="resultApi.dateexpire >= dateJour">Titre : {{ resultApi.titre }}, Reduc : {{ resultApi.reduc }}%, Date d'expiration : {{ resultApi.dateexpire }}</p>
<!--      Si besoin d'un btn détail -->
<!--      <b-button variant="primary"><router-link :to="'promotion/' + resultApi.idPromotion">Détail</router-link></b-button>-->
    </div>

  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      resultsApi : [],
      dateJour : "",
    }
  },
  created() {
    this.appelApi();
    this.getDateJour();
  },
  methods: {
    appelApi() {
      this.axios
          .get(this.$root.baseApi + 'coupons/')
          .then(res => {
            this.resultsApi = res.data._embedded.coupons;
          })
    },
    getDateJour() {
      let date = new Date();
      let month = date.getMonth()+1;
      if (month>0 && month<10) {
        month = '0'+month;
      }
      this.dateJour = date.getFullYear()+'-'+month+'-'+date.getDate();
    },
  }
}
</script>