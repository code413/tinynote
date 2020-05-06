@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="container mx-auto p-10">
        @include('partials.messages')
        @include('partials.errors')

        <div class="bg-blue-100 p-2 mb-4 shadow">
            @guest
                <a class="w-full text-center block my-4" href="{{ route('login') }}">Login to own this visual.</a>
            @endguest

            @auth
                <p>Hi, {{ auth()->user()->name }}</p>

                @if(!$upload->owned())
                    <form method="POST" action="{{ route('uploads.update', [$upload]) }}" class="text-center">
                        @csrf
                        @method('PUT')

                        <input type="submit" class="p-2 mb-2 text-center cursor-pointer"
                               value="Start Inviting Reviewers">
                    </form>
                @endif

                @if($upload->owned() && auth()->user()->isOwner($upload))
                    <form method="POST" action="{{ route('invitees.store', [$upload]) }}" class="mb-4">
                        @csrf

                        <input class="border p-2" type="email" name="email" placeholder="Email...">

                        <button class="btn btn-blue">Invite</button>
                    </form>

                    @forelse($upload->invitees as $invitee)
                        <ul>
                            <li>{{ $invitee->user->name }} <span>({{ $invitee->user->email }})</span><span
                                    class="mx-2 bg-green-200 text-sm p-1">invited</span></li>
                        </ul>
                    @empty
                        <p>No invitation was sent.</p>
                    @endforelse

                    <p class="mb-2 text-center">This visual was uploaded by <strong>{{ $upload->owner->name }}</strong>
                    </p>
                @endif

                @if(auth()->user()->name == 'Guest')
                    <a href="{{ route('password.request') }}" class="text-center">Update your name and Reset your
                        password</a>
                @endif
            @endauth


            <p class="mb-2 text-center">Click on the image where you have any comments on that spot.</p>
        </div>

        <form class="mt-5">
            <div class="text-center">
                <div class="flex my-3 justify-center items-center">
                    <p class="mx-2">Share the link</p>

                    <input type="text" value="{{ url()->current() }}"
                           id="share-url"
                           class="border mx-2"
                           aria-label="Recipient's username"
                           aria-describedby="basic-addon2">

                    <button id="share-url-button"
                            class="btn btn-blue mx-2"
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
