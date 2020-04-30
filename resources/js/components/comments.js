import $ from 'cash-dom'

$(function () {
    let $image = $('#imageCanvas')

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
                '        <div class="comment-pointer cursor-pointer w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">X</div>\n' +
                submitCommentForm +
                '    </div>\n' +
                '</div>'

            $image.closest('div').append($comment)

        }).catch(function (error) {
            console.log(error)
        })
    })

    //Update comment content
    $image.closest('div').on('click', '.comment textarea',function (event) {
        let url = $(this).data('comment-url')

        $(this).on('focusout', function () {
            let body = $(this).val()

            axios.put(url, {body: body})
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

        axios.delete(url)
            .then(function (response) {
            }).catch(function (error) {

        })
    });
})
