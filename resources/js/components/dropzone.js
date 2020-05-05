import $ from 'cash-dom'

$(function () {
    let options = {
        maxFiles: 1,
        dictDefaultMessage: 'Drop or upload your visual here',
        paramName: "image",
        previewTemplate:'<div class="dz-preview dz-file-preview">\n' +
            '                    <div class="dz-details">\n' +
            '                        <img class="m-auto" data-dz-thumbnail />\n' +
            '                    </div>\n' +
            '                    <div class="dz-error-message hidden"><span data-dz-errormessage></span></div>\n' +
            '                </div>',
        init () {
            this.on('maxfilesexceeded', function (file) {
                this.removeAllFiles();

                this.addFile(file);
            })

            this.on('success', function (file, response) {
                window.location.href = 'uploads/' + response
            })

            this.on('error', function (file, response) {
                if(response.errors !== undefined)
                {
                    $('.dropzone .dz-preview .dz-error-message').addClass('block').removeClass('hidden');
                    $('.dropzone .dz-preview .dz-error-message span').text(response.errors['image'][0]);
                }
            })
        },
    }

    if ($('.dropzone').length > 0) {
        new Dropzone('.dropzone', options)
    }
})
