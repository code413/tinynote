<header class="flex items-center px-8 py-4 ">
    <a href="{{ urL('/') }}" class="mb-4 font-bold">Tiny Note</a>

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
