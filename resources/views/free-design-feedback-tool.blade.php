@extends('layouts.master')

@section('title', 'Tiny Note - Get Instant Feedback On Your Designs')

@section('description', 'Tiny Note is a free design feedback tool that lets you upload visuals, invite your clients, and get feedback instantly.')

@section('main')
    <div class="relative bg-purple-100">
        @include('partials.header')

        <div class="px-8 py-4" id="start-2">
            <div class="title container items-center text-center">
                <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold max-w-2xl mx-auto pt-16" style="line-height:1">
                    A Free Design Feedback Tool!
                </h1>

                <dropzone style="min-height:20rem; top:3rem; margin-top:-2rem"
                          class="max-w-2xl mx-auto items-stretch relative z-10 w-full shadow-inner"></dropzone>
            </div>
        </div>
        <div class="w-full absolute bottom-0" style="height:12rem; background: url(/img/wave.png) no-repeat"></div>
    </div>

    <div class="bg-white py-4 mt-16">
        <div class="container px-10">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto md:pt-8 text-center">Tiny Note is an instant design feedback tool.<br>
                You'll get your feedback in only <strong>three steps</strong>.
            </h2>
        </div>
    </div>

    <div class="bg-white py-4">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl order-2 md:order-1">
                    <img src="{{ url('img/step-1.png') }}" class="w-full mx-auto rounded-lg" alt="">
                </div>

                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pl-10 order-1 md:order-2">
                    <h3 class="text-2xl lg:text-4xl font-bold">
                        Step 1
                    </h3>

                    <p>
                        <a class="text-purple-600 border-b" href="{{ route('home') }}">Upload</a> by just dropping in the box.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-4">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pr-10">
                    <h3 class="text-2xl lg:text-4xl font-bold">Step 2</h3>

                    <p>
                        Invite people as easy as just typing an email. We do the rest!
                    </p>
                </div>
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl">
                    <img src="{{ url('img/step-2.png') }}" class="w-full mx-auto rounded-lg" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-4 mb-5">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl order-2 md:order-1">
                    <img src="{{ url('img/step-3.png') }}" class="w-full mx-auto rounded-lg" alt="">
                </div>

                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pl-10 order-1 md:order-2">
                    <h3 class="text-2xl lg:text-4xl font-bold">
                        Step 3
                    </h3>

                    <p>
                        Get feedback next to your visual.
                    </p>
                </div>
            </div>

            <x-acknowledgement></x-acknowledgement>
        </div>
    </div>

    <x-faq></x-faq>

    <x-cta link="#start-2"></x-cta>

    @include('partials.footer')
@stop

<style>
    .title{
        min-height: 25rem;
    }

    @media screen and (max-width: 768px){
        .title{
            min-height: 18rem;
        }
    }
</style>
