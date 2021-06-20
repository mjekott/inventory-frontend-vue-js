<template>
  <section class="h-screen w-full text-gray-900 ">
    <div class="flex h-full w-full">
      <div class="h-full hidden xl:flex xl:w-1/2  bg-blue-500 bg-opacity-80 relative ">
        <div class="absolute inset-0 z-0 flex justify-center items-center p-48">
          <img src="../../assets/images/loginsvg.svg" class="object-fit z-0 w-full h-full" alt="" />
        </div>
      </div>
      <div class="h-full w-full xl:w-1/2 flex flex-col p-8 sm:p-0  justify-center items-center">
        <div class=" w-full sm:w-96 mx-auto flex flex-col space-y-4">
          <h2 class="text-3xl text-gray-700 tracking-wide text-center">Login</h2>
          <form class="space-y-2 w-full" @submit.prevent="signin">
            <div class="w-full">
              <label for="email" class="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                class="w-full rounded"
                placeholder="Enter Email"
                v-model="form.email"
              />
              <span v-if="errors.email" class="text-red-500 mt-2">{{ errors.email[0] }}</span>
            </div>
            <div>
              <label for="password" class="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                id="password rounded"
                class="w-full rounded"
                placeholder="Enter Password"
                v-model="form.password"
              />
              <span v-if="errors.email" class="text-red-500 mt-2">{{ errors.password[0] }}</span>
            </div>
            <div>
              <input type="checkbox" name="remember_me" id="remember_me" />
              <label for="remember_me" class="ml-1">Remember me</label>
            </div>
            <div>
              <button
                class="w-full flex items-center justify-center py-3
                bg-blue-600 text-white hover:bg-opacity-90 hover:text-gray-300"
                :disabled="isSubmitting"
              >
                {{ loading }}
              </button>
            </div>
          </form>
          <div class="flex justify-between text-xs text-gray-500 ">
            <router-link :to="{ name: 'register' }" class="hover:text-blue-600"
              >Create Account</router-link
            >
            <a href="#" class="hover:text-blue-600">Forgot your password</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {},
      isSubmitting: false,
    };
  },
  computed: {
    ...mapState(['userLoggedIn']),
    loading() {
      return this.isSubmitting ? 'Loading...' : 'Register';
    },
  },

  methods: {
    ...mapActions(['login']),
    async signin() {
      try {
        await this.login(this.form);
        this.$swal.fire({
          icon: 'success',
          text: 'Signed in successfully',
        });
        this.$router.push({ name: 'dashboard' });
      } catch (error) {
        this.errors = error.response.data.errors;
        this.$swal.fire({
          icon: 'error',
          text: 'Wrong email or password',
        });
      }
    },
  },
  created() {
    console.log(this.userLoggedIn);
    if (this.userLoggedIn) {
      this.$router.push({ name: 'dashboard' });
    }
  },
};
</script>

<style></style>
