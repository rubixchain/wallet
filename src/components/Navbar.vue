<template>
  <header class="lg:pr-64 text-gray-400 bg-gray-900 body-font">
    <div
      class="
        container
        mx-auto
        flex flex-wrap
        p-5
        flex-col
        md:flex-row
        items-center
      "
    >
      <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <!-- <a class="mr-5 hover:text-white">First Link</a>
      <a class="mr-5 hover:text-white">Second Link</a>
      <a class="mr-5 hover:text-white">Third Link</a>
      <a class="hover:text-white">Fourth Link</a> -->
      </nav>
      <a
        class="
          flex
          order-first
          lg:order-none lg:w-1/5
          title-font
          font-medium
          items-center
          text-white
          lg:items-center lg:justify-center
          mb-4
          md:mb-0
        "
      >
        <img width="100" height="100" src="../assets/logo.png" alt="Rubix" />
        <span class="ml-3 text-xl xl:block lg:hidden">Rubix</span>
      </a>
      <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
        <!-- <button @click="syncCall" class="inline-flex items-center  bg-gray-800 border-0 py-1 px-3 focus:outline-none  hover:bg-gray-700 rounded text-base mt-4 md:mt-0"> {{sync}}
      </button> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  data() {
    return {
      did: "",
      sync: "sync",
    };
  },
  methods: {
    syncCall() {
      axios
        .get("http://localhost:1898/sync")
        .then((response) => {})
        .catch(function (error) {
          this.sync = "try again";
          console.log(error);
        });
    },

    check() {
      let self = this;
      axios
        .get("http://localhost:1898/check")
        .then((response) => {
          if (response.data.data.response != "User is Registered") {
            self.$router.push({ path: "/auth" });
          }
        })
        .catch(function (error) {
          // self.$router.replace({path: '/auth'})
        });
    },
  },
  mounted: function () {
    window.setInterval(() => {
      this.check();
    }, 3000);
  },

  beforeMount() {
    // this.check()
  },
};
</script>