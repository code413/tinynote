@foreach($upload->comments as $key =>$comment)
    <div class="comment"
         id="comment-{{$key + 1}}"
         style="position: absolute;
             top: {{json_decode($comment->coordinates)[1] * 100 }}%;
             left: {{ json_decode($comment->coordinates)[0] * 100 }}%;"
    >
        <div class="flex -ml-2 -mt-2">
            @if($comment->author())
                <div title="Remove"
                     style="min-width: 1rem"
                     class="comment-pointer cursor-pointer w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">
                    X
                </div>
            @else
                <div
                    style="min-width: 1rem"
                    class="w-4 h-4 rounded-full bg-red-600 flex justify-center items-center text-white text-xs z-50">
                    !
                </div>
            @endif

            @include('uploads.partials.on-image-comment-editor')
        </div>
    </div>
@endforeach
