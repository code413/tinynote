<template>
    <div class="sidebar shadow-sm flex flex-col md:overflow-auto shadow-lg" :class="{'open bg-white': open }">
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

    .sidebar{
        width:20rem;
        min-width:20rem
    }

    @media only screen and (max-width:767px) {
        .sidebar{
            width:100%;
            min-width:100%
        }
    }
</style>
