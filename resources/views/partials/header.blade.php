<nav class="flex items-center justify-between flex-wrap bg-indigo-400 p-6 text-white">
    <div class="flex items-center flex-shrink-0 mr-6">
        <a href="{{  route('home') }}">
            <img src="" alt="Annotation Logo">
        </a>
    </div>


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

</nav>

