<template>
    <div class="dot p-2 bg-red-700 absolute rounded-full z-10 cursor-pointer"
         :style="{top: y + 'px', left: x + 'px'}"
    ></div>
</template>

<script>
  export default {
    props: ['x', 'y']
  }
</script>