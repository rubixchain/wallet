<template>
  <div id="Bootstraps">
    <section class="text-gray-600 body-font overflow-hidden">
      <button
        class="
          flex
          mx-auto
          mt-16
          text-white
          bg-indigo-500
          border-0
          py-2
          px-8
          focus:outline-none
          hover:bg-indigo-600
          rounded
          text-lg
        "
      >
        Add new Bootstrap
      </button>
      <div class="p-4">
        <input
          type="text"
          id="bootstrap"
          name="text"
          class="
            w-full
            bg-transparent
            rounded
            border border-gray-300
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
            text-base
            outline-none
            text-gray-100
            py-1
            px-3
            leading-8
            transition-colors
            duration-200
            ease-in-out
          "
        />
      </div>
      <div class="container px-5 py-24 mx-auto">
        <div
          v-for="(boot, index) in bootstraps"
          :key="boot.key"
          class="-my-8 divide-y-2 divide-gray-100"
        >
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700"
                >BOOTSTRAP {{ index + 1 }}</span
              >
              <span
                @click="removeBootstrap(boot)"
                class="cursor-pointer mt-1 text-red-500 text-sm w-0"
                >Remove</span
              >
            </div>
            <div class="md:flex-grow">
              <a class="text-indigo-500 inline-flex items-center mt-4"
                >{{ boot }}
              </a>
            </div>
          </div>

          <div class="py-8 flex flex-wrap md:flex-nowrap"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Bootstraps",
  data() {
    return {
      message: "",
      bootstraps: [],
    };
  },
  methods: {
    dashboard() {
      axios
        .get("http://localhost:1898/bootstrap")
        .then((response) => {
          this.message = response.data.message;
          this.bootstraps = this.message.split('""');
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    removeBootstrap(data) {
      console.log("removing bootstrap");
      console.log(data);
      axios
        .delete("http://localhost:1898/bootstrap", {
          data: { id: data },
        })
        .then((response) => {
          this.dashboard();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  beforeMount() {
    this.$loading(false);
    // this.transactions()
    this.dashboard();
    this.openTab();
  },
};
</script>