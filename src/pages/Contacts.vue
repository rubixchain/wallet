<template>
    <div id="Contacts">
        <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-0 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/2 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{dashboardData.totalTxn}}</h2>
        <p class="leading-relaxed">Transactions</p>
      </div>
      <div class="p-4 sm:w-1/2 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{dashboardData.onlinePeers}}</h2>
        <p class="leading-relaxed">Peers Online</p>
      </div>
      
    </div>
  </div>
</section>
        <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-5 mx-auto">
    <h1 class="text-3xl font-medium title-font text-white mb-12 text-center">Contacts in network</h1>
    <div class="flex flex-wrap -m-4">
      <div v-for="cntx in contact" :key="cntx" class="p-4 md:w-1/2 w-full">
        <div class=" bg-gray-800 bg-opacity-40 p-0 rounded">
            <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button @click="payment(!payBox)" class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-500 mb-1">make</span>
                <span class="title-font font-medium">payment</span>
              </span>
            </button>
            <button @click="$router.push({name:'Transactions'})" class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-500 mb-1">view all</span>
                <span class="title-font font-medium">transactions</span>
              </span>
            </button>
          </div>
          <a class="inline-flex items-center">
            <span class="flex-grow flex flex-col pl-4 py-1">
              <span class="title-font font-medium text-white">{{cntx}}</span>
            </span>
          </a>
        </div>
      </div>
      <div class="p-4 md:w-1/2 w-full">
        <!-- <div class=" bg-gray-800 bg-opacity-40 p-0 rounded">
            <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button @click="payment(!payBox)" class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-500 mb-1">make</span>
                <span class="title-font font-medium">payment</span>
              </span>
            </button>
            <button @click="$router.push({name:'Transactions'})" class="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-gray-500 mb-1">view all</span>
                <span class="title-font font-medium">transactions</span>
              </span>
            </button>
          </div>
          <p class="leading-relaxed mb-6"></p>
          <a class="inline-flex items-center">
            <span class="flex-grow flex flex-col pl-4">
              <span class="title-font font-medium text-white">QmZc4J31mnSRgvwShpHgBugLaFsGd2ZUGyCeZpLVuf3Qnn</span>
            </span>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Contacts',
    data() {
        return {
          contact: [],
          dashboardData: {},
          payBox: false
        }
    },
    methods: {

      contacts() {
        axios.get('http://localhost:1898/getContactsList')
        .then((response) => {
          this.contact = response.data.data.response;
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
      this.contacts()
      this.dashboard()
 }
}
</script>