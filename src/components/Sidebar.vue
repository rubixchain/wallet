<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="
      invisible
      md:visible
      h-screen
      overflow-hidden
      flex
      items-center
      justify-center
    "
    style="background: #edf2f7"
  >
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
              {{ transactionResponse }}
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
    <div
      class="
        min-h-screen
        flex flex-col flex-auto flex-shrink-0
        antialiased
        bg-gray-50
        text-gray-800
      "
    >
      <div class="fixed flex flex-col top-0 left-0 w-64 h-full">
        <div class="flex items-center justify-center h-24"></div>

        <div class="rounded flex justify-center">
          <div
            class="rounded shadow-md h-48 w-48 p-6 flex flex-col justify-around"
          >
            <div>
              <p class="text-base text-gray-600 text-black">Wallet Balance</p>
            </div>
            <div>
              <p class="text-2xl text-green-500 font-bold">RBT {{ balance }}</p>
            </div>
            <div class="text-sm">
              <p class="text-gray-600 text-black">Since last month</p>
            </div>
          </div>
        </div>

        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-4 space-y-5">
            <li>
              <a
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <!-- <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> -->
                </span>
                <button
                  @click="syncCall"
                  class="
                    bg-gray-800
                    border-0
                    py-2
                    px-8
                    focus:outline-none
                    hover:bg-gray-700
                    rounded
                  "
                >
                  {{ sync }}
                </button>
                
              </a>
              
            </li>
            <li>
              <a
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                </span>
                <button
                @click="$router.push({ name: 'StartQuorum' })"
                  class="
                    bg-gray-800
                    border-0
                    py-2
                    px-8
                    focus:outline-none
                    hover:bg-gray-700
                    rounded
                  "
                >
                   Start Quorum 
                </button>
                
              </a>
              
            </li>
            <li>
              <a
                @click="$router.push({ name: 'DashboardHome' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Home</span>
              </a>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Explorer' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Explorer</span>
              </a>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Wallet' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Wallet</span>
                <!-- <span class="px-2 py-0.5 ml-auto text-l font-medium tracking-wide text-green-500 bg-green-50 rounded-full">Add Credits</span> -->
              </a>
            </li>
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div
                  class="
                    text-l
                    font-light
                    tracking-wide
                    text-blue-700 text-gray-500
                  "
                >
                  Network
                </div>
              </div>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Bootstraps' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate"
                  >Bootstraps</span
                >
              </a>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Transactions' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate"
                  >Transactions</span
                >
              </a>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Settings' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate"
                  >Settings</span
                >
              </a>
            </li>
            <li>
              <a
                @click="$router.push({ name: 'Contacts' })"
                class="
                  duration-200
                  ease-in-out
                  relative
                  flex flex-row
                  items-center
                  h-11
                  focus:outline-none
                  hover:bg-grey-50
                  text-gray-600 text-black
                  hover:text-white
                  border-l-4 border-transparent
                  hover:border-red-500
                  border-indigo-500
                  pr-6
                "
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Contacts</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Sidebar",
  data() {
    return {
      sync: "Sync",
      balance: 0,
    };
  },
  methods: {
    syncCall() {
      this.sync = "Syncing..";
      axios
        .get("http://localhost:1898/sync")
        .then((response) => {
          this.sync = "Sync";
        })
        .catch(function (error) {
          this.sync = "try again";
          console.log(error);
        });
    },
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
    testLog(){
      console.log("test");
    },

    dashboard() {
      axios
        .get("http://localhost:1898/getAccountInfo")
        .then((response) => {
          this.balance = response.data.data.response.balance;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: function () {
    window.setInterval(() => {
      this.dashboard();
    }, 3000);
  },

  beforeMount() {
    // this.dashboard()
  },
};
</script>