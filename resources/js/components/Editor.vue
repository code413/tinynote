<template>
    <div class="flex flex-1 overflow-hidden">
        <!-- Content -->
        <div class="px-8 py-4 flex-grow flex  flex flex-col">
            <!-- Header -->
            <div class="flex">
                <div class="text-blue-900 flex">
                    <div data-feather="file" class="mr-3"></div>
                    <input type="text"
                           class="bg-transparent outline-none border-b border-dashed"
                           v-model="title"
                           v-autowidth="{maxWidth: '400px', minWidth: '10px'}" placeholder="Document Title">
                </div>
                <div class="ml-auto">
                    <a href="" class="mr-4" @click.prevent="toggleSidebar('people')">People
                        <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="people-count" slim></portal-target>
                        </span>
                    </a>

                    <a href="" class="" @click.prevent="toggleSidebar('comments')">Comments
                        <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="comments-count" slim></portal-target>
                        </span>
                    </a>
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

            <people v-show="sidebar === 'people'"></people>
        </sidebar>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Zoo Inc - Poster Design',
        sidebar: null,
      }
    },
    methods: {
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