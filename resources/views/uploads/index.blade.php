@extends('auth.layout')

@section('title', "Uploads")

@section('superclass', 'bg-gray-100')

@section('content')
    <div>
        <div class="container mx-auto py-10 px-5">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl mx-auto text-center mb-10"
                style="line-height:1">Your Uploaded Visuals</h1>

            <div class="max-w-2xl mx-auto">
                @forelse($uploads as $upload)
                    <div class="flex items-center mb-2">
                        <div class="card z-10 relative block flex w-full items-center">
                            <div class="w-4/6">
                                <a href="{{ route('uploads.show', [$upload]) }}">
                                    <h2 class="text-lg md:text-xl mb-0 truncate">{{ $upload->name }}</h2>
                                </a>
                                <div class="text-gray-500 text-sm">Last
                                    active {{ $upload->updated_at->diffForHumans() }}</div>
                            </div>

                            <div class="ml-auto flex items-center text-purple-700">
                                <i data-feather="message-square" class="mr-2"></i>
                                {{ count($upload->comments) }}
                            </div>

                            <form method="POST" action="{{ route('uploads.delete', [$upload]) }}"
                                  class="ml-5">
                                @csrf
                                @method('DELETE')

                                <button type="submit" title="Delete"
                                        onclick="return confirm('Are you sure about deleting {{ $upload->name }}?')"
                                        class="flex items-center text-red-700 cursor-pointer
                                 hover:text-red-900 focus:outline-none">
                                    <i data-feather="trash"></i>
                                </button>

                            </form>
                        </div>
                    </div>
                @empty
                    <p class="text-center">You haven't uploaded any visuals. <a href="{{ route('home') }}">Do it now!</a></p>
                @endforelse

                <a href="{{ url('/') }}"
                   class="card mb-2 z-10 relative block flex bg-purple-900 text-white text-xl items-center">
                    Upload a new visual
                    <i data-feather="plus" class="ml-auto"></i>
                </a>
            </div>
        </div>

        <div class="container mx-auto py-10 px-5">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold max-w-2xl mx-auto text-center mb-10"
                style="line-height:1">Visuals You Are Invited</h1>

            <div class="max-w-2xl mx-auto">
                @forelse($invitedUploads as $invitedUpload)
                    <div class="flex items-center mb-2">
                        <div class="card z-10 relative block flex w-full items-center">
                            <div class="w-4/6">
                                <a href="{{ route('uploads.show', [$invitedUpload->upload]) }}">
                                    <h2 class="text-lg md:text-xl mb-0 truncate">{{ $invitedUpload->upload->name }}</h2>
                                </a>
                                <div class="text-gray-500 text-sm">Last
                                    active {{ $invitedUpload->upload->updated_at->diffForHumans() }}</div>
                            </div>

                            <div class="ml-auto flex items-center text-purple-700">
                                <i data-feather="message-square" class="mr-2"></i>
                                {{ count($invitedUpload->upload->comments) }}
                            </div>
                        </div>
                    </div>
                @empty
                    <p class="text-center">You haven't invited to any visuals.</p>
                @endforelse
            </div>
        </div>
    </div>
@stop
