<template>
    <div id="StartQuorum">
      <section class="text-white bg-gray-900 body-font">
            <div
              class="
              
                lg:100%
                md:100%
                bg-opacity-50
                rounded-lg
                p-20
                flex flex-col
                md:ml-auto
                items-center
                mt-10
                md:mt-0
              "
            >
              <h2 class="text-white text-lg font-medium title-font mb-5">
                Start Quorum Service 
              </h2>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-l text-white"
                  >Enter Quorum Key Password</label
                >
                <vue-simple-suggest
                  type="password"
                  v-model="quorumKey.quorumKeyPass"
                  :list="simpleSuggestionList"
                  :filter-by-query="false"
            
                >
                </vue-simple-suggest>
              </div>
              <button
                @click="startQuorumService()" 
                class="
                  text-white
                  border-0
                  py-2
                  px-8
                  focus:outline-none
                  rounded
                  text-lg
                "
                v-bind:class="'bg-indigo-500   hover:bg-indigo-600'"
              >
                Start Quorum Service
              </button>
            </div>
        </section>
      <div
        v-if="showModal"
        class="
          overflow-x-hidden overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          justify-center
          items-center
          flex
        "
      >
        <div class="relative w-auto my-6 mx-auto max-w-6xl">
          <!--content-->
          <div
            class="
              border-0
              rounded-lg
              shadow-lg
              relative
              flex flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
          >
            <!--header-->
            <div
              class="
                flex
                items-start
                justify-between
                p-5
                border-b border-solid border-blueGray-200
                rounded-t
              "
            >
              <h3 class="text-3xl font-semibold">
                {{ startQuorumResponse }}
              </h3>
              <button
                class="
                  p-1
                  ml-auto
                  bg-transparent
                  border-0
                  text-black
                  opacity-5
                  float-right
                  text-3xl
                  leading-none
                  font-semibold
                  outline-none
                  focus:outline-none
                "
                v-on:click="toggleModal()"
              >
                <span
                  class="
                    bg-transparent
                    text-black
                    opacity-5
                    h-6
                    w-6
                    text-2xl
                    block
                    outline-none
                    focus:outline-none
                  "
                >
                  ×
                </span>
              </button>
            </div>
            
            <div
              class="
                flex
                items-center
                justify-end
                p-6
                border-t border-solid border-blueGray-200
                rounded-b
              "
            >
              <button
                class="
                  text-red-500
                  bg-transparent
                  border border-solid border-red-500
                  hover:bg-red-500 hover:text-white
                  active:bg-red-600
                  font-bold
                  uppercase
                  text-sm
                  px-6
                  py-3
                  rounded
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  ease-linear
                  transition-all
                  duration-150
                "
                type="button"
                v-on:click="toggleModal()"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VueSimpleSuggest from "vue-simple-suggest";
  import "vue-simple-suggest/dist/styles.css";
  import axios from "axios";
  
  export default {
    name: "DashboardHome",
    components: {
      VueSimpleSuggest,
    },
    data() {
      return {
        showModal: false,
        reloadPageNow: false,
        startQuorumResponse: "",
        quorumKey: {
          quorumKeyPass: "",
        }
  
      };
    },
    methods: {
     toggleModal: function () {
        this.showModal = !this.showModal;
      },
     updateReloadState(){
          this.reloadPageNow = true;
      },
     reloadPage(){
         if(this.reloadPageNow){
              window.location.reload();
         }
      },
     startQuorumService() {
        axios
          .post("http://localhost:1898/startQuorumService", {
            pvtKeyPass: this.quorumKey.quorumKeyPass,
          })
          .then((response) => {
            this.startQuorumResponse = response.data.data.response.message;
            console.log(this.startQuorumResponse);
            this.toggleModal();
            this.updateReloadState();
            setTimeout(this.reloadPage, 3000);
          })
          .catch(function (error) {
            console.log(error);
            this.startQuorumResponse = "Error, Try again!";
            this.toggleModal();
          });
      },
    },
  
  };
  </script>
  <style scoped>
  input.disable-input {
    background-color: black;
  }
  </style>