<template>
    <div class="flex flex-col md:flex-row flex-1 overflow-x-hidden editor">
        <!-- Content -->
        <div class="px-8 py-4 flex-grow block flex-col md:overflow-auto block md:flex">
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

                    <div v-else v-text="upload.name"></div>
                </div>

                <topbar :data="upload" class="md:ml-auto mt-4 md:mt-0 hidden md:flex"></topbar>
            </div>

            <!-- Image -->
            <div class="flex flex-1 items-center justify-center">
                <div class="relative">
                    <img :src="upload.url" :alt="upload.name" style="width: 100%; height: 100%; display: block">

                    <portal-target name="dots" slim></portal-target>
                </div>
            </div>
        </div>


        <topbar :data="upload" class="px-8 pt-4 pb-12 mt-4 flex md:hidden justify-around items-center"></topbar>

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
    import Topbar from './Topbar'

    let router = new VueRouter({
        mode: 'history',
        routes: []
    });

    export default {
        components: {Topbar},
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
