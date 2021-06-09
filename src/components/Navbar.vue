<template>
<header class="lg:pr-64 dark:text-gray-400 dark:bg-gray-900 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <!-- <a class="mr-5 hover:dark:text-white">First Link</a>
      <a class="mr-5 hover:dark:text-white">Second Link</a>
      <a class="mr-5 hover:dark:text-white">Third Link</a>
      <a class="hover:dark:text-white">Fourth Link</a> -->
    </nav>
    <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center dark:text-white lg:items-center lg:justify-center mb-4 md:mb-0">
      <img width="100" height="100" src="../assets/logo.png" alt="RubiX">
      <span class="ml-3 text-xl xl:block lg:hidden">RubiX</span>
    </a>
    <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      <button @click="syncCall" class="inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded text-base mt-4 md:mt-0"> {{sync}}
        <!-- <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg> -->
      </button>
    </div>
  </div>
</header>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    name: 'Navbar',
    computed: {
        ...mapState(['sideBarOpen'])
    },
    data() {
        return {
          did: "",
          sync: "sync",
        }
    },
    methods: {
      syncCall() {
      axios.get('http://localhost:1898/sync')
      .then((response) => {
      })
      .catch(function (error) {
        this.sync = "try again"
        console.log(error);
      });
     },

     check() {
      axios.get('http://localhost:1898/check')
      .then((response) => {
        if(response.data.data.response != "User is Registered") {
          this.$router.push({path: '/auth'})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
     }
    },
    beforeMount(){
        this.check()
    }
}
</script>