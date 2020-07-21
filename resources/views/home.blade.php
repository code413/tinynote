@extends('layouts.master')

@section('title', 'Tiny Note - Get Instant Feedback On Your Designs')

@section('description', 'Tiny Note is a free design feedback tool that lets you upload visuals, invite your clients, and get feedback instantly. No registrations required.')

@section('title.suffix', '')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="relative bg-orange-100">
        @include('partials.header')

        <div class="px-8 py-4" id="start">
            <div class="container items-center text-center" style="min-height:20rem;">
                <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold max-w-2xl mx-auto pt-16" style="line-height:1">Get
                    Instant Feedback On Your Designs.</h1>
                <div class="mb-5 mt-4">No ads. No registrations. Completely free.</div>
                <dropzone style="min-height:20rem; top:3rem; margin-top:-2rem"
                          class="max-w-2xl mx-auto items-stretch relative z-10 w-full h-full shadow-inner"></dropzone>
            </div>
        </div>
        <div class="w-full absolute bottom-0" style="height:12rem; background: url(/img/wave.png) no-repeat"></div>
    </div>

    <div class="bg-white py-4 lg:py-8">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pr-10">
                    <h2 class="text-2xl lg:text-4xl font-bold">Upload your visual.</h2>
                    <p>
                        Upload your visual and enter your client's email. You can invite as many people as you want.
                        Each email you enter will receive a secure link to access and comment on your visual.
                    </p>
                </div>
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl">
                    <img src="{{ url('img/pablo-downloading.png') }}" class="w-full mx-auto" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-4 lg:py-8">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl order-2 md:order-1">
                    <img src="{{ url('img/pablo-sign-up.png') }}" class="w-full mx-auto" alt="">
                </div>

                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pl-10 order-1 md:order-2">
                    <h2 class="text-2xl lg:text-4xl font-bold">
                        Receive comments from your client in real time.
                    </h2>
                    <p>
                        Your client gets to access and comment on your visual without needing to create an account.
                        You'll receive their comments in real time without reloading the page.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-4 lg:py-8">
        <div class="container px-10">
            <div class="flex flex-col md:flex-row pt-16 items-center">
                <div class="text-center md:text-left md:w-1/2 lg:w-2/5 md:pr-10">
                    <h2 class="text-2xl lg:text-4xl font-bold">Get approval and move on to the next job.</h2>
                    <p>
                        Upload as many revisions as you need until you have your client's approval.

                    </p>
                </div>
                <div class="md:w-1/2 lg:w-3/5 max-w-2xl">
                    <img src="{{ url('img/pablo-order-completed.png') }}" class="w-full mx-auto" alt="">
                </div>
            </div>

            <x-acknowledgement></x-acknowledgement>
        </div>
    </div>

    <x-faq></x-faq>

    <x-cta link="#start"></x-cta>

    @include('partials.footer')
@stop
