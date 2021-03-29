<template>
  <div class="hello">
<!--    <b-input-group prepend="Série" class="mt-3">-->
<!--      <b-form-input placeholder="Recherche par titre" v-model="showTitle"></b-form-input>-->
<!--      <b-input-group-append>-->
<!--        <b-button variant="primary" @click="findCouponByUsed()">Confirm</b-button>-->
<!--      </b-input-group-append>-->
<!--    </b-input-group>-->
<!--    <br /> <br />-->
    <b-form-checkbox v-model="checked1" name="check-button" button v-on:click="findCouponByUsed()">
      Afficher les coupons non utiliser <b>(Checked: {{ checked1 }})</b>
    </b-form-checkbox>
    <br />
    <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted" @click="findCouponByUsed()">
      Afficher les coupons non utiliser
    </b-form-checkbox>

    <div>State: <strong>{{ status }}</strong></div>

  </div>
</template>

<script>
export default {
  name: 'SearchUserCoupon',
  data() {
    return {
      results: {},
      showTitle: "",
      status: 'not_accepted',
      checked1: false,
    };
  },
  methods: {
    findCouponByUsed() {
      console.log(this.status);
      // this.axios
      //     .get(this.$root.baseApi + "search")
      //     .then((response) => {
      //       this.results = response.data;
      //
      //       if (this.results.length > 0) {
      //         this.$emit("searchCouponByUsed", this.results)
      //       }
      //     })
    }
  }
}
</script>
