<template>
    <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
    <!-- you will need to add a little "X" button next to the logo in order to close it though -->
    <div class="invisible md:visible h-screen overflow-hidden flex items-center justify-center" style="background: #edf2f7;">
    <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
      <div class="fixed flex flex-col top-0 left-0 w-64 h-full">
        <div class="flex items-center justify-center h-24">
        </div>
        <div class="rounded flex justify-center">
          <div class="rounded shadow-md h-48 w-48 p-6 flex flex-col justify-around">
            <div>
              <p class="text-base text-gray-600">Wallet Balance</p>
            </div>
            <div>
              <p class="text-2xl text-green-500 font-bold">RBX {{balance}}</p>
            </div>
            <div class="text-sm">
              <p class="text-gray-600">Since last month</p>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-4 space-y-5">
            <li>
              <a @click="$router.push({name:'DashboardHome'})" class="duration-200 ease-in-out relative flex flex-row items-center h-11 focus:outline-none hover:bg-grey-50 text-gray-600 hover:dark:text-white border-l-4 border-transparent hover:border-red-500 dark:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Home</span>
              </a>
            </li>
            <li>
              <a @click="$router.push({name:'Explorer'})" class="duration-200 ease-in-out relative flex flex-row items-center h-11 focus:outline-none hover:bg-grey-50 text-gray-600 hover:dark:text-white border-l-4 border-transparent hover:border-red-500 dark:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Explorer</span>
              </a>
            </li>
            <li>
              <a  @click="$router.push({name:'Wallet'})" class="duration-200 ease-in-out relative flex flex-row items-center h-11 focus:outline-none hover:bg-grey-50 text-gray-600 hover:dark:text-white border-l-4 border-transparent hover:border-red-500 dark:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Wallet</span>
                <!-- <span class="px-2 py-0.5 ml-auto text-l font-medium tracking-wide text-green-500 bg-green-50 rounded-full">Add Credits</span> -->
              </a>
            </li>
            <li class="px-5">
              <div class="flex flex-row items-center h-8">
                <div class="text-l font-light tracking-wide text-blue-500 dark:text-gray-500">Network</div>
              </div>
            </li>
            <li>
              <a @click="$router.push({name:'Transactions'})" class="duration-200 ease-in-out relative flex flex-row items-center h-11 focus:outline-none hover:bg-grey-50 text-gray-600 hover:dark:text-white border-l-4 border-transparent hover:border-red-500 dark:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </span>
                <span class="ml-2 text-l tracking-wide truncate">Transactions</span>
              </a>
            </li>
            <li>
              <a @click="$router.push({name:'Contacts'})" class="duration-200 ease-in-out relative flex flex-row items-center h-11 focus:outline-none hover:bg-grey-50 text-gray-600 hover:dark:text-white border-l-4 border-transparent hover:border-red-500 dark:border-indigo-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
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
import axios from 'axios'
export default {
    name: 'Sidebar',
    data() {
        return {
            balance: 0
        }
    },
    methods: {
      
      // getTags: function() {
      //   axios.get('http://498ce43301f8.ngrok.io/api/tags')
      //   .then((response) => {
      //     this.tags = response.data.tags
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      // },

      dashboard() {
        axios.get('http://localhost:1898/getDashboard')
        .then((response) => {
          this.balance = response.data.data.response.balance;
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    },
    beforeMount(){
    this.dashboard()
 }
}
</script>