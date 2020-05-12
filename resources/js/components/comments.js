import $ from 'cash-dom'

$(function () {
    let $image = $('#imageCanvas')
    let $uploadId = $image.data('upload-id');

    //Create point and comment
    $image.on('click', function (event) {
        let height = $(this).height()
        let width = $(this).width()

        let positionX = event.offsetX
        let positionY = event.offsetY

        let coordinateX = positionX / width
        let coordinateY = positionY / height

        let position = {coordinateX: coordinateX, coordinateY: coordinateY}

        let target = $(this).data('target')
        axios.post(target, position).then(function (response) {
            let commentId = response.data
            let url = '/comments/' + commentId

            let submitCommentForm = '<div class="rounded-md mt-2">\n' +
                '    <textarea\n' +
                '        class="resize-none focus:outline-none p-1 text-sm rounded-md focus:opacity-100 opacity-75"\n' +
                '        name="body"\n' +
                '        placeholder="Type your comment"' +
                '        data-comment-url="' + url + '"' +
                '></textarea>\n' +
                '</div>'

            let $comment = '<div class="comment"\n' +
                '     style="position: absolute;\n' +
                '         top: ' + coordinateY * 100 + '%;\n' +
                '         left: ' + coordinateX * 100 + '%;">\n' +
                '    <div class="flex -ml-2 -mt-2">\n' +
                '        <div style="min-width: 1rem" title="Remove" class="comment-pointer cursor-pointer w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">X</div>\n' +
                submitCommentForm +
                '    </div>\n' +
                '</div>'

            $image.closest('div').append($comment)

        }).catch(function (error) {
            window.location.href = '/login';
        })
    })

    //Update comment content
    $image.closest('div').on('click', '.comment textarea',function (event) {
        let url = $(this).data('comment-url')

        $(this).on('focusout', function () {
            let body = $(this).val()

            axios.post(url, {body: body, _method: 'put'
            })
                .then(function (response) {

                }).catch(function (error) {

            })
        })

    })

    //Destroy comment
    $image.closest('div').on('click', '.comment-pointer', function () {
        let $comment = $(this).closest('.comment');
        let url = $comment.find('textarea').data('comment-url');
        $comment.remove();

        axios.post(url, {_method: 'delete'})
            .then(function (response) {
            }).catch(function (error) {

        })
    });

    // Broadcast comments
    window.Echo.private("comments." + $uploadId)
        .listen('CommentUpdated', e => {

            let $comment = '<div class="comment" id="comment-1" style="position: absolute;\n' +
                '             top:'+ (e.comment.coordinate_y * 100) +'%;\n' +
                '             left:'+ (e.comment.coordinate_x * 100) + '%;">\n' +
                '        <div class="flex -ml-2 -mt-2">\n' +
                '            <div style="min-width: 1rem"\n' +
                '                 class="w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">\n' +
                '                !\n' +
                '            </div>\n' +
                '\n' +
                '            <div class=" rounded-md mt-2 ">\n' +
                '                <div class="bg-white text-sm rounded-t-md p-1 opacity-75 text-xs font-bold flex items-center"\n' +
                '                     title="1 minute ago on 2020-05-12 19:31:38">\n' +
                '                    <img src="//localhost:3000/img/avatar.png" class="mr-1"\n' +
                '                         style="max-width: 1rem;height: 1rem; display: inline">\n' +
                '\n' +
                '                    <p class="text-xs leading-none">'+ e.commentAuthor.name +'</p>\n' +
                '                </div>\n' +
                '\n' +
                '                <div class="bg-white p-1 text-sm rounded-b-md opacity-75 border-t-2">\n' +
                '                    '+ e.comment.body +'\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>';

                $image.closest('div').append($comment)
        })
})
