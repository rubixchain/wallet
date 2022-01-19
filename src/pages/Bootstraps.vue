<template>
  <div id="Bootstraps">
    <section class="text-gray-600 body-font overflow-hidden">
      <button
        @click="changeBootButton()"
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
        {{ boot_button }}
      </button>
      <div v-if="boot_button == 'Add Bootstrap'" class="p-4">
        <input
          type="text"
          id="text"
          v-model="newBootstrap"
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
      <div
        v-if="bootstraps.length > 0 && bootstraps[0] != ''"
        class="container px-5 py-24 mx-auto"
      >
        <div
          v-for="(boot, index) in bootstraps"
          :key="boot.key"
          class="-my-8 divide-y-2 divide-gray-100"
        >
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700"
                >BOOTSTRAP {{ index + 1 }}
                <!-- <span
                  @click="swarmConnect(boot)"
                  class="cursor-pointer p-3 text-green-500 text-xs w-0"
                  >Swarm Connect</span
                > -->
              </span>
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
      boot_button: "Add new Bootstrap",
      newBootstrap: "",
      boot_button_stat: false,
      message: "",
      bootstraps: [],
    };
  },
  methods: {
    //function to change boot_button string
    changeBootButton: function () {
      if (this.boot_button == "Add new Bootstrap") {
        this.boot_button = "Add Bootstrap";
      } else if (this.boot_button == "Add Bootstrap") {
        //if text field is not empty, call addBootstrap function
        console.log(this.newBootstrap);
        if (this.newBootstrap != "") {
          this.addBootstrap(this.newBootstrap);
        }
        this.boot_button = "Add new Bootstrap";
      }
    },
    dashboard() {
      axios
        .get("http://localhost:1898/bootstrap")
        .then((response) => {
          this.message = response.data.message;
          this.message = this.message.replace(/"+/g, "");
          this.bootstraps = this.message.split(/(?=\/ip4)/);
          console.log("bootstrap");
          console.log(this.bootstraps);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    swarmConnect(data) {
      console.log("adding bootstrap");
      console.log(data);
      axios
        .get(`http://localhost:1898/connect`, null, {
          params: { id: data },
        })
        .then((response) => {
          console.log(response);
          this.newBootstrap = "";
          this.dashboard();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addBootstrap(data) {
      console.log("adding bootstrap");
      console.log(data);
      axios
        .post(`http://localhost:1898/bootstrap`, null, {
          params: { id: data },
        })
        .then((response) => {
          console.log(response);
          this.newBootstrap = "";
          this.dashboard();
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
          params: { id: data },
        })
        .then((response) => {
          console.log(response);
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