<header class="flex items-center px-8 py-4 mb-4">
    <a href="{{ urL('/') }}" class="font-bold flex items-center lowercase" style="color: #131f7e;">
        <img src="{{ url('img/logo.png?v=2') }}" alt="Tiny Note" class="mr-3" style="width:1.8rem;">
        Tiny Note
    </a>

    <div class="ml-auto">
        @guest
            <a href="{{ route('login') }}">Login</a>
        @endguest

        @auth
            <div class="flex">
                @if(auth()->user()->email !== null)
                <form class="mx-5" action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button class="text-gray-600">Logout</button>
                </form>
                @endif

                <a class="text-purple-600 border-b" href="{{ route('uploads.index') }}">Uploads</a>
            </div>
        @endauth
    </div>
</header>
