<template xmlns="http://www.w3.org/1999/html">
    <div class="flex-1 flex flex-col">
        <div class="flex-1 p-4">
            <person v-for="(invitee, index) in invitees"
                    :email="invitee.user.email"
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

<!--        <div v-else class="border-t flex flex-col">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="initiateInvitation">Start inviting people
            </div>
        </div>-->

        <portal to="people-count">{{ invitees.length }}</portal>
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
                // invitationInitiated: ''
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
/*            initiateInvitation () {
                axios.post('/uploads/' + this.upload.uuid, {_method: 'put'})
                    .then(function (response) {})
                    .catch(function (error) {window.location.href = '/login'})

                this.invitationInitiated = true
            }*/
        },
/*        mounted () {
            this.$nextTick(function () {
                this.invitationInitiated = this.upload.owner_id
            })
        },*/
        created () {
            this.invitees = this.data
        }
    }
</script>
