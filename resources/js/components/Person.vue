<template>
    <div class="bg-white border-b m-2 px-4 py-3 rounded flex items-center shadow">
        <div v-text="email"></div>

        <a v-if="$attrs.authUser.email === email"
           href="/users/edit" title="Edit your profile" class="ml-auto text-blue-500">
            <i data-feather="edit" class="w-5"></i></a>
    </div>
</template>

<script>
    export default {
      props: {email: {}}
    }
</script>
