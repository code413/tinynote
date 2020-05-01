<header class="p-3">
    @auth
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button>Logout</button>
        </form>
    @endauth

    @guest
        <a href="/login" class="ml-3">Login</a>
    @endguest
</header>

