<template>
  <div id="app">
    <!-- Nav -->
    <div
      id="nav"
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="margin: -60px -1px 2px -2px;"
      v-if="isLoggedIn"
    >
      <a class="navbar-brand" href="javascript::void();">VSMS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ name: 'Home' }" class="nav-link">
              <span class="sr-only">(current)</span> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Checkin' }" class="nav-link">Checkin</router-link>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            <i class="fa fa-sign-out"></i> Logout
          </button>
        </form>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
<style scoped src="@/assets/css/styles.css">
</style>
