<template>
    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                  @vdropzone-max-files-exceeded="maxfilesexceeded"
                  @vdropzone-success="success"
                  @vdropzone-error="error"
                  :use-custom-slot="true"
                  class="w-full h-full shadow-inner"
    >
        <div class="text-center">
            <i data-feather="image" class="text-indigo-600 mx-auto" style="width:48px; height:48px;"
               stroke-width="1"></i>
            <div class="text-indigo-600 text-2xl">Drop or upload your visual here.</div>
            <div class="text-indigo-400 text-sm">Any .png / .jpg / .gif files. Up to 20 MB</div>
        </div>

    </vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  export default {
    name: 'app',
    components: {
      vueDropzone: vue2Dropzone
    },
    data () {
      return {
        dropzoneOptions: {
          url: '/uploads',
          headers: {
            'X-CSRF-Token': document.head.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          thumbnailWidth: 150,
          maxFiles: 1,
          maxFilesize:20,
          dictDefaultMessage: 'Drop or upload your visual here',
          paramName: 'image',
          addRemoveLinks: true,
        }
      }
    },
    methods: {
      maxfilesexceeded (file) {
        this.$refs.myVueDropzone.removeAllFiles()

        this.$refs.myVueDropzone.addFile(file)
      },
      success (file, response) {
        window.location.href = 'uploads/' + response
      },
      error (file, response) {
        if (response.errors !== undefined) {
          document.querySelector('.dz-error-message').style.opacity = 1
          document.querySelector('.dz-error-message span').innerHTML = response.errors['image'][0]
        }
      }
    }
  }
</script>

<style>
    .dropzone {
        border: #3343c3 dashed 2px !important;
        min-height: 12rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 1rem;
        background: #f4f8ff !important;
    }

    .vue-dropzone:hover{
        background: white !important
    }

    .dropzone .dz-error-message {
        pointer-events: none;
        z-index: 1000;
        transition: opacity 0.3s ease;
        border-radius: 8px;
        font-size: 13px;
        width: 15rem;
        background: #be2626;
        background: linear-gradient(to bottom, #be2626, #a92222);
        margin: 2rem 0;
        padding: 0.5em 1.2em;
        color: white;
        text-align: center;
    }

    .vue-dropzone>.dz-preview .dz-remove{
        bottom: 3rem !important;
    }

    .dropzone .dz-preview .dz-image img{
        margin: auto;
    }

    .dropzone .dz-preview.dz-image-preview{
        background: transparent !important;
    }

</style>
