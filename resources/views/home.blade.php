@extends('layouts.master')

@section('superclass', 'bg-gray-100')

@section('main')
    <div class="relative" style="background: #fcf0e3;">
        <div style="" class="px-8 py-4">
            <header class="flex items-center">
                <div class="mb-4 font-bold">Tiny Note</div>

                <div class="ml-auto">
                    @guest
                        <a href="{{ route('login') }}">Login</a>
                    @endguest

                    @auth
                        <div class="flex">
                            <form class="mx-5" action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button>Logout</button>
                            </form>

                            <a href="{{ route('uploads.index') }}">Your List</a>
                        </div>
                    @endauth
                </div>
            </header>


            <div class="container items-center text-center" style="min-height:20rem;">
                <h1 class="text-6xl font-bold max-w-2xl mx-auto pt-16" style="line-height:1">Get Instant Feedback On Your Designs.</h1>
                <div class="mb-5">No registrations required.</div>
                <dropzone style="min-height:20rem; top:3rem; margin-top:-2rem" class="max-w-2xl mx-auto items-stretch relative z-10"></dropzone>
            </div>
        </div>
        <div class="w-full absolute bottom-0" style="height:12rem; background: url(/img/wave.png) no-repeat"></div>
    </div>

    <div class="bg-white py-16">
        <div class="container">
            <div class="flex pt-16 items-center">
                <div class="w-1/3">
                    <h2 class="text-4xl font-bold">Upload your visual.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum neque nobis, nostrum officia provident rem saepe sed vero voluptas? Aspernatur dolorum ea ipsa nobis, odit omnis quod repudiandae voluptate voluptates?</p>
                </div>
                <div class="w-2/3">
                    <img src="{{ url('img/pablo-downloading.png') }}" class="max-w-2xl w-full mx-auto" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-16 -mt-16">
        <div class="container">
            <div class="flex pt-16 items-center">
                <div class="w-2/3">
                    <img src="{{ url('img/pablo-sign-up.png') }}" class="max-w-2xl w-full mx-auto" alt="">
                </div>
                <div class="w-1/3">
                    <h2 class="text-4xl font-bold">Receive comments from your client in real time.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum neque nobis, nostrum officia provident rem saepe sed vero voluptas? Aspernatur dolorum ea ipsa nobis, odit omnis quod repudiandae voluptate voluptates?</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-white py-16 -mt-16">
        <div class="container">
            <div class="flex pt-16 items-center">
                <div class="w-1/3">
                    <h2 class="text-4xl font-bold">Get approval and move on to the next job.</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum neque nobis, nostrum officia provident rem saepe sed vero voluptas? Aspernatur dolorum ea ipsa nobis, odit omnis quod repudiandae voluptate voluptates?</p>
                </div>
                <div class="w-2/3">
                    <img src="{{ url('img/pablo-order-completed.png') }}" class="max-w-2xl w-full mx-auto" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="py-16 text-white" style="background: #3040c4;">
        <div class="container flex flex-col items-center text-center">
            <h3 class="text-3xl font-bold">Not sure yet? Try it out for free!</h3>
            <p>Tiny Note is available for free. No registrations required.</p>
            <a href="" class="btn bg-white text-purple-900 hover:bg-purple-100">Upload Your First Visual</a>
        </div>
    </div>

    <footer class="py-8 bg-white">
        <div class="container text-center text-sm text-gray-500">
            Copyright &copy; 2020
        </div>
    </footer>
@stop
