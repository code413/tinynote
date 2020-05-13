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
                            class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full" v-text="people.length"></span></a>

                    <a href="" class="" @click.prevent="toggleSidebar('comments')">Comments <span
                            class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full"
                            v-text="comments.length"></span></a>
                </div>
            </div>

            <!-- Image -->
            <div class="flex flex-1 items-center justify-center">
                <div class="relative" @click="addDot">
                    <img src="/img/sample.png" alt="Sample">

                    <dot @click.native.stop="showSidebar('comments')" v-for="(comment, index) in comments"
                         v-if="comment.x && comment.y"
                         :class="{'bg-teal-400': comment.active}"
                         :y="comment.y"
                         :x="comment.x"
                         :key="index"
                         @mouseenter.native="comment.active = true"
                         @mouseleave.native="comment.active = false"
                    ></dot>

                    <dot @click.native.stop="removeDot"
                         v-if="newDot"
                         :y="newDot.y"
                         :x="newDot.x"
                         :class="['bg-blue-700']"
                    ></dot>
                </div>
            </div>
        </div>

        <sidebar :open="sidebar">
            <comments v-if="sidebar === 'comments'" :data="comments" :focus="newDot" @add="addComment"
                      ref="comments"></comments>

            <people v-if="sidebar === 'people'" :data="people" @add="addPerson"></people>
        </sidebar>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: null,
        newComment: '',
        newDot: null,
        comments: [
          {
            id: 1,
            author: 'john@example.com',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore molestiae quae quia quo, repellat.',
            x: 100,
            y: 300,
            active: false
          },
          {
            id: 2,
            author: 'jane@xyz.co',
            content: 'Lorem ipsum dolor sit amet.',
            active: false
          },
          {
            id: 3,
            author: 'john@example.com',
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/> <br/>Lorem ipsum dolor sit.',
            x: 400,
            y: 200,
            active: false
          }
        ],
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
      addComment (content) {
        if (content.trim() === '') {
          return
        }

        let comment = {
          id: Date.now(),
          content: content,
          author: 'john@example.com',
          active: false
        }

        if (this.newDot) {
          comment.x = this.newDot.x
          comment.y = this.newDot.y
        }

        this.comments.push(comment)

        this.newDot = null
      },

      addPerson (email) {
        if (email.trim() === '') {
          return;
        }

        this.people.push({email})
      },

      addDot (event) {
        this.newDot = {x: event.offsetX, y: event.offsetY}

        this.showPeople = true

        this.$refs['comments'].focus()
      },

      removeDot (event) {
        this.newDot = null
        this.$refs['comments'].blur()
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

<style>
    .dot:after {
        content: " ";
        position: absolute;
        top: -0.4rem;
        left: -0.4rem;
        width: calc(100% + 0.8rem);
        height: calc(100% + 0.8rem);
        background: rgba(250, 0, 0, 0.2);
        border-radius: 50%;
    }
</style>