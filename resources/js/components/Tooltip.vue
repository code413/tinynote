<template>
    <div class="flex flex-wrap">
        <div class="w-full text-center">
            <div ref="titleRef" v-on:mouseenter="toggleTooltip()" v-on:mouseleave="toggleTooltip()" v-html="title"
                 class="text-sm">
            </div>

            <div ref="tooltipRef" v-bind:class="{'hidden': !tooltipShow, 'block': tooltipShow}" style="max-width: 16rem"
                 class="bg-orange-200 text-orange-900 border-0 mt-16 md:mt-1 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
                    <div class="p-4" v-html="content"></div>
            </div>
        </div>
    </div>
</template>

<script>

    import Popper from 'popper.js'

    export default {
        name: 'tooltip',
        props: {
            title: {default: ''},
            content: {default: ''},
        },
        data () {
            return {
                tooltipShow: false
            }
        },
        methods: {
            toggleTooltip: function () {
                if (this.tooltipShow) {
                    this.tooltipShow = false
                } else {
                    this.tooltipShow = true
                    new Popper(this.$refs.titleRef, this.$refs.tooltipRef, {
                        placement: 'bottom'
                    })
                }
            }
        }
    }
</script>
