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
                @forelse($upload->comments as $comment)
                    @if($comment->isOnTheImage())
                        @continue
                    @endif

                    <div
                        class="alert mb-1 p-3 {{ ($comment->wroteByHer()) ? 'alert-primary ml-auto text-right' : 'alert-success mr-auto text-left' }}"
                        role="alert" style="word-break:break-all;">

                        <div
                            class="name font-weight-bold mb-1 d-flex align-items-center m-0 {{ $comment->wroteByHer() ? 'justify-content-end' : '' }}">
                            <img src="{{ url('img/avatar.png') }}" style="max-width: 1rem;height: 1rem;">

                            {{ $comment->user->name }}
                        </div>

                        <div>{{ $comment->body }}</div>
                    </div>

                    <p>{{ $comment->body }}</p>
                @empty
                    <p>There is no comment here!</p>
                @endforelse
            </div>

            <form method="POST" action="{{ route('comments.store', [$upload]) }}" class="flex flex-col">
                @csrf

                <textarea name="body" placeholder="Type your comment to display out of the image"
                          class="p-5 border border-gary-500 focus:shadow-outline"></textarea>

                <input type="submit" class="btn btn-blue ml-auto mt-2 text-center" value="Post">
            </form>
        </div>
    </div>
@stop
