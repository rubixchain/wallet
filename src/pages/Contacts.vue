<template>
    <div id="Contacts">
        <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
  <div class="container px-5 py-0 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/2 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{dashboardData.totalTxn}}</h2>
        <p class="leading-relaxed">Transactions</p>
      </div>
      <div class="p-4 sm:w-1/2 w-1/2">
        <h2 class="title-font font-medium sm:text-4xl text-3xl dark:text-white">{{dashboardData.onlinePeers}}</h2>
        <p class="leading-relaxed">Peers Online</p>
      </div>
      
    </div>
  </div>
</section>
        <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
  <div class="container px-5 py-5 mx-auto">
    <h1 class="text-3xl font-medium title-font dark:text-white mb-12 text-center">Contacts in network</h1>
    <div class="flex flex-wrap -m-4">
      <div v-for="cntx in contacts" :key="cntx" class="p-4 md:w-1/2 w-full">
        <div class=" bg-red-200 dark:bg-gray-800 bg-opacity-40 p-0 rounded">
          <a class="inline-flex items-center">
            <span class="flex-grow flex flex-col pl-4 py-2">
              <span class="title-font font-medium dark:text-white text-sm">{{cntx.did}}</span>
              <span class="p-1 title-font font-medium dark:text-white">{{cntx.nickname}}
                
                <button v-show="!cntx.edit && cntx.nickname==null" v-on:click="editContact(cntx)" class="pl-2 text-sm inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-0 px-2 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded mt-0 md:mt-0">
                  set nickname
                </button>
                <button v-show="!cntx.edit" v-on:click="editContact(cntx)" class="pl-2 text-sm inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-0 px-2 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded mt-0 md:mt-0">
                  edit
                </button>
                <button v-show="cntx.edit" v-on:click="saveContact(cntx)" class="pl-2 text-sm inline-flex items-center bg-red-500 dark:bg-gray-800 border-0 py-0 px-2 focus:outline-none hover:bg-red-600 dark:hover:bg-gray-700 rounded mt-0 md:mt-0">
                  save
                </button>
              </span>
              <input v-model="newNick" v-show="cntx.edit" v-if="true" type="nickname" id="nickname" name="nickname" class="w-1/2 bg-opacity-20 bg-transparent ring-2 ring-indigo-900 rounded border border-gray-600 border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </span>
          </a>
            <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button @click="payment(!payBox)" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-700 dark:text-gray-500 mb-1">make</span>
                <span class="title-font font-medium">payment</span>
              </span>
            </button>
            <button @click="$router.push({name:'Transactions'})" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-700 dark:text-gray-500 mb-1">view all</span>
                <span class="title-font font-medium">transactions</span>
              </span>
            </button>
          </div>
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
    name: 'Contacts',
    data() {
        return {
          contacts: [],
          dashboardData: {},
          payBox: false,
          newNick: ""
        }
    },
    methods: {

      editContact: function(person){
            this._originalPerson = Object.assign({}, person);
            person.edit = true;
      },

      saveContact: function(person){
            Object.assign(person, this._originalPerson);

            const formData = new FormData()
            formData.append('did', person.did)
            formData.append('nickname', this.newNick)
            console.log("SSAAAAMMMMPLLEEE PERERRRRROOOOOINNN")
            console.log(this.newNick)
            axios.post('http://localhost:1898/addNickName', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
            })
            .then((response) => {
              this.contact()
            })
            .catch(function (error) {
              console.log(error);
            });

        
            person.edit = false;
      },

      setNickname() {
        const formData = new FormData()
        formData.append('did', this.passphrase)
        formData.append('nickname', this.selectedFile)
        axios.post('http://localhost:1898/addNickName', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
          this.contact()
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      allContacts() {
        axios.get('http://localhost:1898/getContactsList')
        .then((response) => {
          var contact = response.data.data.response;
          contact.forEach(element => {
            element.edit = false;
            this.contacts.push(element);
            
          });
console.log(this.contacts)
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
      this.allContacts()
      this.dashboard()
 }
}
</script>