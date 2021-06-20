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
          <h2 class="text-3xl text-gray-700 tracking-wide text-center">Register</h2>
          <form class="space-y-2 w-full" @submit.prevent="register">
            <div class="w-full">
              <label for="email" class="block mb-2 text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                class="w-full rounded"
                placeholder="Enter FullName"
                v-model="form.name"
              />
              <span v-if="errors.name" class="text-red-500 mt-2">{{ errors.name[0] }}</span>
            </div>
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
              <span v-if="errors.password" class="text-red-500 mt-2">{{ errors.password[0] }}</span>
            </div>
            <div>
              <label for="password" class="block text-gray-600 mb-2">Confirm Password</label>
              <input
                type="password"
                id="password_comfirm"
                class="w-full rounded"
                placeholder="Confirm Password"
                v-model="form.password_confirmation"
              />
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
          <div class="flex justify-between text-xs text-gray-500">
            <router-link :to="{ name: 'login' }" class="hover:text-blue-600 text-center w-full"
              >Already have an account? &nbsp; Please login</router-link
            >
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
        password_confirmation: '',
        name: '',
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
    ...mapActions(['signup']),
    async register() {
      this.isSubmitting = true;
      try {
        await this.signup(this.form);
        this.$swal.fire({
          icon: 'success',
          text: 'Registration Successful',
        });
        this.isSubmitting = false;
        this.$router.push({ name: 'dashboard' });
      } catch (error) {
        this.isSubmitting = false;
        this.errors = error.response.data.errors;
      }
    },
  },
  created() {
    if (this.userLoggedIn) {
      this.$router.push({ name: 'dashboard' });
    }
  },
};
</script>

<style></style>
