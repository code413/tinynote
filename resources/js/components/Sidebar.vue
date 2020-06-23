<template>
    <div class="sidebar bg-white shadow-sm flex flex-col overflow-auto" :class="{open: open}">
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
        transition: 0.3s;
    }

    .sidebar.open{
        margin-right:0;
    }
</style>
