<template xmlns="http://www.w3.org/1999/html">
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <person v-for="(person, index) in invitees"
                    :email="person.email"
                    :key="index"
            ></person>
        </div>

        <div v-if="$attrs.authUser">
            <div v-if="invitationInitiated" class="border-t flex flex-col" :class="{'border-blue-500': focused}">
                <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                       v-model="newEmail" ref="input">
                <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                     @click="add">Add
                </div>
            </div>

            <div v-else class="border-t flex flex-col">
                <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                     @click="initiateInvitation">Start inviting people
                </div>
            </div>
        </div>

        <div v-else class="border-t flex flex-col">
            <input disabled type="text" class="p-4 w-full outline-none" placeholder="Login to invite people for review...">
            <a href="/login" class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer">Login</a>
        </div>

        <portal to="people-count">{{ invitees.length }}</portal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                invitees: [
                    /*{
                      'email': 'john@example.com',
                    },
                    {
                      'email': 'jane@example.com',
                    }*/
                ],
                newEmail: '',
                focused: false,
                invitationInitiated: false
            }
        },
        methods: {
            add () {
                if (this.newEmail.trim() === '') {
                    return
                }

                this.invitees.push({email: this.newEmail})

                this.newEmail = ''
            },
            initiateInvitation () {
                axios.post('/uploads/' + this.$attrs.upload.uuid, {_method: 'put'})
                    .then(function (response) {})
                    .catch(function (error) {window.location.href = '/login'})

                this.invitationInitiated = true;
            }
        }
    }
</script>
