@extends('layouts.master')

@section('title', 'Tiny Note - 5 Best Design Feedback and Annotation Tools for Designers')

@section('description', '5 Best Design Feedback and Annotation Tools for Designers.')

@section('main')
    @include('partials.header')

    <div class="bg-white py-4 mt-16">
        <div class="container px-10">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto md:pt-8 text-center">
                5 Best Design Feedback and Annotation Tools for Designers
            </h1>
        </div>
    </div>

    <div class="bg-white py-4 mt-16 border-b-2">
        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                1. <a class="underline hover:text-gray-700" href="{{ url('/') }}">TinyNote</a>
            </h2>

            <p>Tiny Note is one of the leading design feedback tool that you can use online. Here are its features.</p>

            <ul>
                <li>It's free. This is a tool that help you get annotated feedback on your visuals from your team member
                    or client for free.
                </li>

                <li>There is no barrier to entry. You can upload your creative visuals right from the homepage.</li>

                <li>It's Smooth and intuitive.</li>

                <li>No login, registration or credit card is required.</li>
            </ul>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                2. <a class="underline hover:text-gray-700" href="{{ url('https://www.proofhub.com/') }}" rel="noreferrer">ProofHub</a>
            </h2>

            <p>ProofHub is a project management tool that also has a design feedback feature. It's a comprehensive tool
                for managing the projects.
                You need to register and purchase a subscription in order to start using this tool. The pricing starts
                at $50 a month.</p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                3. <a class="underline hover:text-gray-700" href="{{ url('https://filestage.io/') }}" rel="noreferrer">Filestage</a>
            </h2>

            <p>Filestage is another alternative for design feedback tools. It accepts different type of files such as
                videos, images, audios and PDFs. The Starter plan for this web application is
                $89 a month. Users need to register before jumping in to the projects.
            </p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                4. <a class="underline hover:text-gray-700" href="{{ url('https://redpen.io') }}" rel="noreferrer">RedPen</a>
            </h2>

            <p>Redpen is a plain tool to review visuals within a team of designers. It is neat and clean.
                It is possible to invite unlimited reviewers but you need to pay for the number of active projects you
                have.
                However, there is no free plan and the pricing starts at $20 a month.
            </p>
        </div>

        <div class="container px-10">
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-8">
                5. <a class="underline hover:text-gray-700" href="{{ url('https://prevue.it/') }}" rel="noreferrer">Prevue</a>
            </h2>

            <p>Prevue is tool for photographers and designers.
                It is a well done web application that allows you for commenting and annotating in all your image
                files. Even though it is affordable but the base plan starts around $10 a month.
            </p>
        </div>
    </div>

    @include('partials.footer')
@stop


