<template>
    <div class="topbar">
        <a href="/" title="Home" class="mr-4 flex">
            <i data-feather="home"></i>
        </a>

        <a href="" class="mr-4 flex" @click.prevent="toggleSidebar('people')">
            <div v-if="upload.invitees.length" class="flex">
                <i data-feather="users"></i> <span class="mx-1">People</span>
            </div>

            <div v-else class="flex">
                <i data-feather="share"></i> <span class="mx-1">Share</span>
            </div>

            <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                 <portal-target name="people-count"></portal-target>
            </span>
        </a>

        <a href="" class="mr-4 flex" @click.prevent="toggleSidebar('comments')">
            <div class="flex">
                <i data-feather="message-square"></i> <span class="mx-1">Comments</span>
            </div>

            <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">
                  <portal-target name="comments-count"></portal-target>
            </span>
        </a>

        <a href="" @click.prevent="toggleSidebar('links')">
            <i data-feather="menu"></i>
        </a>
    </div>
</template>

<script>
    export default {
        props: {
            data: { default: () => { return []} }
        },
        data () {
            return {
                upload : {}
            }
        },
        methods: {
            toggleSidebar (name) {
                this.$parent.toggleSidebar(name)
            }
        },
        created () {
            this.upload = this.data
        }
    }
</script>

<style>
    .topbar a{
        box-shadow: none;
        transition: 0.2s;
    }

    .topbar a:hover{
        border-radius: 1rem;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
        transition: 0.3s;
    }
</style>
