<template>
  <div id="CreateDID">
    <div class="h-full min-h-screen text-white bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white"
          >
            Create new Decentralized Identity
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Decentralized Identity (DID) can be used to send and reciever
            transactions in Rubix Network
          </p>
        </div>
        <div
          class="
            flex
            lg:w-2/3
            w-full
            sm:flex-row
            flex-col
            mx-auto
            px-8
            sm:px-0
            items-end
            sm:space-x-4 sm:space-y-0
            space-y-4
          "
        >
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="passphrase" class="leading-7 text-sm text-white"
              >Passphrase</label
            >
            <input
              v-model="passphrase"
              type="text"
              id="passphrase"
              name="passphrase"
              class="
                w-full
                bg-gray-800 bg-opacity-40
                rounded
                border border-gray-700
                focus:border-red-500
                border-indigo-500
                focus:ring-2 focus:ring-indigo-900 focus:bg-transparent
                text-base
                outline-none
                text-gray-100
                py-1
                px-3
                leading-8
                transition-colors
                duration-200
                ease-in-out
              "
            />
          </div>
          <div class="relative sm:mb-0 flex-grow w-full">
            <label for="email" class="leading-7 text-sm text-white"
              >DID Image</label
            >
            <!-- <input @change="onFileChanged" type="file" id="file" name="file" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-900 text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"> -->
            <button
              @click="generate"
              class="
                text-white
                t
                bg-indigo-500
                border-0
                py-3
                px-6
                focus:outline-none
                hover:bg-red-300 hover:bg-indigo-600
                rounded
                text-lg
              "
            >
              Generate Image
            </button>
          </div>
          <button
            @click="create"
            class="
              text-white
              tbg-indigo-500
              border-0
              py-3
              px-6
              focus:outline-none
              hover:bg-red-300 hover:bg-indigo-600
              rounded
              text-lg
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var fileHere;
export default {
  name: "CreateDID",
  data() {
    return {
      passphrase: "",
      selectedFile: null,
      selectedFile2: null,
      fileHere: null,
    };
  },
  methods: {
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },
    generate() {
      axios.get("http://localhost:1898/generate").then((response) => {
        if (document.getElementById("generatedImg") == null) {
          var img = document.createElement("img");
          img.src = response.data.data.response;
          img.id = "generatedImg";
          document.getElementsByTagName("body")[0].appendChild(img);
          document.getElementById("generatedImg").style.display = "block";
          document.getElementById("generatedImg").style.margin = "auto";
          document.getElementById("generatedImg").style.position = "relative";
          document.getElementById("generatedImg").style.top = "-400px";
          this.selectedFile2 = response.data.data.response;
          this.urltoFile(this.selectedFile2, "Output.png", "image/png").then(
            function (file) {
              fileHere = file;
            }
          );
        }
      });
    },
    urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    },
    create() {
      //alert("hai");
      document.getElementById("generatedImg").style.display = "none";
      this.$loading(true);

      const formData = new FormData();
      //alert("here")
      //this.$loading(true);
      /* formData.append('data', this.passphrase)
        formData.append('image', this.selectedFile) */
      formData.append("data", document.getElementById("passphrase").value);
      formData.append("image", fileHere);
      axios
        .post("http://localhost:1898/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.data.response.Status == "Success") {
            axios
              .get("http://localhost:1898/start")
              .then((response) => {
                this.$loading(false);
                this.$router.push({ path: "/home" });
              })
              .catch(function (error) {
                alert("catch2");
                console.log(error);
                this.$loading(false);
              });
          }
        })
        .catch(function (error) {
          alert("catch");
          console.log(error);
          this.$loading(false);
        });
    },
    check() {
      let self = this;
      axios
        .get("http://localhost:1898/check")
        .then((response) => {
          if (response.data.data.response == "User is Registered") {
            self.$router.push({ path: "/home" });
          }
        })
        .catch(function (error) {
          // self.$router.replace({path: '/auth'})
        });
    },
  },

  beforeMount() {
    this.check();
  },
};
</script>