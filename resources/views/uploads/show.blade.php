@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        @guest
            <a href="{{ route('login') }}">Login to own this visual.</a>
        @endguest

        @auth
            @if(!$upload->owned())
                <form method="POST" action="{{ route('uploads.update', [$upload]) }}">
                    @csrf
                    @method('PUT')

                    <input type="submit" class="mb-2 text-center" value="Save the visual and Invite people">
                </form>
            @endif

            @if($upload->owned())
                <form method="POST" action="{{ route('invitees.store', [$upload]) }}">
                    @csrf

                    <input type="email" name="email" placeholder="Email...">

                    <button>Invite</button>
                </form>
            @endif
        @endauth

        <p class="mb-2 text-center">Click on the image where you have any comments on that spot.</p>

        <form class="mt-5">
            <div class="text-center">
                <p class="mb-0">Share the link</p>

                <div class="flex mb-3 justify-center">
                    <input type="text" value="{{ url()->current() }}"
                           id="share-url"
                           aria-label="Recipient's username"
                           aria-describedby="basic-addon2">

                    <button id="share-url-button"
                            class="btn btn-outline-secondary btn-sm"
                            data-clipboard-target="#share-url"
                            type="button">
                        Copy
                    </button>
                </div>
            </div>
        </form>

        <div class="p-0 m-0 mx-auto" style="position: relative; width: max-content; max-width: 100%">
            <img id="imageCanvas" src='{{ url("$upload->url") }}'
                 data-target="{{ route('comments.store', [$upload]) }}"
                 class="w-full">

            @include('uploads.partials.on-image-comments')
        </div>

        <div class="mt-8">
            <div>
                <h2 class="border-b-2 mb-10">General comments</h2>

                @include('uploads.partials.off-image-comments')
            </div>

            @include('uploads.partials.off-image-comment-form')
        </div>
    </div>
@stop
