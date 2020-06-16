<div class=" rounded-md mt-2 ">
    <div class="bg-white text-sm rounded-t-md p-1 opacity-75 text-xs font-bold flex items-center"
         title="{{ \Illuminate\Support\Carbon::parse($comment->created_at)->diffForHumans() }} on {{ \Illuminate\Support\Carbon::parse($comment->created_at) }}">
        <img src="{{ url('img/avatar.png') }}"
             class="mr-1"
             style="max-width: 1rem;height: 1rem; display: inline">

        <p class="text-xs leading-none">{{ $comment->user->name }}</p>
    </div>

    @if($comment->author() )
        <textarea
            class="resize-none focus:outline-none p-1 text-sm rounded-b-md focus:opacity-100 opacity-75 border-t-2 w-full"
            name="body"
            placeholder="{{($comment->body ? '' : 'Type your comment')}}"
            data-comment-url="{{ route('comments.update', [$comment]) }}">{{($comment->body ? $comment->body : '')}}</textarea>
    @else
        <div class="bg-white p-1 text-sm rounded-b-md opacity-75 border-t-2">
            {{($comment->body ? $comment->body : '')}}
        </div>
    @endif
</div>
