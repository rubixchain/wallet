<template>
    <div id="CreateDID">
       <div class="h-full min-h-screen text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Create new Decentralized Identity</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Decentralized Identity (DID) can be used to send and reciever transactions in RubiX Network</p>
    </div>
    <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">
      <div class="relative sm:mb-0 flex-grow w-full">
        <label for="passphrase" class="leading-7 text-sm text-gray-400">Passphrase</label>
        <input v-model="passphrase" type="text" id="passphrase" name="passphrase" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      </div>
      <div class="relative sm:mb-0 flex-grow w-full">
        <label for="email" class="leading-7 text-sm text-gray-400">DID Image</label>
        <input @change="onFileChanged" type="file" id="file" name="file" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
      </div>
      <button @click="create" class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create</button>
    </div>
  </div>
</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreateDID',
    data() {
        return {
          passphrase: "",
          selectedFile: null
        }
    },
    methods: {
      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
      },
      create() {
        const formData = new FormData()
        formData.append('data', this.passphrase)
        formData.append('image', this.selectedFile)
        console.log(this.passphrase)
        console.log(this.selectedFile)
        axios.post('http://localhost:1898/create', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
          if(response.data.data.response.Status =='Success') {
            axios.get('http://localhost:1898/start')
            .then((response) => {
              this.$router.push({path: '/home'})
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    beforeMount(){
      this.create()
    }
}
</script>