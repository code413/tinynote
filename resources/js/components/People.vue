<template>
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <person v-for="(person, index) in data"
                    :email="person.email"
                    :key="index"
            ></person>
        </div>

        <div class="border-t flex flex-col" :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                   v-model="newEmail" ref="input">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Add
            </div>
        </div>

        <portal to="people-count">{{ data.length }}</portal>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            'email': 'john@example.com',
          },
          {
            'email': 'jane@example.com',
          }
        ],
        newEmail: '',
        focused: false,
      }
    },
    methods: {
      add () {
        if (this.newEmail.trim() === '') {
          return
        }

        this.data.push({email: this.newEmail})

        this.newEmail = ''
      }
    }
  }
</script>