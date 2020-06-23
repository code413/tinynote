<template>
    <div class="p-4 border-b flex items-center">
        <div v-text="email"></div>

        <a v-if="$attrs.authUser.email === email"
           class="bg-gray-800 text-white rounded cursor-pointer text-sm p-1 m-2" href="/users/edit">
            Edit Profile</a>
    </div>
</template>

<script>
    export default {
      props: {email: {}}
    }
</script>
