<template>
    <div id="Transactions">
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
  <div class="container px-5 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{stats.txnCount}}</h2>
        <p class="leading-relaxed">Transactions</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{stats.maxCredits}}</h2>
        <p class="leading-relaxed">Credits Earned</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{stats.spentCredits}}</h2>
        <p class="leading-relaxed">Credits Spent</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{stats.unspentCredits}}</h2>
        <p class="leading-relaxed">Credits Left</p>
      </div>
    </div>
  </div>
</section>
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-wrap flex-col">
          <div class="flex mx-auto flex-wrap mb-20">
            <a v-on:click="toggleTabs(1)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:dark:text-white tracking-wider" v-bind:class="{'bg-red-200 dark:bg-gray-800 border-red-500 dark:border-indigo-500 dark:text-white rounded-t': openTab === 1, '': openTab !== 1}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Latest Transactions
            </a>
            <a v-on:click="toggleTabs(2)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:dark:text-white tracking-wider" v-bind:class="{'bg-red-200 dark:bg-gray-800 border-red-500 dark:border-indigo-500 dark:text-white rounded-t': openTab === 2, '': openTab !== 2}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>Sent
            </a>
            <a v-on:click="toggleTabs(3)" class="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-800 hover:dark:text-white tracking-wider" v-bind:class="{'bg-red-200 dark:bg-gray-800 border-red-500 dark:border-indigo-500 dark:text-white rounded-t': openTab === 3, '': openTab !== 3}">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Recieved
            </a>
          </div>
        </div>
</section>
<section class="dark:text-gray-400 dark:bg-gray-900 body-font">
  <div class="container px-5 mx-auto flex flex-wrap">
    <div v-for="(t, index) in txns" :key="(t, index)" class="flex relative pb-8 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-red-200 dark:bg-gray-800 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center dark:tbg-indigo-500 bg-red-500 dark:text-white relative z-10 title-font font-medium text-l">{{index+1}}</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        <div class="flex-grow sm:pl-3 mt-6 sm:mt-0">
          <h2 v-on:click="toggleModal(t.txn)" class="font-medium title-font dark:text-white mb-1 text-xl">{{t.txn}}</h2>
          <span class="p-1 title-font font-medium dark:text-white">{{t.nickname}}
                
                <button v-show="!t.edit" v-on:click="editContact(t)" class="pl-2 text-sm inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-0 px-2 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded mt-0 md:mt-0">
                  set nickname
                </button>
                <button v-show="t.edit" v-on:click="saveContact(t)" class="pl-2 text-sm inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-0 px-2 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded mt-0 md:mt-0">
                  save
                </button>
                <br>
              <input v-model="newNick" v-show="t.edit" v-if="true" type="nickname" id="nickname" name="nickname" class="w-1/2 bg-opacity-20 bg-transparent ring-2 ring-indigo-900 rounded border border-gray-600 border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </span>
          <div>
            <!-- <h2 class="mb-1 text-l">amount: </h2> -->
            <h2 v-if="openTab!=2" class="mb-1 text-l">sender: {{t.senderDID}}</h2>
            <h2 v-if="openTab!=3" class="mb-1 text-l">receiver: {{t.receiverDID}}</h2>
            <!-- <h2 class="mb-1 text-l">comment: {{t.comment}}</h2> -->
            <!-- <h2 class="font-medium title-font dark:text-white mb-1 text-l">quorum members: {{t.quorumList}}</h2> -->
          </div>
          <p class="leading-relaxed"> {{t.tokens.length}} <span v-if="t.tokens.length==1" >token</span><span v-if="t.tokens.length!=1">tokens</span> on {{t.Date}} in {{t.totalTime}} milli sec</p>
        </div>
      </div>
    </div>
  </div>
</section>
<div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Transaction Details
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <h2 class="mb-1 text-l">senderDID: {{details.senderDID}}</h2>
            <h2 class="mb-1 text-l">role: {{details.role}}</h2>
            <h2 class="mb-1 text-l">totalTime: {{details.totalTime}} milli seconds</h2>
            <h2 class="mb-1 text-l">Quorum Members</h2>
            <div v-for="quorum in details.quorumList" :key="quorum">
              <h2 class="mb-1 text-sm">{{quorum}}</h2>
            </div>
            <h2 class="mb-1 text-l">Tokens</h2>
            <div v-for="tokens in details.tokens" :key="tokens">
              <h2 class="mb-1 text-sm">{{tokens}}</h2>
            </div>
            <h2 class="mb-1 text-l">comment: {{details.comment}}</h2>
            <h2 class="mb-1 text-l">txn: {{details.txn}}</h2>
            <h2 class="mb-1 text-l">receiverDID: {{details.receiverDID}}</h2>
            <h2 class="mb-1 text-l">Date: {{details.Date}}</h2>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Transactions',
    data() {
      return {
        showModal: false,
        openTab: 1,
        stats: {},
        txns: [],
        details: {},
        payBox: false,
        newNick: ""
      }
    },
    methods: {

      editContact: function(person){
        
        this.txns.forEach(element => {
          element.edit = false;
          this.txns.push(element)
        })
        this._originalPerson = Object.assign({}, person);
        person.edit = true;
      },

      saveContact: function(person){
        Object.assign(person, this._originalPerson);
        const formData = new FormData()
        formData.append('did', person.senderDID)
        formData.append('nickname', this.newNick)
        
        axios.post('http://localhost:1898/addNickName', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
          console.log("SAVED NICKNAME");
        })
        .catch(function (error) {
          console.log(error);
        });
        person.edit = false;
      },

      toggleModal: function(txn){

        this.showModal = !this.showModal;
        axios.post('http://localhost:1898/getTxnDetails',{
          'transactionID': txn
        })
        .then((response) => {
          this.details = response.data.data.response[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      toggleTabs: function(tabNumber){
        this.openTab = tabNumber
        if(tabNumber==1) {
          this.txns = []
          axios.post('http://localhost:1898/getTxnByCount', {
           "txnCount": 25
          })
          .then((response) => {
            const data = response.data.data.response;
            data.forEach(element => {
              element.edit = false;
              this.txns.push(element)
            })
          })
          .catch(function (error) {
            console.log(error);
          });

        } else if(tabNumber==2) {
          this.txns = []
          axios.post('http://localhost:1898/getTxnByCount', {
            "txnCount": 100
          })
          .then((response) => {
            const data = response.data.data.response;
            data.forEach(element => {
              if(element.role=="Sender"){
                element.edit = false;
                this.txns.push(element)
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });

        } else if(tabNumber==3) {
          this.txns = []
      
          axios.post('http://localhost:1898/getTxnByCount', {
            "txnCount": 100
          })
          .then((response) => {
            const data = response.data.data.response;
            data.forEach(element => {
              if(element.role=="Receiver"){
                element.edit = false;
                this.txns.push(element)
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

    },
    beforeMount() {
      this.$loading(false)
      // this.transactions()
      this.dashboard()
      this.openTab()
    }
}
</script>