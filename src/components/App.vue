<template>
  <div id="app">

    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">GoStyle</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Accueil</router-link></b-nav-item>
            <b-nav-item><router-link to="/liste_promotions">Promotions</router-link></b-nav-item>
            <b-nav-item><router-link to="/qrcode_reader">Scanner un QRCode</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <br />

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: black;
}

.center {
  display: grid;
  place-items: center;
}

</style>
