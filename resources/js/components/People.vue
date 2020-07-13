<template xmlns="http://www.w3.org/1999/html">
    <div class="flex-1 flex flex-col">
        <div class="flex-1" style="background:#ece9e6;">
            <div v-if="upload.owner.email == null" class="bg-white border-b m-2 px-4 py-3 rounded shadow">
                <div class="flex items-center">
                    <div class="flex items-center flex-1" v-if="upload.owner.id === $attrs.authUser.id">You
                        <a v-if="upload.owner_id === $attrs.authUser.id" href="/users/edit" class="ml-auto">
                            <tooltip
                                title="<i data-feather='unlock' class='w-5 text-orange-500'></i>"
                                content="<strong class='mb-2 block'>You're account has no emails.</strong> Link your account with your email so that you can save your uploads permanently and access them on all your devices."
                            ></tooltip>
                        </a>
                    </div>

                    <div v-else v-text="upload.owner.name"></div>
                </div>
            </div>

            <person v-else :email="upload.owner.email"
                    :authUser="$attrs.authUser"
            ></person>

            <person v-for="(invitee, index) in invitees"
                    :inviteeId="invitee.id"
                    :email="invitee.user.email"
                    :key="index"
                    :authUser="$attrs.authUser"
                    :data="upload"
            ></person>
        </div>

        <div v-if="$attrs.authUser.id === upload.owner.id" class="border-t flex flex-col add-section relative"
             :class="{'border-blue-500': focused, loading: loading }">
            <input type="text" class="p-4 w-full outline-none" placeholder="Enter an email..."
                   v-model="newEmail" ref="input" @keyup.enter="add">

            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer"
                 @click="add">Add
            </div>
        </div>

        <portal to="people-count">{{ invitees.length + 1 }}</portal>
    </div>
</template>

<script>
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
        props: {
            data: {default: () => { return [] }},
            upload: {}
        },
        data () {
            return {
                invitees: [],
                newEmail: '',
                focused: false,
                notes: new Notes(),
                loading: false
            }
        },
        methods: {
            add () {
                this.notes = new Notes()

                if (this.newEmail.trim() === '') {
                    return
                }

                this.loading = true

                axios.post('/invitees/' + this.upload.uuid, {email: this.newEmail})
                    .then(response => {
                        this.notes.record(response.data)

                        this.invitees.push({
                            user: {
                                email: this.newEmail,
                            },
                            id: response.data.inviteeId,
                        })

                        if(this.notes.get('message')){
                            this.notification(this.notes.get('message') ,'success')
                        }

                        this.newEmail = ''

                        this.loading = false
                    })
                    .catch(error => {
                        this.notes.record(error.response.data.errors)
                        
                        if(this.notes.get('email')){
                            this.notification(this.notes.get('email') ,'error')
                        }

                        if(this.notes.get('duplication')){
                            this.notification(this.notes.get('duplication') ,'error')
                        }

                        this.newEmail = ''

                        this.loading = false
                    })
            },
            notification (text, type) {
                new Noty({
                    text: text,
                    type: type,
                    timeout: 3000,
                    progressBar: true,
                    theme : 'bootstrap-v4',
                    layout: 'bottomRight',
                }).show()
            }
        },
        created () {
            this.invitees = this.data
        },
    }
</script>

<style>
    .add-section.loading:before {
        width: 100%;
        content: "";
        background-image: url(/img/curve-loading.gif);
        height: 100%;
        z-index: 999999;
        display: block;
        background-color: white;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        background-size: contain;
    }
</style>
