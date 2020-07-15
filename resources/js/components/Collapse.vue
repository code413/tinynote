<template>
    <div class="bg-white mb-2">
        <div class="p-5 flex cursor-pointer items-center hover:bg-blue-200" :class="{ 'bg-blue-200 hover:bg-blue-400' : open }" @click="open = !open">
            <slot name="header"></slot>

            <div v-show="!open" class="ml-auto">
                <i data-feather="chevron-right"></i>
            </div>

            <div v-show="open" class="ml-auto">
                <i data-feather="chevron-down"></i>
            </div>
        </div>

        <div v-show="open" class="p-5 border-t text-xl">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                open: false
            }
        },
    }
</script>
