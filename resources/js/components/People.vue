<template>
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <person v-for="(person, index) in data"
                    :email="person.email"
                    :key="index"
                    @click="remove(person)"
            ></person>
        </div>

        <div class="border-t flex flex-col" :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                   v-model="newEmail" ref="input">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Add
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
        newEmail: '',
        focused: false,
      }
    },
    methods: {
      add(){
        this.$emit('add', this.newEmail);

        this.newEmail = '';
      },
      remove(person){
        this.$emit('remove', person)
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