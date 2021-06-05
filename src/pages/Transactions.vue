<template>
    <div id="Transactions">
      <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{stats.txnCount}}</h2>
        <p class="leading-relaxed">Highest Amount</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{stats.maxCredits}}</h2>
        <p class="leading-relaxed">Credits Earned</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{stats.spentCredits}}</h2>
        <p class="leading-relaxed">Credits Spent</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{{stats.unspentCredits}}</h2>
        <p class="leading-relaxed">Credits Left</p>
      </div>
    </div>
  </div>
</section>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-wrap flex-col">
          <div class="flex mx-auto flex-wrap mb-20">
            <a v-on:click="toggleTabs(1)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:text-white tracking-wider" v-bind:class="{'bg-gray-800 border-indigo-500 text-white rounded-t': openTab === 1, '': openTab !== 1}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Last 7 days
            </a>
            <a v-on:click="toggleTabs(2)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:text-white tracking-wider" v-bind:class="{'bg-gray-800 border-indigo-500 text-white rounded-t': openTab === 2, '': openTab !== 2}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>Send
            </a>
            <a v-on:click="toggleTabs(3)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:text-white tracking-wider" v-bind:class="{'bg-gray-800 border-indigo-500 text-white rounded-t': openTab === 3, '': openTab !== 3}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Recieved
            </a>
          </div>
        </div>
</section>
<section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 mx-auto flex flex-wrap">
    <div v-for="(t, index) in txns" :key="(t, index)" class="flex relative pb-5 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-800 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-l">{{index+1}}</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-grow sm:pl-3 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-white mb-1 text-xl">{{t.txn}}</h2>
          <div > 
            <!-- <h2 class="mb-1 text-l">amount: </h2> -->
            <h2 class="mb-1 text-l">sender: {{t.senderDID}}</h2>
            <h2 class="mb-1 text-l">receiver: {{t.receiverDID}}</h2>
            <h2 class="mb-1 text-l">comment: {{t.comment}}</h2>
            <!-- <h2 class="font-medium title-font text-white mb-1 text-l">quorum members: {{t.quorumList}}</h2> -->
          </div>
          <p class="leading-relaxed"> {{t.tokens}} tokens on {{t.Date}} in {{t.totalTime}} sec</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Transactions',
    data() {
        return {
            openTab: 1,
            stats: {},
            txns: []
        }
    },
    methods: {
      toggleTabs: function(tabNumber){
      this.openTab = tabNumber

      if(tabNumber==1) {

        axios.post('http://localhost:1898/getTxnByDate', {
          "sDate":"2021-05-07",
          "eDate":"2021-05-07"
        })
        .then((response) => {
          this.txns = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });

      } else if(tabNumber==2) {
        this.txns = []
        console.log("fetching sent transactions")

        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 100
        })
        .then((response) => {
          const data = response.data.data.response;
          data.forEach(element => {
            if(element.role=="Sender"){
              console.log(element)
              
              this.txns.push(element)
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      } else if(tabNumber==3) {
        console.log("fetching Received transactions")
        this.txns = []

        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 100
        })
        .then((response) => {
          const data = response.data.data.response;
          data.forEach(element => {
            if(element.role!="Sender"){
              
              this.txns.join(element)
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    },
      dashboard() {

        axios.get('http://localhost:1898/getTransactionHeader')
        .then((response) => {
          this.stats = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      transactions() {
        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 100
        })
        .then((response) => {
          this.txns = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });
      },


    },
    beforeMount() {
      // this.transactions()
      this.dashboard()
      this.openTab()
    }
}
</script>