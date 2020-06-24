<template>
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <comment
                v-for="(comment, index) in comments"
                :content="comment.body"
                :author="comment.user.name"
                :isAuthor="$attrs.authUser.id == comment.user.id"
                :time="comment.created_at"
                :key="comment.id"
                :class="{'bg-teal-100': comment.active}"
                @mouseenter.native="comment.active = true"
                @mouseleave.native="comment.active = false"
            ></comment>
        </div>

        <div class="border-t flex flex-col" :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Leave a comment..."
                   v-model="newComment" ref="input" autofocus @keyup.enter="add">

            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Send
            </div>
        </div>

        <portal to="dots">
            <div @click="addDot" class="absolute w-full h-full top-0 left-0 z-10">
                <dot @click.native.stop="$emit('show')" v-for="(comment, index) in comments"
                     v-if="comment.coordinate_x && comment.coordinate_y"
                     :class="{'bg-teal-400': comment.active}"
                     :y="comment.coordinate_y"
                     :x="comment.coordinate_x"
                     :key="index"
                     @mouseenter.native="comment.active = true"
                     @mouseleave.native="comment.active = false"
                ></dot>

                <dot @click.native.stop="removeDot"
                     v-if="newDot"
                     :y="newDot.coordinate_y"
                     :x="newDot.coordinate_x"
                     :class="['bg-blue-700']"
                ></dot>
            </div>
        </portal>

        <portal to="comments-count">{{ comments.length }}</portal>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            data: {default: () => { return [] }}
        },
        data () {
            return {
                comments: [],
                newComment: '',
                newDot: null,
                focused: false,
            }
        },
        methods: {
            add () {
                if (this.newComment.trim() === '') {
                    return
                }

                let comment = {
                    id: Date.now(),
                    body: this.newComment,
                    user: this.$attrs.authUser,
                    created_at: this.now(),
                    active: false
                }

                let requestData = {coordinateX: null, coordinateY: null, body: this.newComment}

                if (this.newDot) {
                    comment.coordinate_x = this.newDot.coordinate_x
                    comment.coordinate_y = this.newDot.coordinate_y

                    requestData = {coordinateX: this.newDot.coordinate_x, coordinateY: this.newDot.coordinate_y, body: this.newComment}
                }

                this.comments.push(comment)

                this.newDot = null

                this.newComment = ''

                axios.post('/uploads/' + this.$attrs.upload.uuid + '/comments', requestData)
                    .then(function (response) {})
                    .catch(function (error) {})

            },

            addDot (event) {
                this.newDot = {
                    coordinate_x: (event.offsetX / document.querySelector('img').width) * 100,
                    coordinate_y: (event.offsetY / document.querySelector('img').height) * 100
                }

                this.$emit('show')

                this.focused = true

                this.$nextTick(() => {
                    setTimeout(() => this.$refs['input'].focus(), 500)
                })
            },

            removeDot () {
                this.newDot = null
                this.focused = false
            },
            now () {
                return moment().format();
            }
        },
        created () {
            this.comments = this.data
        }
    }
</script>
