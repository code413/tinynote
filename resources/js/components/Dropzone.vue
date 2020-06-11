<template>
    <div>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                      @vdropzone-max-files-exceeded="maxfilesexceeded"
                      @vdropzone-success="success"
                      @vdropzone-error="error"
                      ></vue-dropzone>
    </div>
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
                if(response.errors !== undefined)
                {
                    document.querySelector('.dz-error-message').style.opacity = 1;
                    document.querySelector('.dz-error-message span').innerHTML = response.errors['image'][0];
                }
            }
        }
    }
</script>
