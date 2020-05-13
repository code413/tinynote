<template>
    <div class="sidebar bg-white shadow-sm flex flex-col" style="width:20rem" :class="{open: open}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
      props: {
        open: { default: false }
      }
    }
</script>

<style>
    .sidebar{
        margin-right:-20rem;
    }

    .sidebar.open{
        margin-right:0;
    }
</style>