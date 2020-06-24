<header class="flex items-center px-8 py-4 mb-4">
    <a href="{{ urL('/') }}" class="font-bold flex items-center">
        <img src="{{ url('img/logo.png') }}" alt="Tiny Note" class="mr-3" style="width:1.5rem; height: 1.5rem;">
        Tiny Note
    </a>

    <div class="ml-auto">
        @guest
            <a href="{{ route('login') }}">Login</a>
        @endguest

        @auth
            <div class="flex">
                <form class="mx-5" action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button class="text-gray-600">Logout</button>
                </form>

                <a class="text-purple-600 border-b" href="{{ route('uploads.index') }}">Uploads</a>
            </div>
        @endauth
    </div>
</header>
