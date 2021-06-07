<template>
    <div id="home">
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-5 py-5 mx-auto flex items-center md:flex-row flex-col">
          <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
            <h2 class="text-xs dark:text-indigo-400 tracking-widest font-medium title-font mb-1">{{dashboardData.nickname}}</h2>
            <h1 class="md:text-xl text-l font-medium title-font dark:text-white">{{dashboardData.did}}</h1>
          </div>
          <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-500 dark:text-gray-500 mb-1">Proof Credits</span>
                <span class="title-font font-medium">{{dashboardData.proofCredits}}</span>
              </span>
            </button>
            <button @click="$router.push({name:'Wallet'})" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-500 dark:text-gray-500 mb-1">Balance</span>
                <span class="title-font font-medium">RBX {{dashboardData.balance}}</span>
              </span>
            </button>
            <button @click="$router.push({name:'Transactions'})" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-500 dark:text-gray-500 mb-1">Transactions</span>
                <span class="title-font font-medium">{{dashboardData.totalTxn}}</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-wrap">
          <div class="flex flex-wrap w-full">
            <div class="lg:w-3/5 md:w-3/5 md:pr-10 md:py-6">

              <div v-for="t in txns" :key="t" class="flex relative">
                <div class="flex-shrink-0 w-10 h-10 rounded-full dark:tbg-indigo-500 bg-red-500 inline-flex items-center justify-center dark:text-white relative z-10">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-l dark:text-white mb-1 tracking-wider">{{t.txn}}</h2>
                  <p class="leading-relaxed">on {{t.Date}}</p>
                </div>
              </div>

            </div>
            <div class="lg:w-2/5 md:w-2/5 bg-red-200 dark:bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 class="dark:text-white text-lg font-medium title-font mb-5">New Transaction</h2>
              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-l dark:text-gray-400">Reciever DID</label>
                <input type="text" id="full-name" name="full-name" class="w-full bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-l dark:text-gray-400">Amount</label><br>
                <span class="p-6 title-font font-medium">RBX</span>
                <input type="email" id="email" name="email" class="w-1/3 bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-l dark:text-gray-400">Comments</label>
                <input type="email" id="email" name="email" class="w-full bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
              <button @click="initiateTransaction" class="dark:text-white dark:tbg-indigo-500 bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-white dark:hover:bg-indigo-600 rounded text-lg">Initiate Transaction</button>
              <p class="text-xs mt-3">Transaction will take approx 1 min to complete.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DashboardHome',
    data() {
        return {
            dashboardData: {},
            quorum: [],
            txns: [],
            did:""
        }
    },
    methods: {
      initiateTransaction() {
        axios.post('http://localhost:1898/initiateTransaction', {
          "receiver":"",
          "tokenCount": 1,
          "comment":"",
          "type": 2,
          // "Quorum": this.quorum
        })
        .then((response) => {

        })
        .catch(function (error) {
          console.log(error);
        });
      },

      transactions() {
        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 5
        })
        .then((response) => {
          this.txns = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      dashboard() {
        axios.get('http://localhost:1898/getDashboard')
        .then((response) => {
          this.dashboardData = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    },
    beforeMount(){
      this.dashboard()
      this.transactions()
 }
}
</script>