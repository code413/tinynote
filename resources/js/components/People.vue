<template xmlns="http://www.w3.org/1999/html">
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <div v-if="upload.owner.email == null" class="p-4 border-b">
                <div>Owner <small>(Not registered yet)</small>
                    <a v-if="upload.owner_id === $attrs.authUser.id"
                       class="bg-gray-800 text-white rounded cursor-pointer text-sm p-1 my-2" href="/users/edit">
                        Save</a>
                </div>
            </div>

            <div v-else class="p-4 border-b">
                <div v-text="upload.owner.email"></div>
            </div>

            <person v-for="(invitee, index) in invitees"
                    :email="invitee.user.email"
                    :key="index"
                    :authUser="$attrs.authUser"
            ></person>
        </div>

        <div class="border-t flex flex-col" :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                   v-model="newEmail" ref="input">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Add
            </div>
        </div>

        <portal to="people-count">{{ invitees.length + 1 }}</portal>
    </div>
</template>

<script>
    export default {
        props: {
            data: {default: () => { return [] }},
            upload: {}
        },
        data () {
            return {
                invitees: [],
                newEmail: '',
                focused: false,
            }
        },
        methods: {
            add () {
                if (this.newEmail.trim() === '') {
                    return
                }

                this.invitees.push({
                    user:{
                        email: this.newEmail
                    }
                })

                axios.post('/invitees/' + this.upload.uuid, {email: this.newEmail})
                    .then(function (response) {})
                    .catch(function (error) {console.log(error)})

                this.newEmail = ''
            },
        },
        created () {
            this.invitees = this.data
        }
    }
</script>
