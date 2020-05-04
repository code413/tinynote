@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        <p class="mb-2 text-center">Click on the image where you have any comments on that spot.</p>

        <div class="p-0 m-0" style="position: relative; width: max-content; max-width: 100%">
            <img id="imageCanvas" src='{{ url("$upload->url") }}'
                 data-target="{{ route('comments.store', [$upload]) }}"
                 class="w-full">

            @include('uploads.partials.comments')
        </div>

        <div class="mt-8">
            <div>
                <h2 class="border-b-2 mb-10">General comments</h2>

                @forelse($upload->comments as $comment)
                    @if($comment->isOnTheImage())
                        @continue
                    @endif

                    <div style="max-width: 25rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);word-break:break-all;"
                        class="bg-white mb-1 p-3 my-5 rounded-md {{ ($comment->wroteByHer()) ? 'bg-green-100 ml-auto text-right' : 'bg-blue-100 mr-auto text-left' }}"
                        role="alert" >

                            <div
                                class="name font-bold mb-1 m-0 flex items-center {{ $comment->wroteByHer() ? 'justify-start' : '' }}">
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
            </div>

            <form method="POST" action="{{ route('comments.store', [$upload]) }}" class="flex flex-col mt-10">
                @csrf

                <textarea name="body" placeholder="Type your comment to display out of the image"
                          class="p-5 border border-gary-500 focus:shadow-outline"></textarea>

                <input type="submit" class="btn btn-blue ml-auto mt-2 text-center" value="Post">
            </form>
        </div>
    </div>
@stop
