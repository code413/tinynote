<template>
    <div class="comment p-4 rounded-large flex flex-col mb-2 bg-white rounded-br-none shadow"
         :class="{
            'bg-blue-100 rounded-bl-none rounded-br-large mr-2': isAuthor,
            'ml-2': !isAuthor
         }">
        <div v-html="content"></div>

        <div class="mt-4 flex">
            <small class="text-gray-500" v-text="moment(time)"></small>

            <small v-if="isAuthor" class="text-blue-500 ml-auto">You</small>

            <small v-else class="text-blue-500 ml-auto" v-text="author"></small>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            content: {default: ''},
            author: {default: ''},
            time: {default: ''},
            isAuthor: ''
        },
        data() {
          return{

          }
        },
        methods: {
            moment (time) {
                return moment(time).fromNow()
            }
        },
    }
</script>

<style>
    .comment{
        overflow-wrap: break-word;
    }
</style>
