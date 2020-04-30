<div class=" rounded-md mt-2 ">
    <textarea
        class="resize-none focus:outline-none p-1 text-sm rounded-md focus:opacity-100 opacity-75"
        name="body"
        placeholder="{{($comment->body ? '' : 'Type your comment')}}" data-comment-url="{{ route('comments.update', [$comment]) }}">{{($comment->body ? $comment->body : '')}}</textarea>
</div>
