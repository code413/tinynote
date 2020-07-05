<template>
    <div class="flex flex-col md:flex-row flex-1 overflow-x-hidden editor">
        <!-- Content -->
        <div class="px-8 py-4 flex-grow flex flex-col md:overflow-auto">
            <!-- Header -->
            <div class="md:flex mb-10 flex-wrap">
                <div class="text-blue-900 flex">
                    <div data-feather="file" class="mr-3"></div>
                    <input type="text"
                           class="bg-transparent outline-none border-b border-dashed"
                           v-model="title"
                           v-if="auth_user.id === upload.owner_id"
                           @blur="titleUpdate()"
                           v-autowidth="{maxWidth: '400px', minWidth: '10px'}" placeholder="Document Title">

                    <p v-else v-text="upload.name"></p>
                </div>

                <div class="md:ml-auto mt-4 md:mt-0 hidden md:flex">
                    <a href="" class="mr-4" @click.prevent="toggleSidebar('people')">
                        People
                        <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="people-count"></portal-target>
                        </span>
                    </a>

                    <a href="" class="mr-4" @click.prevent="toggleSidebar('comments')">
                        Comments
                        <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="comments-count"></portal-target>
                        </span>
                    </a>

                    <a href="" @click.prevent="toggleSidebar('links')">
                        <i data-feather="menu"></i>
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


        <div class="px-8 py-4 md:ml-auto mt-4 md:mt-0 flex md:hidden justify-around">
            <a href="" class="mr-4" @click.prevent="toggleSidebar('people')">
                People
                <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="people-count"></portal-target>
                        </span>
            </a>

            <a href="" class="mr-4" @click.prevent="toggleSidebar('comments')">
                Comments
                <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                            <portal-target name="comments-count" ></portal-target>
                        </span>
            </a>

            <a href="" @click.prevent="toggleSidebar('links')">
                <i data-feather="menu"></i>
            </a>
        </div>

        <sidebar :open="sidebar">
            <transition name="slide-fade">
                <comments :data="upload.comments" :upload="upload" :authUser="authUser" v-show="sidebar === 'comments'"
                          @show="showSidebar('comments')"></comments>
            </transition>

            <transition name="slide-fade">
                <people :data="upload.invitees" :upload="upload" :authUser="authUser"
                        v-show="sidebar === 'people'"></people>
            </transition>

            <transition name="slide-fade">
                <links v-show="sidebar === 'links'"></links>
            </transition>
        </sidebar>
    </div>
</template>

<script>
    import VueRouter from 'vue-router'

    let router = new VueRouter({
        mode: 'history',
        routes: []
    });

    export default {
        router,
        props: {
            data: {},
            auth_user: {},
        },
        data () {
            return {
                title: '',
                sidebar: null,
                upload: {},
                show: true,
                authUser: '',
                initialSidebar: null
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
            },
            titleUpdate () {
                axios.post('/uploads/' + this.upload.uuid, {name: this.title, _method: 'put'})
                    .then(function (response) {})
                    .catch(function (error) {})
            }
        },
        created () {
            this.upload = this.data

            this.authUser = this.auth_user

            this.title = this.upload.name

            if(this.$route.query.with) {
                this.sidebar = this.$route.query.with;
            }
        }
    }
</script>

<style>
    .slide-fade-enter-active {
        transition: all .3s ease;
        opacity: 1;
    }

    .slide-fade-enter, .slide-fade-leave-active {
        opacity: 0.5;
    }
</style>
