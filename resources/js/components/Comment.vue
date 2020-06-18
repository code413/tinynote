<template>
    <div class="bg-gray-200 p-4 rounded-lg flex flex-col mb-2">
        <div v-html="content"></div>

        <div class="mt-4 flex">
            <small class="text-gray-500">
                4 mins ago
            </small>
            <small class="text-blue-500 ml-auto" v-text="author"></small>
        </div>
    </div>
</template>

<script>
    export default {
      props: {
        content: { default: '' },
        author: {default: ''}
      }
    }
</script>
