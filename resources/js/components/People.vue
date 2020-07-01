<template xmlns="http://www.w3.org/1999/html">
    <div class="flex-1 flex flex-col">
        <div class="flex-1">
            <div v-if="upload.owner.email == null" class="p-4 border-b">
                <div class="flex items-center">
                    <div class="flex items-center" v-if="upload.owner.id === $attrs.authUser.id">You
                        <a v-if="upload.owner_id === $attrs.authUser.id" href="/users/edit">
                            <tooltip
                                    title="<i data-feather='unlock' class='w-5 text-orange-500'></i>"
                                    content="<strong class='mb-2 block'>You're currently not logged in.</strong> Create a FREE account so that you can save your uploads permanently and access them on all your devices."
                            ></tooltip>
                        </a>
                    </div>

                    <div v-else v-text="upload.owner.name"></div>
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

        <div v-if="$attrs.authUser.id === upload.owner.id" class="border-t flex flex-col"
             :class="{'border-blue-500': focused}">
            <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                   v-model="newEmail" ref="input" @keyup.enter="add">

            <span v-if="notes.get('email')" class="bg-red-200 p-2" v-text="notes.get('email')"></span>

            <span v-if="notes.get('message')" class="bg-green-200 p-2" v-text="notes.get('message')"></span>

            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Add
            </div>
        </div>

        <portal to="people-count">{{ invitees.length + 1 }}</portal>
    </div>
</template>

<script>
    import LeftPinkTooltip from './Tooltip'

    class Notes {
        constructor () {
            this.notes = {}
        }

        get (field) {
            if (this.notes[field]) {
                return this.notes[field][0]
            }
        }

        record (notes) {
            this.notes = notes
        }
    }

    export default {
        components: {LeftPinkTooltip},
        props: {
            data: {default: () => { return [] }},
            upload: {}
        },
        data () {
            return {
                invitees: [],
                newEmail: '',
                focused: false,
                notes: new Notes()
            }
        },
        methods: {
            add () {
                this.notes = new Notes()

                if (this.newEmail.trim() === '') {
                    return
                }

                axios.post('/invitees/' + this.upload.uuid, {email: this.newEmail})
                    .then(response => {
                        this.notes.record(response.data)

                        this.invitees.push({
                            user: {
                                email: this.newEmail
                            }
                        })

                        this.newEmail = ''
                    })
                    .catch(error => {
                        this.notes.record(error.response.data.errors)

                        this.newEmail = ''
                    })
            },
        },
        created () {
            this.invitees = this.data
        }
    }
</script>
