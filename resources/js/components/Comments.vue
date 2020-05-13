<template>
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <comment
                    v-for="(comment, index) in data"
                    :content="comment.content"
                    :author="comment.author"
                    :key="comment.id"
                    :class="{'bg-teal-100': comment.active}"
                    @mouseenter.native="comment.active = true"
                    @mouseleave.native="comment.active = false"
            ></comment>
        </div>

        <div class="border-t flex flex-col" :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Leave a comment..."
                   v-model="newComment" ref="input">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Send
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      data: {default: []},
    },
    data () {
      return {
        newComment: '',
        focused: false,
      }
    },
    methods: {
      add(){
        this.$emit('add', this.newComment);

        this.newComment = '';
      },
      focus(){
        this.focused = true
        this.$refs['input'].focus();
      },
      blur(){
        this.focused = false
      }
    }
  }
</script>