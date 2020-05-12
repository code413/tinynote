@extends('layouts.master')

@section('superclass', 'flex flex-col bg-gray-100')

@section('main.class', 'flex flex-1')

@section('main')
    <!-- Content -->
    <div class="px-8 py-4 flex-grow flex  flex flex-col">
        <!-- Header -->
        <div class="flex">
            <div class="text-blue-900 flex">
                <div data-feather="file" class="mr-3"></div>
                Zoo Inc - Poster Design
            </div>
            <div class="ml-auto">
                <a href="" class="mr-4">People <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">7</span></a>

                <a href="" class="">Comments <span class="inline-block bg-gray-300 text-gray-600 text-sm px-2 rounded-full">3</span></a>
            </div>
        </div>

        <div class="flex flex-1 items-center justify-center">
            <div class="relative">
                <img src="{{ url('img/sample.png') }}" alt="Sample">
                <div class="dot p-2 bg-red-700 absolute rounded-full z-10" style="top: 17rem;left: 5rem;"></div>
                <div class="dot p-2 bg-red-700 absolute rounded-full z-10" style="top: 6rem;left: 40rem;"></div>
            </div>
        </div>

    </div>

    <!-- Comments -->
    <div class="bg-white shadow-sm flex flex-col" style="width:20rem">
        <div class="flex-1 p-4">
            @include('ui.partials.comment')
            @include('ui.partials.comment', ['content' => 'Lorem ipsum dolor sit amet.', 'author' => 'jane@xyz.co'])
            @include('ui.partials.comment', ['content' =>
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/><br/>Lorem ipsum dolor sit.'
            ])
        </div>

        <div class="border-t flex flex-col">
            <input type="text" class="p-4 w-full outline-none" placeholder="Leave a comment...">
            <div class="px-3 py-1 bg-gray-800 text-white rounded ml-auto text-center m-4 cursor-pointer">Send</div>
        </div>
    </div>

    <style>
        .dot:after{
            content: " ";
            position: absolute;
            top:-0.4rem;
            left:-0.4rem;
            width:calc(100% + 0.8rem);
            height:calc(100% + 0.8rem);
            background:rgba(250,0,0, 0.2);
            border-radius: 50%;
        }
    </style>
@stop
