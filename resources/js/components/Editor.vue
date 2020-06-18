<template>
    <div class="flex flex-1 overflow-hidden editor">
        <!-- Content -->
        <div class="px-8 py-4 flex-grow flex  flex flex-col">
            <!-- Header -->
            <div class="flex">
                <div class="text-blue-900 flex">
                    <div data-feather="file" class="mr-3"></div>
                    <input type="text"
                           class="bg-transparent outline-none border-b border-dashed"
                           v-model="upload.name"
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
                    <img :src="upload.url" :alt="upload.name">

                    <portal-target name="dots" slim></portal-target>
                </div>
            </div>
        </div>


        <sidebar :open="sidebar">
            <transition name="slide-fade">
                <comments :data="upload.comments" :upload="upload" :authUser="authUser" v-show="sidebar === 'comments'" @show="showSidebar('comments')"></comments>
            </transition>

            <transition name="slide-fade">
                <people :upload="upload" :authUser="authUser" v-show="sidebar === 'people'"></people>
            </transition>
        </sidebar>
    </div>
</template>

<style>
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }
</style>

<script>
    export default {
        props: {
            data: {},
            auth_user:{},
        },
        data () {
            return {
                title: 'Zoo Inc - Poster Design',
                sidebar: null,
                upload: {},
                show: true,
                authUser:'',
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
        },
        created () {
            this.upload = this.data

            this.authUser = this.auth_user
        }
    }
</script>
