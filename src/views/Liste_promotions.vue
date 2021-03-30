<template>
  <div>
    <h3>Liste des promotions en cours</h3>
    <br />

<!--    Quand isFree = 1 afficher-->
<!--    Génération des cards-->
    <div class="center">
      <div v-for="resultApi in resultsApi" v-if="resultApi.dateexpire >= dateJour"> <!-- && resultApi.champDiff === 0-->
        <b-card-group deck class="mb-3">
          <b-card border-variant="dark" :header="resultApi.titre" align="center" style="width: 20em">
            <b-card-text>
              - {{ resultApi.reduc }}% de réduction !
              <br />
              A utiliser avant le : {{ resultApi.dateexpire }}
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
  name: "Promotions",
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
      // Récupération des propomotions en cours sur le site
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