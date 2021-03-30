<template>
  <div class="home">
    <h3>Scannez un QRCode GoStyle !</h3>

    <p class="error">{{ error }}</p>

    <div class="qrCode">
      <qrcode-stream @decode="onDecode" @init="onInit" :camera="camera">

<!--        Logo de chargement -->
        <div class="loading-indicator" v-if="loading">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>

<!--        bouton pour changer de caméra -->
        <button @click="switchCamera" class="btnChangeCamera">
          <img src="../../public/switch_camera.png" alt="switch camera">
        </button>

<!--        Pour afficher les messages pendant le traitement -->
        <div v-if="validationPending" class="validation-pending">
          Traitement en cours ...
        </div>

        <div v-if="validationSuccess" class="validation-success">
          Le coupon a bien été enregistrer !
        </div>

        <div v-if="validationFailure" class="validation-failure">
          Il y a eu une erreur ! Le code est peut-être déjà scanner ou ce n'est pas un code GoStyle
        </div>
<!--        Fin des messsages-->
      </qrcode-stream>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'QrCodeReader',
    data() {
      return {
        result: null,
        saveBdd : false,
        error: "",
        loading: false,
        isValid: undefined,
        camera: 'rear',
      }
    },
    methods: {
      async onDecode (content) {
        this.result = content
        console.log(this.result)

        this.turnCameraOff()

        // Timeout pour éviter que le traitement se fasse tout de suite
        await this.timeout(2000)
        // Vérification que c'est bien un qrCode de GoStyle
        this.isValid = content.startsWith('GOSTYLE_')

        // enregistrement en bdd via l'api
        if (this.isValid === true) {
          console.log('enregistrement en bdd')
          // récupération de l'id du coupon
          let split = content.split("_")
          let idCoupon = split[split.length-1]

          console.log(this.$root.baseApi + 'users/' + this.$root.idUser + '/couponSet')
          console.log(this.$root.baseApi + 'coupons/' + idCoupon)

          // envoi de la requête api
          // await this.axios.create({
          //   headers: {
          //     post: {
          //       'Content-type': 'text/uri-list'
          //     }
          //   },
          // }).request({
          //   url: this.$root.baseApi + 'users/' + this.$root.idUser + '/couponSet',
          //   method: "post",
          //   data : this.$root.baseApi + 'coupons/' + idCoupon
          // })

          let data = this.$root.baseApi + 'coupons/' + idCoupon
          await this.axios.post(this.$root.baseApi + 'users/' + this.$root.idUser + '/couponSet', data, {
            headers: {
              "Content-Type": "text/uri-list",
              'Access-Control-Allow-Origin': '*',
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            }
          }).then(res => {
            console.log(true)
            this.saveBdd = true
          }).catch(err => {
            console.log(err)
          })

          // TODO : voir quand enregistre deux fois le même code pour le même user
        }

        // Timeout pour que les users est le temps de lire le message
        await this.timeout(3500)
        // redirection vers la page des coupons de l'user si tout c'est bien passé
        if (this.isValid === true && this.saveBdd === true) {
          console.log('redirection vers user_coupons')
          this.$router.push('/')
        }

        this.turnCameraOn()
      },
      async onInit (promise) {
        this.loading = true

        try {
          await promise
              .then(this.resetValidationState)
        } catch (error) {
          this.error = "Une erreur est survenu"

          if (this.camera === 'rear') {
            this.error = "Vous n'avez pas de caméra autre que frontale. Utilisez le bouton changement de caméra."
          }
        } finally {
          this.loading = false
        }
      },
      resetValidationState () {
        this.isValid = undefined
      },
      turnCameraOn () {
        this.camera = 'auto'
      },
      turnCameraOff () {
        this.camera = 'off'
      },
      timeout (ms) {
        return new Promise(resolve => {
          window.setTimeout(resolve, ms)
        })
      },
      switchCamera () {
        switch (this.camera) {
          case 'front':
            this.camera = 'rear'
            break
          case 'rear':
            this.camera = 'front'
            break
        }
      },
    },
    computed: {
      validationPending () {
        return this.isValid === undefined
            && this.camera === 'off'
      },
      validationSuccess () {
        return this.isValid === true;
      },
      validationFailure () {
        return this.isValid === false
      },
    },
  }
</script>

<style scoped>
  .error {
    font-weight: bold;
    color: red;
    width: 20em;
    margin: 0 auto;
  }

  .qrCode {
    width: 20em;
    margin: 0 auto;
  }

  .btnChangeCamera {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, .8);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  .validation-success {
    color: green;
  }
  .validation-failure {
    color: red;
  }
</style>