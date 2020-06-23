<template>
    <div class="p-4 rounded-large flex flex-col mb-2 bg-gray-200 rounded-bl-none" :class="{ 'bg-green-200 rounded-br-none rounded-bl-large' : isAuthor}">
        <div v-html="content"></div>

        <div class="mt-4 flex">
            <small class="text-gray-500" v-text="moment(time)"></small>

            <small class="text-blue-500 ml-auto" v-text="author"></small>
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
