<template>
    <div class="dot bg-red-700 absolute rounded-full cursor-pointer"
         :class="{'glow' : glow}"
         style="margin-left: -0.5rem; margin-top: -0.5rem"
         :style="{top: y + '%', left: x + '%'}"
    >
        <a :href="'#' + id" class="p-2 block"></a>
    </div>
</template>

<script>
    export default {
        props: ['x', 'y', 'id'],
        data () {
            return {
                glow: true
            }
        },
        created () {
            setInterval(function () {
                this.glow = !this.glow

            }.bind(this), 2000)
        }
    }
</script>

<style>
    .dot{
        transition: border 1s linear, box-shadow 1s linear;
        box-shadow: none;
    }

    .dot.glow{
        box-shadow: 0 0 10px 3px #C53030;
        transition: border 1s linear, box-shadow 1s linear;
    }

    .dot.glow.glow-teal{
        box-shadow: 0 0 10px 3px #4fd1c5;
    }

    .dot.glow.glow-blue{
        box-shadow: 0 0 10px 3px #2b6cb0;
    }
</style>
