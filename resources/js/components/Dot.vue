<template>
    <div class="dot p-2 bg-red-700 absolute rounded-full cursor-pointer"
         :style="{top: y + '%', left: x + '%'}"
    ></div>
</template>

<script>
  export default {
    props: ['x', 'y']
  }
</script>

<style>
    .dot:after {
        content: " ";
        position: absolute;
        top: -0.4rem;
        left: -0.4rem;
        width: calc(100% + 0.8rem);
        height: calc(100% + 0.8rem);
        background: rgba(250, 0, 0, 0.2);
        border-radius: 50%;
    }
</style>
