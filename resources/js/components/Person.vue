<template>
    <div class="p-4 border-b">
        <div v-text="email"></div>
    </div>
</template>

<script>
    export default {
      props: {email: {}}
    }
</script>