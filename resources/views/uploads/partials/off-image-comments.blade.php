@forelse($upload->comments as $comment)
    @if($comment->isOnTheImage())
        @continue
    @endif

    <div style="max-width: 25rem; word-break:break-all;"
         class="shadow-xl bg-white mb-1 p-3 my-5 rounded-md {{ ($comment->author()) ? 'bg-green-100 ml-auto text-right' : 'bg-blue-100 mr-auto text-left' }}"
         role="alert" >

        <div
            class="name font-bold mb-1 m-0 flex items-center {{ $comment->author() ? 'justify-start' : '' }}">
            <img src="{{ url('img/avatar.png') }}"
                 class="mr-2"
                 style="max-width: 1rem;height: 1rem; display: inline">

            {{ $comment->user->name }}
        </div>

        <div class="text-left">{{ $comment->body }}</div>

        <div class="text-xs text-right" title="{{ \Illuminate\Support\Carbon::parse($comment->created_at) }}">
            {{ \Illuminate\Support\Carbon::parse($comment->created_at)->diffForHumans() }}
        </div>
    </div>
@empty
    <p>There is no comment here!</p>
@endforelse
