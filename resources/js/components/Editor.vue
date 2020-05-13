<template>
    <div class="flex flex-1 overflow-hidden">
        <!-- Content -->
        <div class="px-8 py-4 flex-grow flex  flex flex-col">
            <!-- Header -->
            <div class="flex">
                <div class="text-blue-900 flex">
                    <div data-feather="file" class="mr-3"></div>
                    Zoo Inc - Poster Design
                </div>
                <div class="ml-auto">
                    <a href="" class="mr-4" @click.prevent="toggleSidebar('people')">People <span
                            class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full"
                            v-text="people.length"></span></a>

                    <a href="" class="" @click.prevent="toggleSidebar('comments')">Comments <span
                            class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full"
                    ></span></a>
                </div>
            </div>

            <!-- Image -->
            <div class="flex flex-1 items-center justify-center">
                <div class="relative">
                    <img src="/img/sample.png" alt="Sample">

                    <portal-target name="dots" slim></portal-target>
                </div>
            </div>
        </div>

        <sidebar :open="sidebar">
            <comments v-show="sidebar === 'comments'" @show="showSidebar('comments')"></comments>

            <people v-show="sidebar === 'people'" :data="people" @add="addPerson"></people>
        </sidebar>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: null,

        people: [
          {
            'email': 'john@example.com',
          },
          {
            'email': 'jane@example.com',
          }
        ]
      }
    },
    methods: {
      addPerson (email) {
        if (email.trim() === '') {
          return
        }

        this.people.push({email})
      },

      toggleSidebar (name) {
        if (this.sidebar === name) {
          return this.sidebar = null
        }

        this.sidebar = name
      },

      showSidebar (name) {
        this.sidebar = name
      }
    }
  }
</script>