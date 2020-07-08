<template>
    <div class="bg-white border-b m-2 px-4 py-3 rounded flex items-center shadow" :class="{ 'hidden' : revoked }">
        <div v-text="email"></div>

        <a v-if="$attrs.authUser.email === email"
           href="/users/edit" title="Edit your profile" class="ml-auto text-blue-500">
            <i data-feather="edit" class="w-5"></i>
        </a>

        <button v-if="upload.owner_id === $attrs.authUser.id"
                onclick="confirm('Are you sure you want to revoke the access of this user to this visual?')"
                class="small ml-auto text-red-300 hover:text-red-500"
                title="Revoke Access"
                @click="revoke"
        >
            Revoke
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            data: {default: () => {return []}},
            email: {},
            inviteeId: '',
        },
        data () {
            return {
                upload: {},
                revoked: false
            }
        },
        methods: {
            revoke () {
                axios.post('/invitees/' + this.inviteeId, {_method: 'DELETE'})
                .then(response => {
                    this.revoked = true;
                })
            }
        },
        created () {
            this.upload = this.data
        }
    }
</script>
