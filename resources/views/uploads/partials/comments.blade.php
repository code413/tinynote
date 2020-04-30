@foreach($upload->comments as $key =>$comment)
    <div class="comment"
         id="comment-{{$key + 1}}"
         style="position: absolute;
             top: {{json_decode($comment->coordinates)[1] * 100 }}%;
             left: {{ json_decode($comment->coordinates)[0] * 100 }}%;"
    >
        <div class="flex -ml-2 -mt-2">
            <div class="comment-pointer cursor-pointer w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">
                X
            </div>

            @include('uploads.partials.comment-editor')
        </div>
    </div>
@endforeach
