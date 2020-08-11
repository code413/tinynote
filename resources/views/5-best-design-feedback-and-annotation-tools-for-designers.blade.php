@extends('layouts.master')

@section('title', 'Tiny Note - Get Instant Feedback On Your Designs')

@section('description', 'Tiny Note is a free design feedback tool that lets you upload visuals, invite your clients, and get feedback instantly.')

@section('main')
    @include('partials.header')

    <div class="bg-white py-4 mt-16">
        <div class="container px-10">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto md:pt-8 text-center">
                5 Best Design Feedback and Annotation Tools for Designers.
            </h1>
        </div>
    </div>

    <div class="bg-white py-4 mt-16 border-b-2">
        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                1. TinyNote
            </h2>

            <p>Tiny Note is one of the leading design feedback tool that you can use online. Here are its features.</p>

            <ul>
                <li>It's free. This is a tool that help you get annotated feedback on your visuals from your team member or client for free.</li>

                <li>There is no barrier to entry. You can upload your creative visuals right from the homepage.</li>

                <li>It's Smooth and intuitive. </li>

                <li>No login, registration or credit card is required.</li>
            </ul>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                2. ProofHub
            </h2>

            <p>Hello</p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                3. Filestage
            </h2>

            <p>Hello</p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                4. RedPen
            </h2>

            <p>This is a </p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                5. Usepastel
            </h2>

            <p>Hello</p>
        </div>
    </div>

    @include('partials.footer')
@stop


