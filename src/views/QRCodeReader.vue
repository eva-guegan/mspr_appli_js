<template>
  <div class="home">
    <h3>Scannez un QRCode GoStyle !</h3>

    <p class="error">{{ error }}</p>

    <div class="qrCode">
      <qrcode-stream @decode="onDecode" @init="onInit" :camera="camera">

        <div class="loading-indicator" v-if="loading">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>

        <button @click="switchCamera" class="btnChangeCamera">
          <img src="../../public/switch_camera.png" alt="switch camera">
        </button>

        <div v-if="validationPending" class="validation-pending">
          Traitement en cours ...
        </div>

        <div v-if="validationSuccess" class="validation-success">
          Le coupon a bien été enregistrer !
        </div>

        <div v-if="validationFailure" class="validation-failure">
          Il y a eu une erreur ! Le code est peut-être déjà scanner ou ce n'est pas un code GoStyle
        </div>
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

        // pretend it's taking really long
        await this.timeout(2000)
        // TODO : changer le startWith avec GOStyle
        this.isValid = content.startsWith('T')
        // enregistrer en bdd
        if (this.isValid === true) {
          this.saveBdd = true
          console.log('enregistrer en bdd')
          // await this.axios
          //     .post(this.$root.baseApi + '/user_coupons', {
          //       "id_user": "1",
          //       "id_coupon": "1",
          //       "isused": "0",
          //     })
          // TODO : voir quand enregistre deux fois le même code pour le même user
          // .then(res => {
          //   this.saveBdd = res.data.bool;
          //   if (this.saveBdd === false) {
          //     this.isValid = false
          //   }
          // })
        }

        // some more delay, so users have time to read the message
        await this.timeout(3500)
        //redirection vers user_coupons
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
          // successfully initialized
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