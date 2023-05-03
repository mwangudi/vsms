
<template>
  <div class="row">
    <div class="col-md-10 card card-login mx-auto text-center bg-dark">
      <div class="card-header mx-auto bg-dark">
        <span class="logo_title mt-5">Login to VSMS</span>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input
              type="email"
              v-model="email"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': submitted && !email }"
            >
            <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
          </div>

          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-key"></i>
              </span>
            </div>
            <input
              type="password"
              v-model="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && !password }"
            >
            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
          </div>

          <div class="form-group">
            <button class="btn btn-outline-danger float-right login_btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },

  methods: {
    ...mapActions(["login"]),
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      }
    }
  }
};
</script>