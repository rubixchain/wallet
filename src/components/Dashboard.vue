<template>
  <div class="text-gray-400 bg-gray-900 body-font leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">

      <Sidebar />

      <div class="w-full pl-0 lg:pl-64 min-h-screen">

        <Navbar />

        <div class="p-6 mb-20">
          <router-view />
        </div>

        <Footer />

      </div>
    </div>
  </div>
</template>

// TODO: HIDE SIDEBAR

<script>
import { mapState } from 'vuex'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    Sidebar,
    Navbar,
    Footer
  }
}
</script>
