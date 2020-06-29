<template>
    <div class="p-4 border-b flex items-center">
        <div v-text="email"></div>

        <a v-if="$attrs.authUser.email === email"
           href="/users/edit" title="Edit your profile">
            <i data-feather="edit" class="ml-3"></i></a>
    </div>
</template>

<script>
    export default {
      props: {email: {}}
    }
</script>
