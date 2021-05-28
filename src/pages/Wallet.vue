<template>
    <div id="Wallet">
        <section class="text-gray-400 bg-gray-900 body-font">
            <div class="container px-5 py-5 mx-auto">
                <div class="text-center mb-20">
                <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">RubiX wallet</h1>
                </div>
                <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                <div class="p-2  w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-green-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span class="text-indigo-400 tracking-widest font-medium title-font">DID</span>
                    <span class="px-3 title-font font-medium text-white">{{dashboardData.did}}</span>
                    </div>
                </div>
                <div class="p-2  w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">WID</span>
                    <span class="px-3 title-font font-medium text-white">{{dashboardData.wid}}</span>
                    </div>
                </div>
                <div class="p-2  w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">Last Transaction</span>
                    <span class="px-3 title-font font-medium text-white">{{lastTxn}}</span>
                    </div>
                </div>
                <div class="p-2 sm:w-1/2 w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">Contacts</span>
                    <span class="px-3 title-font font-medium text-white">{{dashboardData.contactsCount}}</span>
                    </div>
                </div>
                <div class="p-2 sm:w-1/2 w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">Transaction</span>
                    <span class="px-3 title-font font-medium text-white">{{dashboardData.totalTxn}}</span>
                    </div>
                </div>
                <div class="p-2 sm:w-1/2 w-full">
                    <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">Proof Credits</span>
                    <span class="px-3 title-font font-medium text-white">{{dashboardData.proofCredits}}</span>
                    <div v-if="dashboardData.proofCredits>10" class="px-6">
                    <button @click="mine" class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">Mine Token</button>
                    </div>
                    </div>
                </div>
                <div class="p-2 sm:w-1/2 w-full">
                    <!-- <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                    <span class="text-indigo-400 tracking-widest font-medium title-font">Transaction</span>
                    <span class="px-3 title-font font-medium text-white">20</span>
                    </div> -->
                </div>
                </div>
                <button @click="$router.push({name:'DashboardHome'})" class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go Dashboard</button>
            </div>
            </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Wallet',
    data() {
        return {
            dashboardData: {},
            lastTxn: ""
        }
    },
    methods: {

        mine() {
            console.log("calling mine")
            axios.get('http://localhost:1898/mine')
        .then((response) => {
        })
        .catch(function (error) {
          console.log(error);
        });
        },

        transactions() {
        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 1
        })
        .then((response) => {
          this.lastTxn = response.data.data.response[0].txn;
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