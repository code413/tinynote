@extends('auth.layout')

@section('title', "- Your Uploads")

@section('superclass', 'bg-gray-100')

@section('content')
    <div class="container mx-auto py-10 px-5">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl mx-auto text-center mb-10"
            style="line-height:1">Your Uploads</h1>

        <div class="max-w-2xl mx-auto">
            @forelse($uploads as $upload)
                <div class="flex items-center mb-2">
                    <a href="{{ route('uploads.show', [$upload]) }}" class="card z-10 relative block flex">
                        <div class="w-4/6">
                            <h2 class="text-lg md:text-xl mb-0 truncate">{{ $upload->name }}</h2>
                            <div class="text-gray-500 text-sm">Last
                                active {{ $upload->updated_at->diffForHumans() }}</div>
                        </div>

                        <div class="ml-auto flex items-center text-purple-700">
                            <i data-feather="message-square" class="mr-2"></i>
                            {{ count($upload->comments) }}
                        </div>
                    </a>

                    <form method="POST" action="{{ route('uploads.delete', [$upload]) }}"
                          class="ml-auto">
                        @csrf
                        @method('DELETE')

                        <button type="submit" title="Delete" onclick="return confirm('You are removing an upload.')"
                                class="flex items-center text-red-700 card z-10 relative block cursor-pointer
                                 hover:bg-red-700 hover:text-white focus:outline-none">
                            <i data-feather="trash"></i>
                        </button>

                    </form>
                </div>
            @empty
                <p>You haven't uploaded any visuals. <a href="{{ route('home') }}">Do it now!</a></p>
            @endforelse

            <a href="{{ url('/') }}"
               class="card mb-2 z-10 relative block flex bg-purple-900 text-white text-xl items-center">
                Upload a new visual
                <i data-feather="plus" class="ml-auto"></i>
            </a>
        </div>
    </div>
@stop
